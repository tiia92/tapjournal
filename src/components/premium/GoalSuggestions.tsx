
import React from 'react';
import { Target, ThumbsUp, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Suggestion {
  id: string;
  text: string;
  category: 'sleep' | 'hydration' | 'exercise' | 'mindfulness';
}

const suggestions: Suggestion[] = [
  {
    id: '1',
    text: 'You tend to sleep less on Mondays. Try going to bed 30 minutes earlier on Sunday nights.',
    category: 'sleep',
  },
  {
    id: '2',
    text: 'Your water intake is lowest in the morning. Consider starting your day with a glass of water.',
    category: 'hydration',
  },
  {
    id: '3',
    text: 'You track more exercise on weekends. Try adding a short 10-minute workout on weekdays.',
    category: 'exercise',
  },
  {
    id: '4',
    text: 'You report better mood on days with mindfulness practice. Consider making it a daily habit.',
    category: 'mindfulness',
  },
];

const GoalSuggestions: React.FC = () => {
  const { user } = useAuth();
  const isPremium = user?.isPremium || false;

  const handleAcceptSuggestion = (suggestion: Suggestion) => {
    toast.success(`Goal added: ${suggestion.text}`);
  };

  const handleDismissSuggestion = () => {
    toast.info('Suggestion dismissed');
  };

  if (!isPremium) {
    return (
      <div className="tap-card flex flex-col items-center justify-center py-8 bg-muted/30">
        <Target className="w-10 h-10 text-muted-foreground mb-2" />
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
      <p className="text-sm text-muted-foreground mb-4">Personalized recommendations based on your habits</p>
      
      <div className="space-y-3">
        {suggestions.map(suggestion => (
          <div key={suggestion.id} className="border rounded-lg p-4">
            <p className="text-sm mb-3">{suggestion.text}</p>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => handleDismissSuggestion()}
              >
                <X size={14} className="mr-1" /> Dismiss
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                className="flex-1"
                onClick={() => handleAcceptSuggestion(suggestion)}
              >
                <ThumbsUp size={14} className="mr-1" /> Add Goal
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalSuggestions;
