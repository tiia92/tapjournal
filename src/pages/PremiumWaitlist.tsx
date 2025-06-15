
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { ArrowLeft, Check, CreditCard, Clock, Shield } from 'lucide-react';
import Layout from '@/components/Layout';

const PremiumWaitlist = () => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cardNumber || !expiryDate || !cvv || !name) {
      toast.error('Please fill in all payment details');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('Successfully joined the premium waitlist!');
    navigate('/');
    
    setIsSubmitting(false);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const premiumFeatures = [
    'Advanced Insights & Trends',
    'Customizable Themes',
    'Voice & Image Journaling',
    'Custom Tracking Metrics',
    'Guided Wellness Programs',
    'Smart Goal Suggestions',
    'Accountability Partner Mode'
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/journal')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Insights
          </Button>
          
          <h1 className="text-3xl font-bold mb-2">Join Premium Waitlist</h1>
          <p className="text-muted-foreground">
            Be the first to access premium features when they launch
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Features Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                Premium Features
              </CardTitle>
              <CardDescription>
                Everything you'll get with Premium
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {premiumFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Payment Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Secure Your Spot
              </CardTitle>
              <CardDescription>
                Reserve your premium access with payment details
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Pricing Options */}
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

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Cardholder Name
                  </label>
                  <Input
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Card Number
                  </label>
                  <Input
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    maxLength={19}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Expiry Date
                    </label>
                    <Input
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                      maxLength={5}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      CVV
                    </label>
                    <Input
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                      maxLength={4}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2">⏳</span>
                      Joining Waitlist...
                    </span>
                  ) : (
                    'Join Premium Waitlist'
                  )}
                </Button>
              </form>

              {/* Important Info */}
              <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>You will not be charged until premium features launch</span>
                </div>
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>7-day refund policy once premium launches if you change your mind</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PremiumWaitlist;
