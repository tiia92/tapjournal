
import React from 'react';
import {
  ChartLine,
  Palette,
  Mic,
  Camera,
  Plus,
  BookOpen,
  Target,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface PremiumFeature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const PremiumUpgrade: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleUpgrade = () => {
    navigate('/premium-waitlist');
  };

  const premiumFeatures: PremiumFeature[] = [
    {
      title: 'Advanced Insights & Trends',
      description: 'Charts and analytics that show progress over time',
      icon: <ChartLine className="h-5 w-5 text-primary" />,
    },
    {
      title: 'Customizable Themes',
      description: 'Personalize your tracking with different colors and themes',
      icon: <Palette className="h-5 w-5 text-primary" />,
    },
    {
      title: 'Voice & Image Journaling',
      description: 'Record voice entries or attach photos to your journal',
      icon: <Mic className="h-5 w-5 text-primary" />,
    },
    {
      title: 'Custom Tracking Metrics',
      description: 'Create your own tap categories for personalized tracking',
      icon: <Plus className="h-5 w-5 text-primary" />,
    },
    {
      title: 'Guided Wellness Programs',
      description: 'Structured programs like "7-Day Sleep Reset"',
      icon: <BookOpen className="h-5 w-5 text-primary" />,
    },
    {
      title: 'Smart Goal Suggestions',
      description: 'AI-driven recommendations based on your habits',
      icon: <Target className="h-5 w-5 text-primary" />,
    },
    {
      title: 'Accountability Partner Mode',
      description: 'Track progress with a friend and motivate each other',
      icon: <Users className="h-5 w-5 text-primary" />,
    },
  ];

  if (user?.isPremium) {
    return null;
  }

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Unlock Premium Features</h3>
        <p className="text-muted-foreground">
          Elevate your wellness journey with advanced tools
        </p>
      </div>

      <div className="grid gap-4 mb-6">
        {premiumFeatures.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="mt-1">{feature.icon}</div>
            <div>
              <h4 className="font-medium">{feature.title}</h4>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={handleUpgrade}
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
      >
        Join Premium Waitlist
      </Button>
    </div>
  );
};

export default PremiumUpgrade;
