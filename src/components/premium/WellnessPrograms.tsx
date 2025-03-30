
import React, { useState, useEffect } from 'react';
import { Target, ArrowRight, Clock, ChevronLeft, ChevronRight, Check, Lock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { calculateProgramDay, isDayAccessible, getTodayDate } from '@/utils/trackerUtils';

interface Program {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface ProgramDay {
  day: number;
  title: string;
  description: string;
  morningReflection: {
    questions: Array<{
      id: string;
      question: string;
      type: 'text' | 'rating' | 'yesno' | 'checkbox';
      options?: string[];
    }>;
  };
  dailyChallenge: {
    description: string;
    tasks: Array<{
      id: string;
      task: string;
    }>;
  };
  eveningRitual: {
    description: string;
    tasks: Array<{
      id: string;
      task: string;
    }>;
  };
  sleepTracker: {
    fields: Array<{
      id: string;
      label: string;
      type: 'text' | 'time' | 'rating';
    }>;
  };
}

const sleepResetProgram: {
  overview: {
    title: string;
    description: string;
    duration: string;
    level: string;
    goal: string;
  };
  days: ProgramDay[];
  completion: {
    title: string;
    sections: Array<{
      title: string;
      questions: Array<{
        id: string;
        question: string;
        type: 'text' | 'rating';
      }>;
    }>;
  };
} = {
  overview: {
    title: "7-Day Sleep Reset",
    description: "Transform your sleep quality in just one week with this structured program designed to reset your sleep patterns and establish healthy bedtime habits.",
    duration: "7 days",
    level: "Beginner",
    goal: "Improve sleep quality and establish a consistent sleep routine"
  },
  days: [
    {
      day: 1,
      title: "Sleep Environment Audit",
      description: "Today we'll examine your sleep environment and identify opportunities for improvement.",
      morningReflection: {
        questions: [
          {
            id: "sleep-quality",
            question: "How did you sleep last night? Rate your sleep quality from 1-10.",
            type: "rating"
          },
          {
            id: "sleep-factors",
            question: "What factors might have affected your sleep (temperature, noise, light, etc.)?",
            type: "text"
          }
        ]
      },
      dailyChallenge: {
        description: "Evaluate your sleeping environment using the following checklist:",
        tasks: [
          { id: "dark-room", task: "Is your room dark enough?" },
          { id: "temp-comfort", task: "Is the temperature comfortable (60-67°F/15-19°C is ideal)?" },
          { id: "mattress-support", task: "Is your mattress and pillow supportive?" },
          { id: "noise-level", task: "Is your room quiet or do you have appropriate white noise?" },
          { id: "clutter-free", task: "Is your room clean and free of clutter?" }
        ]
      },
      eveningRitual: {
        description: "Make one meaningful improvement to your sleep environment based on your audit.",
        tasks: [
          { id: "improvement", task: "Make one meaningful improvement to your sleep environment based on your audit." },
          { id: "record-change", task: "Record what change you made and how you expect it to help." }
        ]
      },
      sleepTracker: {
        fields: [
          { id: "bedtime", label: "Bedtime", type: "time" },
          { id: "wake-time", label: "Wake time", type: "time" },
          { id: "hours-slept", label: "Hours slept", type: "text" },
          { id: "sleep-quality", label: "Sleep quality (1-10)", type: "rating" }
        ]
      }
    },
    {
      day: 2,
      title: "Digital Sunset",
      description: "Today we'll focus on reducing evening screen time to improve your sleep quality.",
      morningReflection: {
        questions: [
          {
            id: "environment-improvement",
            question: "Did your environment change improve your sleep?",
            type: "yesno"
          },
          {
            id: "improvement-details",
            question: "How did it improve your sleep?",
            type: "text"
          },
          {
            id: "digital-devices",
            question: "What digital devices do you typically use before bed?",
            type: "text"
          }
        ]
      },
      dailyChallenge: {
        description: "Implement a \"digital sunset\" 1 hour before your intended bedtime:",
        tasks: [
          { id: "turn-off-screens", task: "Turn off all screens (phone, tablet, computer, TV)" },
          { id: "night-mode", task: "Enable night mode on essential devices" },
          { id: "charge-outside", task: "Charge your phone outside the bedroom" }
        ]
      },
      eveningRitual: {
        description: "Replace screen time with calming activities:",
        tasks: [
          { id: "calm-activity", task: "Replace screen time with a calm activity (reading, stretching, taking a bath)" },
          { id: "digital-free-feeling", task: "Note how you feel without digital stimulation before bed" }
        ]
      },
      sleepTracker: {
        fields: [
          { id: "bedtime", label: "Bedtime", type: "time" },
          { id: "wake-time", label: "Wake time", type: "time" },
          { id: "hours-slept", label: "Hours slept", type: "text" },
          { id: "sleep-quality", label: "Sleep quality (1-10)", type: "rating" }
        ]
      }
    },
    {
      day: 3,
      title: "Circadian Rhythm Reset",
      description: "Today we'll focus on aligning your sleep schedule with your body's natural rhythm.",
      morningReflection: {
        questions: [
          {
            id: "screen-effect",
            question: "How did avoiding screens before bed affect your sleep?",
            type: "text"
          },
          {
            id: "natural-tired-time",
            question: "What time do you naturally feel tired?",
            type: "text"
          },
          {
            id: "natural-wake-time",
            question: "What time do you naturally wake up?",
            type: "text"
          }
        ]
      },
      dailyChallenge: {
        description: "Reset your circadian rhythm with these tasks:",
        tasks: [
          { id: "consistent-schedule", task: "Set a consistent sleep and wake time (aim for 7-9 hours of sleep)" },
          { id: "morning-sunlight", task: "Get 10-15 minutes of morning sunlight exposure within an hour of waking" },
          { id: "limit-caffeine", task: "Avoid caffeine after 12pm" }
        ]
      },
      eveningRitual: {
        description: "Prepare your body for sleep by managing light exposure:",
        tasks: [
          { id: "dim-lights", task: "Begin dimming lights in your home 2 hours before bedtime" },
          { id: "energy-levels", task: "Note how your energy levels fluctuated throughout the day" }
        ]
      },
      sleepTracker: {
        fields: [
          { id: "bedtime", label: "Bedtime", type: "time" },
          { id: "wake-time", label: "Wake time", type: "time" },
          { id: "hours-slept", label: "Hours slept", type: "text" },
          { id: "sleep-quality", label: "Sleep quality (1-10)", type: "rating" }
        ]
      }
    },
    {
      day: 4,
      title: "Evening Nutrition",
      description: "Today we'll focus on how your evening eating habits affect your sleep quality.",
      morningReflection: {
        questions: [
          {
            id: "consistent-schedule-effect",
            question: "How did maintaining a consistent sleep-wake time affect your energy?",
            type: "text"
          },
          {
            id: "evening-food",
            question: "What and when did you eat and drink yesterday evening?",
            type: "text"
          }
        ]
      },
      dailyChallenge: {
        description: "Optimize your evening nutrition for better sleep:",
        tasks: [
          { id: "meal-timing", task: "Finish your last meal 2-3 hours before bedtime" },
          { id: "avoid-alcohol-sugar", task: "Avoid alcohol and excessive sugar in the evening" },
          { id: "sleep-promoting-snacks", task: "If hungry before bed, choose sleep-promoting snacks (small banana, handful of nuts, or herbal tea)" }
        ]
      },
      eveningRitual: {
        description: "Incorporate calming beverages into your bedtime routine:",
        tasks: [
          { id: "herbal-tea", task: "Enjoy a cup of caffeine-free herbal tea (chamomile, valerian, or lavender)" },
          { id: "appetite-changes", task: "Record any changes in your evening appetite" }
        ]
      },
      sleepTracker: {
        fields: [
          { id: "bedtime", label: "Bedtime", type: "time" },
          { id: "wake-time", label: "Wake time", type: "time" },
          { id: "hours-slept", label: "Hours slept", type: "text" },
          { id: "sleep-quality", label: "Sleep quality (1-10)", type: "rating" }
        ]
      }
    },
    {
      day: 5,
      title: "Stress Release",
      description: "Today we'll focus on managing evening stress for better sleep quality.",
      morningReflection: {
        questions: [
          {
            id: "nutrition-effect",
            question: "Did your evening nutrition choices affect your sleep quality?",
            type: "yesno"
          },
          {
            id: "nutrition-effect-details",
            question: "If yes, how did they affect your sleep?",
            type: "text"
          },
          {
            id: "bedtime-thoughts",
            question: "What thoughts typically run through your mind as you try to fall asleep?",
            type: "text"
          }
        ]
      },
      dailyChallenge: {
        description: "Practice a 10-minute stress-release activity in the evening:",
        tasks: [
          { id: "muscle-relaxation", task: "Progressive muscle relaxation" },
          { id: "gentle-yoga", task: "Gentle yoga stretches" },
          { id: "deep-breathing", task: "Deep breathing exercises" },
          { id: "journaling", task: "Journaling worries or tomorrow's to-do list" }
        ]
      },
      eveningRitual: {
        description: "Clear your mind before sleep:",
        tasks: [
          { id: "worry-dump", task: "Create a \"worry dump\" by writing down any concerns or tasks for tomorrow" },
          { id: "body-awareness", task: "Notice how your body feels after your stress-release activity" }
        ]
      },
      sleepTracker: {
        fields: [
          { id: "bedtime", label: "Bedtime", type: "time" },
          { id: "wake-time", label: "Wake time", type: "time" },
          { id: "hours-slept", label: "Hours slept", type: "text" },
          { id: "sleep-quality", label: "Sleep quality (1-10)", type: "rating" }
        ]
      }
    },
    {
      day: 6,
      title: "Movement for Better Sleep",
      description: "Today we'll focus on how daily physical activity impacts sleep quality.",
      morningReflection: {
        questions: [
          {
            id: "stress-release-effect",
            question: "How did your stress-release activity affect your ability to fall asleep?",
            type: "text"
          },
          {
            id: "activity-level",
            question: "How active were you yesterday?",
            type: "text"
          },
          {
            id: "exercise-timing",
            question: "When did you exercise?",
            type: "text"
          }
        ]
      },
      dailyChallenge: {
        description: "Incorporate appropriate movement into your day:",
        tasks: [
          { id: "moderate-activity", task: "Get 20-30 minutes of moderate physical activity (avoid vigorous exercise 1-2 hours before bed)" },
          { id: "evening-stretches", task: "Try gentle evening stretches focused on releasing tension" }
        ]
      },
      eveningRitual: {
        description: "Prepare your body for rest with gentle movement:",
        tasks: [
          { id: "bedtime-stretching", task: "Practice 5 minutes of gentle stretching before bed" },
          { id: "body-comparison", task: "Note how your body feels compared to evenings without movement" }
        ]
      },
      sleepTracker: {
        fields: [
          { id: "bedtime", label: "Bedtime", type: "time" },
          { id: "wake-time", label: "Wake time", type: "time" },
          { id: "hours-slept", label: "Hours slept", type: "text" },
          { id: "sleep-quality", label: "Sleep quality (1-10)", type: "rating" }
        ]
      }
    },
    {
      day: 7,
      title: "Create Your Ideal Sleep Routine",
      description: "Today we'll combine all the practices you've learned to design your personalized sleep routine.",
      morningReflection: {
        questions: [
          {
            id: "movement-impact",
            question: "How did physical movement impact your sleep quality?",
            type: "text"
          },
          {
            id: "effective-practices",
            question: "Which practices from this week had the most positive impact on your sleep?",
            type: "text"
          }
        ]
      },
      dailyChallenge: {
        description: "Create your personalized sleep routine:",
        tasks: [
          { id: "design-routine", task: "Design your personalized sleep routine combining the most effective elements you've discovered" },
          { id: "bedtime-ritual", task: "Create a realistic bedtime ritual that takes 15-30 minutes and includes 3-5 key activities" }
        ]
      },
      eveningRitual: {
        description: "Implement your new sleep routine:",
        tasks: [
          { id: "implement-routine", task: "Implement your complete personalized sleep routine" },
          { id: "sleep-commitment", task: "Write down your commitment to better sleep moving forward" }
        ]
      },
      sleepTracker: {
        fields: [
          { id: "bedtime", label: "Bedtime", type: "time" },
          { id: "wake-time", label: "Wake time", type: "time" },
          { id: "hours-slept", label: "Hours slept", type: "text" },
          { id: "sleep-quality", label: "Sleep quality (1-10)", type: "rating" }
        ]
      }
    }
  ],
  completion: {
    title: "Program Completion Reflection",
    sections: [
      {
        title: "Sleep Improvement Assessment",
        questions: [
          {
            id: "sleep-comparison",
            question: "Compare your Day 1 and Day 7 sleep quality ratings",
            type: "text"
          },
          {
            id: "biggest-impact",
            question: "Which changes had the biggest impact on your sleep?",
            type: "text"
          },
          {
            id: "challenges",
            question: "What challenges did you face during this program?",
            type: "text"
          },
          {
            id: "continuing-habits",
            question: "Which habits will you continue?",
            type: "text"
          }
        ]
      },
      {
        title: "Next Steps",
        questions: [
          {
            id: "maintain-routine",
            question: "Commit to maintaining your personalized sleep routine for at least 21 more days",
            type: "text"
          },
          {
            id: "advanced-techniques",
            question: "Consider advanced sleep optimization techniques",
            type: "text"
          },
          {
            id: "weekly-tracking",
            question: "Track your progress weekly to maintain awareness",
            type: "text"
          }
        ]
      },
      {
        title: "Sleep Quality Transformation",
        questions: [
          {
            id: "initial-quality",
            question: "Initial sleep quality (Day 1)",
            type: "rating"
          },
          {
            id: "final-quality",
            question: "Final sleep quality (Day 7)",
            type: "rating"
          },
          {
            id: "total-improvement",
            question: "Total improvement",
            type: "text"
          }
        ]
      }
    ]
  }
};

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

interface ProgramProgress {
  programId: string;
  startDate: string;
  currentDay: number;
  completed: boolean;
  dayData: {
    [day: number]: {
      completed: boolean;
      responses: Record<string, any>;
    };
  };
}

const WellnessPrograms: React.FC = () => {
  const { user } = useAuth();
  const isPremium = user?.isPremium || false;
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [activeProgramId, setActiveProgramId] = useState<string | null>(null);
  
  // For Sleep Reset program
  const [showSleepResetProgram, setShowSleepResetProgram] = useState(false);
  const [currentProgramDay, setCurrentProgramDay] = useState(1);
  const [programStarted, setProgramStarted] = useState(false);
  const [programProgress, setProgramProgress] = useState<ProgramProgress | null>(null);
  const [responses, setResponses] = useState<Record<string, any>>({});

  useEffect(() => {
    // Load saved program progress from localStorage
    const savedProgress = localStorage.getItem('sleepResetProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress) as ProgramProgress;
      setProgramProgress(progress);
      setActiveProgramId(progress.programId);
      setProgramStarted(true);
      
      // Calculate current program day based on start date
      const currentDay = calculateProgramDay(progress.startDate);
      setCurrentProgramDay(Math.min(currentDay, 7)); // Cap at 7 days
      
      // Load responses for the current day if they exist
      if (progress.dayData[currentDay]?.responses) {
        setResponses(progress.dayData[currentDay].responses);
      }
    }
  }, []);

  const handleProgramClick = (program: Program) => {
    if (program.id === 'sleep-reset') {
      if (programStarted) {
        setShowSleepResetProgram(true);
      } else {
        setSelectedProgram(program);
        setShowComingSoon(false);
        setShowSleepResetProgram(true);
      }
    } else {
      setSelectedProgram(program);
      setShowComingSoon(true);
    }
  };

  const handleStartProgram = () => {
    if (selectedProgram?.id === 'sleep-reset') {
      const today = getTodayDate();
      const newProgress: ProgramProgress = {
        programId: 'sleep-reset',
        startDate: today,
        currentDay: 1,
        completed: false,
        dayData: {
          1: {
            completed: false,
            responses: {}
          }
        }
      };
      
      setProgramProgress(newProgress);
      setProgramStarted(true);
      setCurrentProgramDay(1);
      setActiveProgramId('sleep-reset');
      
      // Save to localStorage
      localStorage.setItem('sleepResetProgress', JSON.stringify(newProgress));
      
      toast.success('7-Day Sleep Reset program started!');
    }
  };

  const handlePreviousDay = () => {
    if (currentProgramDay > 1) {
      setCurrentProgramDay(currentProgramDay - 1);
      
      // Load responses for the previous day if they exist
      if (programProgress?.dayData[currentProgramDay - 1]?.responses) {
        setResponses(programProgress.dayData[currentProgramDay - 1].responses);
      } else {
        setResponses({});
      }
    }
  };

  const handleNextDay = () => {
    if (currentProgramDay < 7 && programProgress) {
      // Check if the next day is accessible
      const canAccess = isDayAccessible(programProgress.startDate, currentProgramDay + 1);
      
      if (canAccess) {
        setCurrentProgramDay(currentProgramDay + 1);
        
        // Initialize the next day's data if it doesn't exist
        const updatedProgress = { ...programProgress };
        if (!updatedProgress.dayData[currentProgramDay + 1]) {
          updatedProgress.dayData[currentProgramDay + 1] = {
            completed: false,
            responses: {}
          };
          setProgramProgress(updatedProgress);
          localStorage.setItem('sleepResetProgress', JSON.stringify(updatedProgress));
        }
        
        // Load responses for the next day if they exist
        if (updatedProgress.dayData[currentProgramDay + 1]?.responses) {
          setResponses(updatedProgress.dayData[currentProgramDay + 1].responses);
        } else {
          setResponses({});
        }
      } else {
        toast.info("This day will be available tomorrow at 8 AM.");
      }
    }
  };

  const handleResponseChange = (id: string, value: any) => {
    setResponses(prev => {
      const updated = { ...prev, [id]: value };
      
      // Update progress in state and localStorage
      if (programProgress) {
        const updatedProgress = { ...programProgress };
        if (!updatedProgress.dayData[currentProgramDay]) {
          updatedProgress.dayData[currentProgramDay] = {
            completed: false,
            responses: {}
          };
        }
        updatedProgress.dayData[currentProgramDay].responses = updated;
        setProgramProgress(updatedProgress);
        localStorage.setItem('sleepResetProgress', JSON.stringify(updatedProgress));
      }
      
      return updated;
    });
  };

  const completeDay = () => {
    if (programProgress) {
      const updatedProgress = { ...programProgress };
      if (!updatedProgress.dayData[currentProgramDay]) {
        updatedProgress.dayData[currentProgramDay] = {
          completed: false,
          responses: {}
        };
      }
      updatedProgress.dayData[currentProgramDay].completed = true;
      
      // If it's the last day, mark the program as completed
      if (currentProgramDay === 7) {
        updatedProgress.completed = true;
        toast.success("Congratulations! You've completed the 7-Day Sleep Reset program!");
      } else {
        toast.success(`Day ${currentProgramDay} completed!`);
      }
      
      setProgramProgress(updatedProgress);
      localStorage.setItem('sleepResetProgress', JSON.stringify(updatedProgress));
    }
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

  // Sleep Reset Program Display
  if (showSleepResetProgram) {
    const dayData = sleepResetProgram.days[currentProgramDay - 1];
    const isAccessible = programProgress ? 
      isDayAccessible(programProgress.startDate, currentProgramDay) : 
      currentProgramDay === 1;
    
    const progress = programProgress ? 
      (Object.keys(programProgress.dayData).filter(day => 
        programProgress.dayData[parseInt(day)].completed).length / 7) * 100 : 0;
    
    const dayCompleted = programProgress?.dayData[currentProgramDay]?.completed || false;

    return (
      <div className="tap-card">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setShowSleepResetProgram(false)}
            className="flex items-center text-sm text-primary"
          >
            <ChevronLeft size={16} className="mr-1" /> Back to Programs
          </button>
          
          <div className="text-sm text-muted-foreground">
            {programStarted ? `Day ${currentProgramDay} of 7` : 'Program Overview'}
          </div>
        </div>

        {/* Progress bar */}
        {programStarted && (
          <div className="mb-6">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Day 1</span>
              <span>Day 7</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
        
        {/* Program header */}
        <h2 className="text-2xl font-bold mb-2">{sleepResetProgram.overview.title}</h2>
        
        {!programStarted ? (
          // Program overview (before starting)
          <div className="space-y-6">
            <p className="text-muted-foreground">{sleepResetProgram.overview.description}</p>
            
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Duration</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p>{sleepResetProgram.overview.duration}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Level</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p>{sleepResetProgram.overview.level}</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Goal</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p>{sleepResetProgram.overview.goal}</p>
              </CardContent>
            </Card>
            
            <div className="pt-4">
              <Button 
                onClick={handleStartProgram} 
                className="w-full"
              >
                Start 7-Day Program
              </Button>
            </div>
          </div>
        ) : (
          // Daily program content
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">
                Day {currentProgramDay}: {dayData.title}
              </h3>
              <p className="text-muted-foreground">{dayData.description}</p>
            </div>
            
            {isAccessible ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Morning Reflection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dayData.morningReflection.questions.map((q) => (
                        <div key={q.id} className="space-y-2">
                          <label className="block text-sm font-medium">{q.question}</label>
                          {q.type === 'text' && (
                            <Textarea
                              value={responses[q.id] || ''}
                              onChange={(e) => handleResponseChange(q.id, e.target.value)}
                              placeholder="Your answer..."
                              className="w-full"
                            />
                          )}
                          {q.type === 'rating' && (
                            <div className="flex space-x-2">
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                <button
                                  key={num}
                                  className={`w-8 h-8 rounded-full flex items-center justify-center 
                                  ${responses[q.id] === num ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
                                  onClick={() => handleResponseChange(q.id, num)}
                                >
                                  {num}
                                </button>
                              ))}
                            </div>
                          )}
                          {q.type === 'yesno' && (
                            <div className="flex space-x-2">
                              <button
                                className={`px-4 py-2 rounded-md 
                                ${responses[q.id] === 'yes' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
                                onClick={() => handleResponseChange(q.id, 'yes')}
                              >
                                Yes
                              </button>
                              <button
                                className={`px-4 py-2 rounded-md 
                                ${responses[q.id] === 'no' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
                                onClick={() => handleResponseChange(q.id, 'no')}
                              >
                                No
                              </button>
                            </div>
                          )}
                          {q.type === 'checkbox' && (
                            <div className="space-y-2">
                              {q.options?.map(option => (
                                <label key={option} className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    checked={responses[`${q.id}-${option}`] || false}
                                    onChange={() => handleResponseChange(`${q.id}-${option}`, !responses[`${q.id}-${option}`])}
                                    className="form-checkbox"
                                  />
                                  <span>{option}</span>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Daily Challenge</CardTitle>
                    <CardDescription>{dayData.dailyChallenge.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {dayData.dailyChallenge.tasks.map((task) => (
                        <div key={task.id} className="flex items-start space-x-2">
                          <button
                            onClick={() => handleResponseChange(`task-${task.id}`, !responses[`task-${task.id}`])}
                            className={`w-6 h-6 mt-0.5 rounded flex items-center justify-center 
                            ${responses[`task-${task.id}`] ? 'bg-primary' : 'border border-input'}`}
                          >
                            {responses[`task-${task.id}`] && <Check size={14} className="text-primary-foreground" />}
                          </button>
                          <span>{task.task}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Evening Ritual</CardTitle>
                    <CardDescription>{dayData.eveningRitual.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {dayData.eveningRitual.tasks.map((task) => (
                        <div key={task.id} className="flex items-start space-x-2">
                          <button
                            onClick={() => handleResponseChange(`evening-${task.id}`, !responses[`evening-${task.id}`])}
                            className={`w-6 h-6 mt-0.5 rounded flex items-center justify-center 
                            ${responses[`evening-${task.id}`] ? 'bg-primary' : 'border border-input'}`}
                          >
                            {responses[`evening-${task.id}`] && <Check size={14} className="text-primary-foreground" />}
                          </button>
                          <span>{task.task}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Sleep Tracker</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dayData.sleepTracker.fields.map((field) => (
                        <div key={field.id} className="space-y-2">
                          <label className="block text-sm font-medium">{field.label}</label>
                          {field.type === 'text' && (
                            <input
                              type="text"
                              value={responses[`sleep-${field.id}`] || ''}
                              onChange={(e) => handleResponseChange(`sleep-${field.id}`, e.target.value)}
                              className="w-full p-2 border rounded-md"
                              placeholder="Your answer..."
                            />
                          )}
                          {field.type === 'time' && (
                            <input
                              type="time"
                              value={responses[`sleep-${field.id}`] || ''}
                              onChange={(e) => handleResponseChange(`sleep-${field.id}`, e.target.value)}
                              className="w-full p-2 border rounded-md"
                            />
                          )}
                          {field.type === 'rating' && (
                            <div className="flex space-x-2">
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                <button
                                  key={num}
                                  className={`w-8 h-8 rounded-full flex items-center justify-center 
                                  ${responses[`sleep-${field.id}`] === num ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
                                  onClick={() => handleResponseChange(`sleep-${field.id}`, num)}
                                >
                                  {num}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Navigation buttons */}
                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={handlePreviousDay}
                    disabled={currentProgramDay === 1}
                  >
                    <ChevronLeft size={16} className="mr-1" /> Previous Day
                  </Button>
                  
                  <Button 
                    onClick={completeDay}
                    disabled={dayCompleted}
                  >
                    {dayCompleted ? 'Day Completed' : 'Complete Day'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={handleNextDay}
                    disabled={currentProgramDay === 7}
                  >
                    Next Day <ChevronRight size={16} className="ml-1" />
                  </Button>
                </div>
              </div>
            ) : (
              // Locked content
              <div className="p-10 flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                  <Lock className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold">Content Locked</h3>
                <p className="text-center text-muted-foreground">
                  This day's content will be available at 8 AM tomorrow.
                </p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock size={16} className="mr-1" /> Check back tomorrow
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Programs list view
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
                {program.id === activeProgramId && (
                  <span className="text-xs px-2 py-1 bg-primary text-primary-foreground rounded-full">
                    Active
                  </span>
                )}
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
                  {program.id === activeProgramId ? 'Continue' : <ArrowRight size={16} />}
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
