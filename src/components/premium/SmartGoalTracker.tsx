
import React from 'react';
import { CheckCircle, XCircle, Plus, Info } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useJournal, Goal } from '@/context/JournalContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface SmartGoalTrackerProps {
  entryId?: string;
  isInsightsPage?: boolean;
}

const genericGoals = [
  {
    id: 'generic-1',
    text: 'Drink at least 8 glasses of water daily',
    reason: 'Proper hydration is essential for overall health'
  },
  {
    id: 'generic-2',
    text: 'Practice meditation for 5 minutes each day',
    reason: 'Regular meditation reduces stress and improves focus'
  },
  {
    id: 'generic-3',
    text: 'Take a 10-minute walk after meals',
    reason: 'Light exercise after eating helps with digestion'
  },
  {
    id: 'generic-4',
    text: 'Get 7-8 hours of sleep each night',
    reason: 'Quality sleep is crucial for physical and mental health'
  },
  {
    id: 'generic-5',
    text: 'Write down 3 things you're grateful for daily',
    reason: 'Gratitude practice improves mental well-being'
  }
];

const SmartGoalTracker: React.FC<SmartGoalTrackerProps> = ({ entryId, isInsightsPage = false }) => {
  const { user } = useAuth();
  const { goals, entries, addGoal, removeGoal, toggleGoalCompletion, todayEntry } = useJournal();
  const isPremium = user?.isPremium || false;
  
  const activeGoals = goals.filter(goal => !goal.completed);
  const hasEnoughEntries = entries.length >= 3;

  const handleAddGoal = (goalText: string) => {
    addGoal(goalText);
    toast.success('Goal added to your daily tracker');
  };

  const handleRemoveGoal = (goalId: string) => {
    removeGoal(goalId);
    toast.success('Goal removed');
  };

  const handleToggleCompletion = (goalId: string, completed: boolean) => {
    toggleGoalCompletion(goalId, completed);
    toast.success(completed ? 'Goal marked as completed' : 'Goal marked as incomplete');
  };

  // Generate personalized goal suggestions based on user data
  const generatePersonalizedSuggestions = () => {
    // This would be more sophisticated in a real app, analyzing user patterns
    const suggestions = [];

    // Water intake suggestion
    const avgWaterCount = entries.reduce((sum, entry) => sum + entry.waterCount, 0) / entries.length;
    if (avgWaterCount < 6) {
      suggestions.push({
        id: 'water',
        text: 'Increase your water intake to 8 glasses per day',
        reason: 'Your average water intake is below recommended levels'
      });
    }

    // Sleep suggestion
    const avgSleepHours = entries.reduce((sum, entry) => sum + entry.sleepHours, 0) / entries.length;
    if (avgSleepHours < 7) {
      suggestions.push({
        id: 'sleep',
        text: 'Aim for 7-8 hours of sleep each night',
        reason: 'Your sleep average is below recommended levels'
      });
    }

    // Exercise suggestion
    const exerciseDays = entries.filter(entry => entry.exercises && entry.exercises.length > 0).length;
    const exerciseRate = exerciseDays / entries.length;
    if (exerciseRate < 0.5) {
      suggestions.push({
        id: 'exercise',
        text: 'Add at least 15 minutes of exercise to your daily routine',
        reason: 'You exercise less than 50% of days'
      });
    }

    // Self-care suggestion
    const selfCareDays = entries.filter(entry => entry.selfCareActivities && entry.selfCareActivities.length > 0).length;
    const selfCareRate = selfCareDays / entries.length;
    if (selfCareRate < 0.3) {
      suggestions.push({
        id: 'selfcare',
        text: 'Schedule at least one self-care activity daily',
        reason: 'You could benefit from more regular self-care'
      });
    }

    // Add some generic suggestions if we don't have enough
    if (suggestions.length < 3) {
      const generics = [
        {
          id: 'meditation',
          text: 'Practice 5 minutes of meditation daily',
          reason: 'Regular meditation can reduce stress and improve focus'
        },
        {
          id: 'stretch',
          text: 'Take stretch breaks every 2 hours when working',
          reason: 'Regular stretching improves circulation and reduces muscle tension'
        },
        {
          id: 'gratitude',
          text: "Write down 3 things you're grateful for each day",
          reason: 'Gratitude practice has been shown to improve mental wellbeing'
        }
      ];
      
      for (const generic of generics) {
        if (suggestions.length < 3 && !suggestions.some(s => s.id === generic.id)) {
          suggestions.push(generic);
        }
      }
    }

    return suggestions.slice(0, 3);
  };

  // If we don't have enough entries, use generic goals
  const getGoalSuggestions = () => {
    if (hasEnoughEntries) {
      return generatePersonalizedSuggestions();
    } else {
      // Use 3 random generic goals
      return genericGoals.slice(0, 3);
    }
  };

  const goalSuggestions = getGoalSuggestions();

  // For entry page - show goals to check off
  if (entryId && todayEntry) {
    const entryGoals = todayEntry.goals || [];
    
    if (!isPremium || entryGoals.length === 0) {
      return null;
    }
    
    return (
      <div className="tap-card">
        <h3 className="text-lg font-medium mb-2">Today's Goals</h3>
        <p className="text-sm text-muted-foreground mb-4">Track your daily progress</p>
        
        <div className="space-y-2">
          {entryGoals.map(goal => (
            <div key={goal.id} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
              <span className="text-sm flex-1">{goal.text}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleCompletion(goal.id, !goal.completed)}
                  className={`p-1 rounded-full ${goal.completed ? 'text-green-500' : 'text-muted-foreground'}`}
                >
                  <CheckCircle size={20} />
                </button>
                <button
                  onClick={() => handleRemoveGoal(goal.id)}
                  className="p-1 rounded-full text-muted-foreground hover:text-destructive"
                >
                  <XCircle size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // For insights page - show suggestions
  if (isInsightsPage) {
    if (!isPremium) {
      return (
        <div className="tap-card flex flex-col items-center justify-center py-8 bg-muted/30">
          <Info className="w-10 h-10 text-muted-foreground mb-2" />
          <h3 className="text-lg font-medium">Smart Goal Suggestions</h3>
          <p className="text-sm text-muted-foreground text-center mt-1 max-w-sm">
            Get personalized recommendations based on your habits
          </p>
          <div className="text-primary text-sm mt-4">
            Premium Feature
          </div>
        </div>
      );
    }

    return (
      <div className="tap-card">
        <h3 className="text-lg font-medium mb-2">Smart Goal Suggestions</h3>
        <p className="text-sm text-muted-foreground mb-4">
          {hasEnoughEntries 
            ? 'Personalized recommendations based on your journal data' 
            : 'General wellness goals to get you started'}
        </p>
        
        <div className="space-y-3">
          {goalSuggestions.map(suggestion => (
            <div key={suggestion.id} className="border rounded-lg p-4">
              <p className="text-sm mb-1">{suggestion.text}</p>
              <p className="text-xs text-muted-foreground mb-3">{suggestion.reason}</p>
              <div className="flex justify-end">
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => handleAddGoal(suggestion.text)}
                >
                  <Plus size={14} className="mr-1" /> Add Goal
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default SmartGoalTracker;
