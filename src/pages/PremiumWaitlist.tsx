import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { ArrowLeft, Check, CreditCard, Shield } from 'lucide-react';
import Layout from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';

const PremiumCheckout = () => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { plan: selectedPlan },
      });
      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || 'Could not start checkout');
      setIsSubmitting(false);
    }
  };

  const premiumFeatures = [
    'Advanced Insights & Trends',
    'Customizable Themes',
    'Voice & Image Journaling',
    'Custom Tracking Metrics',
    'Guided Wellness Programs',
    'Smart Goal Suggestions',
    'Accountability Partner Mode',
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold mb-2">Upgrade to Premium</h1>
          <p className="text-muted-foreground">
            Unlock the full TapJournal experience. Cancel anytime.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                Premium Features
              </CardTitle>
              <CardDescription>Everything included with Premium</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {premiumFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Choose your plan
              </CardTitle>
              <CardDescription>You'll be redirected to Stripe to complete payment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <Button
                  variant={selectedPlan === 'monthly' ? 'default' : 'outline'}
                  onClick={() => setSelectedPlan('monthly')}
                  className="h-auto p-4 flex flex-col"
                >
                  <span className="font-semibold">Monthly</span>
                  <span className="text-lg">$7.99</span>
                  <span className="text-xs opacity-70">per month</span>
                </Button>
                <Button
                  variant={selectedPlan === 'yearly' ? 'default' : 'outline'}
                  onClick={() => setSelectedPlan('yearly')}
                  className="h-auto p-4 flex flex-col relative"
                >
                  <Badge className="absolute -top-2 -right-2 text-xs">Save 37%</Badge>
                  <span className="font-semibold">Yearly</span>
                  <span className="text-lg">$59.99</span>
                  <span className="text-xs opacity-70">per year</span>
                </Button>
              </div>

              <Button
                onClick={handleCheckout}
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Redirecting to Stripe…' : `Subscribe ${selectedPlan === 'yearly' ? 'Yearly' : 'Monthly'}`}
              </Button>

              <div className="mt-6 flex items-start gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Secure checkout via Stripe. Cancel anytime from your account.</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PremiumCheckout;
