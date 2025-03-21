
import React from 'react';
import Layout from '@/components/Layout';
import InsightsChart from '@/components/premium/InsightsChart';
import PremiumUpgrade from '@/components/PremiumUpgrade';
import { useAuth } from '@/context/AuthContext';
import JournalPrompts from '@/components/premium/JournalPrompts';
import GoalSuggestions from '@/components/premium/GoalSuggestions';
import WellnessPrograms from '@/components/premium/WellnessPrograms';

const Journal = () => {
  const { user } = useAuth();
  const isPremium = user?.isPremium || false;

  return (
    <Layout>
      <div className="mb-6">
        <h2 className="text-2xl font-medium mb-2">Journal</h2>
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
          color="#0EA5E9"
        />
        
        <InsightsChart 
          title="Sleep Patterns" 
          description="Analyze your sleep duration and consistency"
          color="#8B5CF6"
        />
        
        <InsightsChart 
          title="Mood Analysis" 
          description="Understand patterns in your emotional wellbeing"
          color="#10B981"
        />

        <JournalPrompts />
        
        <GoalSuggestions />
        
        <WellnessPrograms />
      </div>
    </Layout>
  );
};

export default Journal;
