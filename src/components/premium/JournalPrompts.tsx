
import React, { useState } from 'react';
import { BookOpen, RefreshCw } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

// List of journal prompts
const journalPrompts = [
  "What are three things you're grateful for today?",
  "What's something that challenged you today, and how did you handle it?",
  "Describe a moment that brought you joy recently.",
  "What's one habit you'd like to improve, and what's your first small step?",
  "How did you practice self-care today?",
  "What boundaries do you need to set or maintain?",
  "Describe something new you learned recently.",
  "What's a goal you're working toward? What progress have you made?",
  "Write about a person who has positively influenced your life.",
  "What emotions are you experiencing right now, and why?",
  "What would make tomorrow great?",
  "What's one thing you'd like to let go of?",
  "Describe your ideal day from start to finish.",
  "What have you been putting off that needs your attention?",
  "Write about a meaningful conversation you had recently.",
  "What personal strength helped you this week?",
  "Describe a place where you feel completely at peace.",
  "What's something you've been overthinking lately?",
  "What are you looking forward to in the coming weeks?",
  "How have you grown or changed in the past year?",
];

interface JournalPromptsProps {
  inJournalPage?: boolean;
}

const JournalPrompts: React.FC<JournalPromptsProps> = ({ inJournalPage = false }) => {
  const { user } = useAuth();
  const isPremium = user?.isPremium || false;
  const [currentPrompt, setCurrentPrompt] = useState(() => {
    return journalPrompts[Math.floor(Math.random() * journalPrompts.length)];
  });

  const getRandomPrompt = () => {
    let newPrompt = currentPrompt;
    // Make sure we don't get the same prompt twice in a row
    while (newPrompt === currentPrompt) {
      newPrompt = journalPrompts[Math.floor(Math.random() * journalPrompts.length)];
    }
    setCurrentPrompt(newPrompt);
  };

  if (!isPremium) {
    return (
      <div className="tap-card flex flex-col items-center justify-center py-8 bg-muted/30">
        <BookOpen className="w-10 h-10 text-muted-foreground mb-2" />
        <h3 className="text-lg font-medium">Journal Prompts</h3>
        <p className="text-sm text-muted-foreground text-center mt-1 max-w-sm">
          Access thought-provoking prompts for daily reflection
        </p>
        <div className="text-primary text-sm mt-4">
          Premium Feature
        </div>
      </div>
    );
  }

  // Simplified version for journal notes section
  if (inJournalPage) {
    return (
      <div>
        <div className="bg-secondary/50 p-4 rounded-lg mb-3 flex flex-col gap-2">
          <p className="text-sm font-medium flex items-center gap-1">
            <BookOpen size={14} className="text-primary" />
            Journal Prompt
          </p>
          <p className="text-sm italic">"{currentPrompt}"</p>
        </div>
        
        <button 
          onClick={getRandomPrompt}
          className="text-xs text-muted-foreground hover:text-primary flex items-center transition-colors"
        >
          <RefreshCw size={12} className="mr-1" /> Get new prompt
        </button>
      </div>
    );
  }

  // Full version for journal page
  return (
    <div className="tap-card">
      <h3 className="text-lg font-medium mb-2">Journal Prompts</h3>
      <p className="text-sm text-muted-foreground mb-4">Inspiration for your daily reflection</p>
      
      <div className="bg-secondary/50 p-4 rounded-lg mb-4">
        <p className="text-center italic">"{currentPrompt}"</p>
      </div>
      
      <Button 
        onClick={getRandomPrompt}
        variant="outline"
        className="w-full flex items-center justify-center"
      >
        <RefreshCw size={16} className="mr-2" /> Get New Prompt
      </Button>
    </div>
  );
};

export default JournalPrompts;
