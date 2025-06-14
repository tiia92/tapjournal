import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Track habits and write your daily journal entries. Get started for free.',
    features: [
      'Journaling with text and emoji',
      'Track your mood, self-care, water, sleep, and to-dos',
      'View your full journal history',
    ],
    badge: null,
  },
  {
    name: 'Premium Monthly',
    price: '$7.99/mo',
    description: 'Unlock advanced tools and analytics for your wellness journey.',
    features: [
      'All Free features',
      'Unlimited habits & journals',
      'Charts and analytics',
      'Custom themes',
      'Voice/image journaling',
      'Guided AI wellness programs',
      'Premium chat support',
    ],
    badge: <Badge>Popular</Badge>,
  },
  {
    name: 'Premium Yearly',
    price: '$59.99/yr',
    description: 'Save 37%. Billed annually. Get everything in Premium Monthly at a discount.',
    features: [
      'All Premium Monthly features',
      'Save 37% compared to monthly billing',
      'Priority support',
    ],
    badge: <Badge className="bg-green-500 text-white">Best Value</Badge>,
  }
];

const Pricing = () => {
  const navigate = useNavigate();

  const handlePremiumClick = (planName: string) => {
    navigate('/premium-waitlist');
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-4 mb-12">
        <h1 className="text-3xl font-bold mb-3">Pricing</h1>
        <p className="text-muted-foreground mb-7">Flexible plans for any wellness journey—upgrade any time.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map(plan => (
            <div key={plan.name} className="rounded-lg border bg-card p-6 shadow-sm flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-lg">{plan.name}</span>
                {plan.badge}
              </div>
              <div className="text-2xl font-bold mb-1">{plan.price}</div>
              <div className="text-muted-foreground mb-4 text-sm">{plan.description}</div>
              <ul className="mb-6 space-y-2">
                {plan.features.map(f => (
                  <li key={f} className="text-sm">• {f}</li>
                ))}
              </ul>
              {plan.name === "Free" ? (
                <Button disabled variant="secondary" className="mt-auto">
                  Current Plan
                </Button>
              ) : (
                <Button
                  onClick={() => handlePremiumClick(plan.name)}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 mt-auto"
                >
                  {plan.name.includes("Monthly") ? "Go Premium Monthly" : "Go Premium Yearly"}
                </Button>
              )}
            </div>
          ))}
        </div>
        <div className="text-center text-muted-foreground mt-5 text-xs">
          You won't be charged until premium features officially launch. Cancel any time.
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
