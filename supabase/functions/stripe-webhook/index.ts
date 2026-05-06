// @ts-nocheck
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
};

async function upsertSubscription(supabase: any, userId: string, sub: any) {
  const isActive = ["active", "trialing"].includes(sub.status);
  const endDate = sub.current_period_end ? new Date(sub.current_period_end * 1000).toISOString() : null;

  // Check existing premium row
  const { data: existing } = await supabase
    .from("user_subscriptions")
    .select("id")
    .eq("user_id", userId)
    .eq("subscription_type", "premium")
    .maybeSingle();

  const payload = {
    user_id: userId,
    subscription_type: "premium",
    is_active: isActive,
    start_date: new Date().toISOString(),
    end_date: endDate,
    stripe_subscription_id: sub.id,
    stripe_customer_id: sub.customer,
  };

  if (existing) {
    await supabase.from("user_subscriptions").update(payload).eq("id", existing.id);
  } else {
    await supabase.from("user_subscriptions").insert(payload);
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2024-06-20" });
  const signingSecret = Deno.env.get("STRIPE_WEBHOOK_SIGNING_SECRET")!;
  const signature = req.headers.get("stripe-signature");
  const body = await req.text();

  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature!, signingSecret);
  } catch (e) {
    console.error("Webhook signature failed", e);
    return new Response(`Bad signature: ${(e as Error).message}`, { status: 400 });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as any;
        const userId = session.client_reference_id || session.metadata?.user_id;
        if (userId && session.subscription) {
          const sub = await stripe.subscriptions.retrieve(session.subscription);
          await upsertSubscription(supabase, userId, sub);
        }
        break;
      }
      case "customer.subscription.updated":
      case "customer.subscription.created": {
        const sub = event.data.object as any;
        const userId = sub.metadata?.user_id;
        if (userId) await upsertSubscription(supabase, userId, sub);
        break;
      }
      case "customer.subscription.deleted": {
        const sub = event.data.object as any;
        await supabase
          .from("user_subscriptions")
          .update({ is_active: false, end_date: new Date().toISOString() })
          .eq("stripe_subscription_id", sub.id);
        break;
      }
    }
  } catch (e) {
    console.error("Webhook handler error", e);
    return new Response(`Handler error: ${(e as Error).message}`, { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
