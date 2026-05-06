// @ts-nocheck
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const PLANS = {
  monthly: { amount: 799, interval: "month", name: "TapJournal Premium (Monthly)" },
  yearly: { amount: 5999, interval: "year", name: "TapJournal Premium (Yearly)" },
} as const;

type PlanKey = keyof typeof PLANS;

// In-memory cache of price IDs per cold start
const priceCache: Record<string, string> = {};

async function getOrCreatePrice(stripe: Stripe, plan: PlanKey): Promise<string> {
  if (priceCache[plan]) return priceCache[plan];

  const lookupKey = `tapjournal_premium_${plan}`;
  const existing = await stripe.prices.list({ lookup_keys: [lookupKey], active: true, limit: 1 });
  if (existing.data.length > 0) {
    priceCache[plan] = existing.data[0].id;
    return priceCache[plan];
  }

  const cfg = PLANS[plan];
  const price = await stripe.prices.create({
    unit_amount: cfg.amount,
    currency: "usd",
    recurring: { interval: cfg.interval },
    product_data: { name: cfg.name },
    lookup_key: lookupKey,
  });
  priceCache[plan] = price.id;
  return price.id;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY not set");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: req.headers.get("Authorization") || "" } } }
    );
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.email) throw new Error("Not authenticated");

    const { plan } = await req.json();
    if (plan !== "monthly" && plan !== "yearly") throw new Error("Invalid plan");

    const stripe = new Stripe(stripeKey, { apiVersion: "2024-06-20" });
    const priceId = await getOrCreatePrice(stripe, plan as PlanKey);

    // Reuse existing customer if any
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    const customerId = customers.data[0]?.id;

    const origin = req.headers.get("origin") || "https://tapjournal.lovable.app";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      client_reference_id: user.id,
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      success_url: `${origin}/journal?checkout=success`,
      cancel_url: `${origin}/pricing?checkout=cancelled`,
      subscription_data: { metadata: { user_id: user.id } },
      metadata: { user_id: user.id, plan },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("create-checkout error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
