
import React from 'react';
import Layout from '@/components/Layout';
import ScrollableCharts from '@/components/ScrollableCharts';
import PremiumUpgrade from '@/components/PremiumUpgrade';
import { useAuth } from '@/context/AuthContext';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';
import SmartGoalTracker from '@/components/premium/SmartGoalTracker';
import WellnessPrograms from '@/components/premium/WellnessPrograms';
import { toast } from 'sonner';

const Journal = () => {
  const { user } = useAuth();
  const { isPremium } = usePremiumAccess();

  const handleComingSoon = () => {
    toast.info("Coming soon!");
  };

  const chartConfigs = [
    {
      title: "Water Intake Trends",
      description: "Track your hydration habits over time",
      chartType: "water",
      color: "#0EA5E9"
    },
    {
      title: "Sleep Patterns",
      description: "Analyze your sleep duration and consistency",
      chartType: "sleep",
      color: "#8B5CF6"
    },
    {
      title: "Mood Analysis",
      description: "Understand patterns in your emotional wellbeing",
      chartType: "mood",
      color: "#10B981"
    },
    {
      title: "Exercise Minutes",
      description: "Track your daily exercise duration",
      chartType: "exercise",
      color: "#F59E0B"
    },
    {
      title: "Self-Care Minutes",
      description: "See how much time you dedicate to self-care",
      chartType: "selfcare",
      color: "#EC4899"
    },
    {
      title: "Pain Level Tracking",
      description: "Monitor your pain levels over time",
      chartType: "pain",
      color: "#F97316"
    },
    {
      title: "Energy Level Tracking",
      description: "See changes in your energy levels",
      chartType: "energy",
      color: "#64748B"
    },
    {
      title: "Medication Adherence",
      description: "Track how consistently you take your medications",
      chartType: "medication",
      color: "#EC4899"
    }
  ];

  return (
    <Layout>
      <div className="mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-medium mb-2">Insights</h2>
        <p className="text-sm md:text-base text-muted-foreground">
          Review your wellness journey
        </p>
      </div>

      {/* Premium upgrade card */}
      {!isPremium && (
        <div className="mb-6">
          <PremiumUpgrade />
        </div>
      )}

      {/* Scrollable Charts */}
      <ScrollableCharts charts={chartConfigs} />

      {/* Premium features */}
      {isPremium && (
        <div className="space-y-6">
          <SmartGoalTracker isInsightsPage={true} />
          
          <div onClick={handleComingSoon} className="cursor-pointer">
            <WellnessPrograms />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Journal;
