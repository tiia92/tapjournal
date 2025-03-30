
import React from 'react';
import Layout from '@/components/Layout';
import InsightsChart from '@/components/premium/InsightsChart';
import PremiumUpgrade from '@/components/PremiumUpgrade';
import { useAuth } from '@/context/AuthContext';
import SmartGoalTracker from '@/components/premium/SmartGoalTracker';
import WellnessPrograms from '@/components/premium/WellnessPrograms';
import { toast } from 'sonner';

const Journal = () => {
  const { user } = useAuth();
  const isPremium = user?.isPremium || false;

  const handleComingSoon = () => {
    toast.info("Coming soon!");
  };

  return (
    <Layout>
      <div className="mb-6">
        <h2 className="text-2xl font-medium mb-2">Insights</h2>
        <p className="text-muted-foreground">
          Review your wellness journey
        </p>
      </div>

      {/* Premium upgrade card */}
      {!isPremium && (
        <div className="mb-6">
          <PremiumUpgrade />
        </div>
      )}

      {/* Premium insights */}
      <div className="space-y-6">
        <InsightsChart 
          title="Water Intake Trends" 
          description="Track your hydration habits over time"
          chartType="water"
          color="#0EA5E9"
        />
        
        <InsightsChart 
          title="Sleep Patterns" 
          description="Analyze your sleep duration and consistency"
          chartType="sleep"
          color="#8B5CF6"
        />
        
        <InsightsChart 
          title="Mood Analysis" 
          description="Understand patterns in your emotional wellbeing"
          chartType="mood"
          color="#10B981"
        />
        
        <InsightsChart 
          title="Exercise Minutes" 
          description="Track your daily exercise duration"
          chartType="exercise"
          color="#F59E0B"
        />
        
        <InsightsChart 
          title="Self-Care Minutes" 
          description="See how much time you dedicate to self-care"
          chartType="selfcare"
          color="#EC4899"
        />
        
        <InsightsChart 
          title="Pain Level Tracking" 
          description="Monitor your pain levels over time"
          chartType="pain"
          color="#F97316"
        />
        
        <InsightsChart 
          title="Energy Level Tracking" 
          description="See changes in your energy levels"
          chartType="energy"
          color="#64748B"
        />
        
        <InsightsChart 
          title="Medication Adherence" 
          description="Track how consistently you take your medications"
          chartType="medication"
          color="#EC4899"
        />
        
        <SmartGoalTracker isInsightsPage={true} />
        
        <div onClick={handleComingSoon} className="cursor-pointer">
          <WellnessPrograms />
        </div>
      </div>
    </Layout>
  );
};

export default Journal;
