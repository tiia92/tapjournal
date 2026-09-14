import React, { useState, useEffect } from 'react';
import { Clock, ChevronLeft, ChevronRight, Check, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { calculateProgramDay, isDayAccessible, getTodayDate } from '@/utils/trackerUtils';

interface ProgramDayData {
  day: number;
  title: string;
  description: string;
  practice: {
    duration: string;
    description: string;
    steps: { id: string; task: string }[];
  };
  reflection: {
    questions: { id: string; question: string }[];
  };
}

interface HabitProgram {
  overview: {
    title: string;
    description: string;
    duration: string;
    level: string;
    goal: string;
  };
  days: ProgramDayData[];
}

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

interface HabitProgramViewProps {
  programId: string;
  program: HabitProgram;
  storageKey: string;
  onBack: () => void;
  onStart?: () => void;
}

const HabitProgramView: React.FC<HabitProgramViewProps> = ({
  programId,
  program,
  storageKey,
  onBack,
  onStart,
}) => {
  const totalDays = program.days.length;
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState<ProgramProgress | null>(null);
  const [day, setDay] = useState(1);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [allowSkip, setAllowSkip] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const p = JSON.parse(saved) as ProgramProgress;
      setProgress(p);
      setStarted(true);
      const d = Math.min(calculateProgramDay(p.startDate), totalDays);
      setDay(d);
      if (p.dayData[d]?.responses) {
        setResponses(p.dayData[d].responses);
      }
    }
  }, [storageKey, totalDays]);

  const startProgram = () => {
    const today = getTodayDate();
    const newProgress: ProgramProgress = {
      programId,
      startDate: today,
      currentDay: 1,
      completed: false,
      dayData: { 1: { completed: false, responses: {} } },
    };
    setProgress(newProgress);
    setStarted(true);
    setDay(1);
    localStorage.setItem(storageKey, JSON.stringify(newProgress));
    onStart?.();
    toast.success(`${program.overview.title} started!`);
  };

  const handleResponse = (id: string, value: any) => {
    setResponses(prev => {
      const updated = { ...prev, [id]: value };
      if (progress) {
        const up = { ...progress };
        if (!up.dayData[day]) up.dayData[day] = { completed: false, responses: {} };
        up.dayData[day].responses = updated;
        setProgress(up);
        localStorage.setItem(storageKey, JSON.stringify(up));
      }
      return updated;
    });
  };

  const goToDay = (newDay: number) => {
    if (newDay < 1 || newDay > totalDays || !progress) return;
    const canAccess = allowSkip || isDayAccessible(progress.startDate, newDay);
    if (!canAccess) {
      toast.info("This day will be available later. Enable 'Skip Days' to access it now.");
      return;
    }
    const up = { ...progress };
    if (!up.dayData[newDay]) {
      up.dayData[newDay] = { completed: false, responses: {} };
      setProgress(up);
      localStorage.setItem(storageKey, JSON.stringify(up));
    }
    setDay(newDay);
    setResponses(up.dayData[newDay].responses || {});
  };

  const completeDay = () => {
    if (!progress) return;
    const up = { ...progress };
    if (!up.dayData[day]) up.dayData[day] = { completed: false, responses: {} };
    up.dayData[day].completed = true;
    if (day === totalDays) {
      up.completed = true;
      toast.success(`Congratulations! You've completed the ${program.overview.title}!`);
    } else {
      toast.success(`Day ${day} completed!`);
    }
    setProgress(up);
    localStorage.setItem(storageKey, JSON.stringify(up));
  };

  const dayData = program.days[day - 1];
  const isAccessible = allowSkip || (progress
    ? isDayAccessible(progress.startDate, day)
    : day === 1);
  const completedCount = progress
    ? Object.keys(progress.dayData).filter(d => progress.dayData[parseInt(d)].completed).length
    : 0;
  const progressPct = (completedCount / totalDays) * 100;
  const dayCompleted = progress?.dayData[day]?.completed || false;

  return (
    <div className="tap-card">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="flex items-center text-sm text-primary">
          <ChevronLeft size={16} className="mr-1" /> Back to Programs
        </button>
        <div className="flex items-center">
          <div className="text-sm text-muted-foreground mr-4">
            {started ? `Day ${day} of ${totalDays}` : 'Program Overview'}
          </div>
          {started && (
            <Button variant="outline" size="sm" onClick={() => setAllowSkip(!allowSkip)} className="text-xs h-8">
              {allowSkip ? 'Disable Skip' : 'Enable Skip'}
            </Button>
          )}
        </div>
      </div>

      {started && (
        <div className="mb-6">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Day 1</span>
            <span>Day {totalDays}</span>
          </div>
          <Progress value={progressPct} className="h-2" />
        </div>
      )}

      <h2 className="text-2xl font-bold mb-2">{program.overview.title}</h2>

      {!started ? (
        <div className="space-y-6">
          <p className="text-muted-foreground">{program.overview.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <Card><CardHeader className="p-4"><CardTitle className="text-lg">Duration</CardTitle></CardHeader>
              <CardContent className="p-4 pt-0"><p>{program.overview.duration}</p></CardContent></Card>
            <Card><CardHeader className="p-4"><CardTitle className="text-lg">Level</CardTitle></CardHeader>
              <CardContent className="p-4 pt-0"><p>{program.overview.level}</p></CardContent></Card>
          </div>
          <Card><CardHeader className="p-4"><CardTitle className="text-lg">Goal</CardTitle></CardHeader>
            <CardContent className="p-4 pt-0"><p>{program.overview.goal}</p></CardContent></Card>
          <div className="pt-4">
            <Button onClick={startProgram} className="w-full">Start {totalDays}-Day Program</Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Day {day}: {dayData.title}</h3>
            <p className="text-muted-foreground">{dayData.description}</p>
          </div>

          {isAccessible ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{dayData.practice.duration}</CardTitle>
                  <CardDescription>{dayData.practice.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {dayData.practice.steps.map(step => (
                      <div key={step.id} className="flex items-start space-x-2">
                        <button
                          onClick={() => handleResponse(`step-${step.id}`, !responses[`step-${step.id}`])}
                          className={`w-6 h-6 mt-0.5 rounded flex items-center justify-center ${responses[`step-${step.id}`] ? 'bg-primary' : 'border border-input'}`}
                        >
                          {responses[`step-${step.id}`] && <Check size={14} className="text-primary-foreground" />}
                        </button>
                        <span>{step.task}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Evening Reflection</CardTitle>
                  <CardDescription>Take a moment to journal your experience.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dayData.reflection.questions.map(q => (
                      <div key={q.id} className="space-y-2">
                        <label className="block text-sm font-medium">{q.question}</label>
                        <Textarea
                          value={responses[q.id] || ''}
                          onChange={(e) => handleResponse(q.id, e.target.value)}
                          placeholder="Your reflection..."
                          className="w-full"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => goToDay(day - 1)} disabled={day === 1}>
                  <ChevronLeft size={16} className="mr-1" /> Previous Day
                </Button>
                <Button onClick={completeDay} disabled={dayCompleted}>
                  {dayCompleted ? 'Day Completed' : 'Complete Day'}
                </Button>
                <Button variant="outline" onClick={() => goToDay(day + 1)} disabled={day === totalDays}>
                  Next Day <ChevronRight size={16} className="ml-1" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-10 flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                <Lock className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Content Locked</h3>
              <p className="text-center text-muted-foreground">This day's content will be available at 8 AM on its scheduled date.</p>
              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <Clock size={16} className="mr-1" /> Check back later
              </div>
              <Button variant="outline" onClick={() => setAllowSkip(true)}>Skip Time Restrictions</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HabitProgramView;
