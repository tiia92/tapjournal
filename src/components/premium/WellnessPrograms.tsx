
import React, { useState } from 'react';
import { Target, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';

interface Program {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

const programs: Program[] = [
  {
    id: 'sleep-reset',
    title: '7-Day Sleep Reset',
    description: 'Improve your sleep quality with this structured program',
    duration: '7 days',
    level: 'Beginner',
  },
  {
    id: 'mindfulness',
    title: '30-Day Mindfulness',
    description: 'Build a daily meditation practice with guided exercises',
    duration: '30 days',
    level: 'Intermediate',
  },
  {
    id: 'hydration',
    title: 'Hydration Challenge',
    description: 'Track and improve your daily water intake',
    duration: '14 days',
    level: 'Beginner',
  },
  {
    id: 'digital-detox',
    title: 'Digital Detox',
    description: 'Reduce screen time and improve focus',
    duration: '21 days',
    level: 'Advanced',
  },
];

const WellnessPrograms: React.FC = () => {
  const { user } = useAuth();
  const isPremium = user?.isPremium || false;
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const handleProgramClick = (program: Program) => {
    setSelectedProgram(program);
    setShowComingSoon(true);
  };

  if (!isPremium) {
    return (
      <div className="tap-card flex flex-col items-center justify-center py-8 bg-muted/30">
        <Target className="w-10 h-10 text-muted-foreground mb-2" />
        <h3 className="text-lg font-medium">Wellness Programs</h3>
        <p className="text-sm text-muted-foreground text-center mt-1 max-w-sm">
          Follow structured programs to build positive habits
        </p>
        <div className="text-primary text-sm mt-4">
          Premium Feature
        </div>
      </div>
    );
  }

  return (
    <div className="tap-card">
      <h3 className="text-lg font-medium mb-2">Wellness Programs</h3>
      <p className="text-sm text-muted-foreground mb-4">Follow structured programs to build habits</p>
      
      <div className="space-y-3">
        {programs.map(program => (
          <div key={program.id} className="border rounded-lg overflow-hidden">
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{program.title}</h4>
                  <p className="text-sm text-muted-foreground">{program.description}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-3">
                <div className="flex space-x-2">
                  <span className="text-xs px-2 py-1 bg-secondary rounded-full">
                    {program.duration}
                  </span>
                  <span className="text-xs px-2 py-1 bg-secondary rounded-full">
                    {program.level}
                  </span>
                </div>
                
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-8 px-2"
                  onClick={() => handleProgramClick(program)}
                >
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={showComingSoon} onOpenChange={setShowComingSoon}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedProgram?.title}</DialogTitle>
            <DialogDescription>
              We're excited to announce that {selectedProgram?.title} is coming soon! 
              We're working hard to bring you the best experience possible.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center text-2xl animate-pulse">🚀</p>
            <p className="text-center font-semibold mt-2">Coming Soon!</p>
            <p className="text-center text-sm text-muted-foreground mt-1">
              This program will be available in a future update.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowComingSoon(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WellnessPrograms;
