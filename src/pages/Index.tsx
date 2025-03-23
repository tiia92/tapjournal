
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import DateNavigation from '@/components/DateNavigation';
import TapCounter from '@/components/TapCounter';
import TaskTracker from '@/components/TaskTracker';
import EmojiSelector from '@/components/EmojiSelector';
import AnimatedButton from '@/components/AnimatedButton';
import SymptomTracker from '@/components/SymptomTracker';
import MedicationTracker from '@/components/MedicationTracker';
import { useJournal, JournalEntry } from '@/context/JournalContext';
import { exerciseOptions, selfCareOptions, moodOptions } from '@/utils/trackerUtils';
import { Droplets, Moon, Home, Briefcase, Plus, Save, Edit, BookOpen } from 'lucide-react';
import { toast } from 'sonner';
import CategoryNote from '@/components/CategoryNote';
import VoiceJournal from '@/components/premium/VoiceJournal';
import JournalPrompts from '@/components/premium/JournalPrompts';
import CustomTrackers from '@/components/premium/CustomTrackers';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

// Helper function to get today's date based on user's timezone
const getTodayDateInUserTimezone = () => {
  const userTimezone = localStorage.getItem('userTimezone') || Intl.DateTimeFormat().resolvedOptions().timeZone;
  const options: Intl.DateTimeFormatOptions = { 
    timeZone: userTimezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  };
  const formatter = new Intl.DateTimeFormat('en-CA', options); // en-CA uses YYYY-MM-DD format
  return formatter.format(new Date()).replace(/\//g, '-');
};

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isPremium = user?.isPremium || false;
  
  const { 
    todayEntry, 
    createTodayEntry, 
    updateEntry, 
    checkIfTodayEntryExists, 
    getEntryByDate,
    getAllMedicationNames,
    getAllChoreNames,
    getAllWorkTaskNames
  } = useJournal();
  
  const [currentDate, setCurrentDate] = useState(getTodayDateInUserTimezone());
  const [entry, setEntry] = useState<JournalEntry | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState('');
  const [allMedicationNames, setAllMedicationNames] = useState<string[]>([]);
  const [allChoreNames, setAllChoreNames] = useState<string[]>([]);
  const [allWorkTaskNames, setAllWorkTaskNames] = useState<string[]>([]);
  const [moodNote, setMoodNote] = useState('');
  const [exerciseNote, setExerciseNote] = useState('');
  const [selfCareNote, setSelfCareNote] = useState('');
  
  useEffect(() => {
    const existingEntry = getEntryByDate(currentDate);
    
    if (existingEntry) {
      setEntry(existingEntry);
      setNotes(existingEntry.notes || '');
      setMoodNote(existingEntry.moodNote || '');
      setExerciseNote(existingEntry.exerciseNote || '');
      setSelfCareNote(existingEntry.selfCareNote || '');
    } else {
      setEntry(null);
      setNotes('');
      setMoodNote('');
      setExerciseNote('');
      setSelfCareNote('');
    }
    
    // Get all task and medication names
    setAllMedicationNames(getAllMedicationNames());
    setAllChoreNames(getAllChoreNames());
    setAllWorkTaskNames(getAllWorkTaskNames());
    
    // Reset editing state when changing dates
    setIsEditing(false);
  }, [currentDate, getEntryByDate, getAllMedicationNames, getAllChoreNames, getAllWorkTaskNames]);
  
  const handleCreateEntry = () => {
    if (currentDate === getTodayDateInUserTimezone()) {
      const newEntry = createTodayEntry();
      setEntry(newEntry);
      setIsEditing(true);
      toast.success('Created new entry for today');
    } else {
      const newEntry: JournalEntry = {
        id: crypto.randomUUID(),
        date: currentDate,
        waterCount: 0,
        sleepHours: 0,
        chores: [],
        workTasks: [],
        medications: [],
        mood: '',
        moodNote: '',
        exercises: [],
        exerciseNote: '',
        selfCareActivities: [],
        selfCareNote: '',
        notes: '',
        painLevel: 0,
        energyLevel: 0, // Starting at 0 as requested
        hasFever: false,
        hasCoughSneezing: false,
        hasNausea: false,
        otherSymptoms: '',
      };
      
      updateEntry(newEntry);
      setEntry(newEntry);
      setIsEditing(true);
      toast.success(`Created new entry for ${currentDate}`);
    }
  };
  
  const handleUpdateField = <K extends keyof JournalEntry>(
    field: K,
    value: JournalEntry[K]
  ) => {
    if (!entry) return;
    
    const updatedEntry = {
      ...entry,
      [field]: value,
    };
    
    setEntry(updatedEntry);
    updateEntry(updatedEntry);
  };

  const handleUpdateSymptom = (field: string, value: any) => {
    if (!entry) return;
    
    const updatedEntry = {
      ...entry,
      [field]: value,
    };
    
    setEntry(updatedEntry);
    updateEntry(updatedEntry);
  };
  
  const handleSaveNotes = () => {
    if (!entry) return;
    
    const updatedEntry = {
      ...entry,
      notes,
    };
    
    updateEntry(updatedEntry);
    setIsEditing(false);
    toast.success('Journal entry saved');
  };
  
  const handleViewJournal = () => {
    navigate('/journal');
  };

  const handleSaveEntry = () => {
    if (!entry) return;
    
    toast.success('Journal entry saved successfully');
  };
  
  if (!entry) {
    return (
      <Layout>
        <DateNavigation 
          currentDate={currentDate}
          onDateChange={setCurrentDate}
        />
        
        <div className="mt-8 flex flex-col items-center justify-center gap-4 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-medium mb-2">No Entry</h2>
            <p className="text-muted-foreground mb-6">
              You haven't created an entry for this date yet.
            </p>
          </div>
          
          <AnimatedButton onClick={handleCreateEntry} className="animate-pulse-soft">
            <Plus className="mr-2" size={18} />
            Create Entry
          </AnimatedButton>
          
          {currentDate !== getTodayDateInUserTimezone() && (
            <button 
              onClick={() => setCurrentDate(getTodayDateInUserTimezone())}
              className="text-primary text-sm mt-2"
            >
              Go to Today
            </button>
          )}
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <DateNavigation 
        currentDate={currentDate}
        onDateChange={setCurrentDate}
      />
      
      <div className="mt-6 space-y-6">
        {/* Mood, Exercise, and Self Care Sections - Moved to top as requested */}
        <div className="space-y-4">
          <EmojiSelector
            options={moodOptions}
            selectedIds={entry.mood ? [entry.mood] : []}
            onChange={(ids) => handleUpdateField('mood', ids[0] || '')}
            label="Today's Mood"
            multiSelect={false}
            labelOnly={true}
          />
          {entry.mood && (
            <CategoryNote
              value={moodNote}
              onChange={(value) => {
                setMoodNote(value);
                handleUpdateField('moodNote', value);
              }}
              placeholder="Add a note about your mood today..."
            />
          )}
          
          <EmojiSelector
            options={exerciseOptions}
            selectedIds={entry.exercises}
            onChange={(ids) => handleUpdateField('exercises', ids)}
            label="Exercise Activities"
            labelOnly={true}
          />
          {entry.exercises && entry.exercises.length > 0 && (
            <CategoryNote
              value={exerciseNote}
              onChange={(value) => {
                setExerciseNote(value);
                handleUpdateField('exerciseNote', value);
              }}
              placeholder="Add a note about your exercise today..."
            />
          )}
          
          <EmojiSelector
            options={selfCareOptions}
            selectedIds={entry.selfCareActivities}
            onChange={(ids) => handleUpdateField('selfCareActivities', ids)}
            label="Self Care Activities"
            labelOnly={true}
          />
          {entry.selfCareActivities && entry.selfCareActivities.length > 0 && (
            <CategoryNote
              value={selfCareNote}
              onChange={(value) => {
                setSelfCareNote(value);
                handleUpdateField('selfCareNote', value);
              }}
              placeholder="Add a note about your self-care today..."
            />
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <TapCounter
            count={entry.waterCount}
            onChange={(count) => handleUpdateField('waterCount', count)}
            icon={<Droplets className="text-blue-500" />}
            label="Water Glasses"
            color="bg-blue-100 text-blue-700"
          />
          
          <TapCounter
            count={entry.sleepHours}
            onChange={(count) => handleUpdateField('sleepHours', count)}
            icon={<Moon className="text-indigo-500" />}
            label="Sleep Hours"
            color="bg-indigo-100 text-indigo-700"
            max={24}
          />
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <TaskTracker
            tasks={entry.chores || []}
            previousTasks={allChoreNames}
            onChange={(tasks) => handleUpdateField('chores', tasks)}
            icon={<Home className="text-orange-500" />}
            label="Chores"
          />
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <TaskTracker
            tasks={entry.workTasks || []}
            previousTasks={allWorkTaskNames}
            onChange={(tasks) => handleUpdateField('workTasks', tasks)}
            icon={<Briefcase className="text-slate-500" />}
            label="Work Tasks"
          />
        </div>

        {/* Symptom Tracker */}
        <SymptomTracker 
          painLevel={entry.painLevel}
          energyLevel={entry.energyLevel}
          hasFever={entry.hasFever}
          hasCoughSneezing={entry.hasCoughSneezing}
          hasNausea={entry.hasNausea}
          otherSymptoms={entry.otherSymptoms}
          onChange={handleUpdateSymptom}
        />

        {/* Medication Tracker */}
        <MedicationTracker 
          medications={entry.medications}
          previousMedications={allMedicationNames}
          onChange={(medications) => handleUpdateField('medications', medications)}
        />
        
        {/* Custom Trackers for Premium Users */}
        {isPremium && (
          <CustomTrackers />
        )}
        
        <div className="tap-card">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted-foreground">Journal Notes</span>
            
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground hover:text-foreground transition-colors"
              >
                <Edit size={12} />
                <span>Edit</span>
              </button>
            )}
          </div>
          
          {isEditing ? (
            <>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full h-32 p-3 bg-secondary/50 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary resize-none text-sm"
                placeholder="Write your thoughts for the day..."
              />
              
              <div className="flex justify-end mt-3">
                <AnimatedButton onClick={handleSaveNotes} size="sm">
                  <Save size={14} className="mr-1" />
                  Save Notes
                </AnimatedButton>
              </div>
            </>
          ) : (
            <div className="bg-secondary/50 rounded-lg p-3 min-h-[80px] text-sm">
              {entry.notes ? (
                <p>{entry.notes}</p>
              ) : (
                <p className="text-muted-foreground italic">No notes for today. Tap edit to add some thoughts.</p>
              )}
            </div>
          )}
          
          {/* Premium Voice Journal and Journal Prompts */}
          {isPremium && (
            <div className="mt-4 space-y-4">
              <VoiceJournal />
              <JournalPrompts />
            </div>
          )}
        </div>
        
        <div className="pt-4 space-y-4">
          <Button 
            onClick={handleSaveEntry}
            className="w-full"
          >
            <Save size={16} className="mr-2" />
            Save Entry
          </Button>
          
          <AnimatedButton 
            onClick={handleViewJournal}
            variant="outline"
            className="w-full"
          >
            <BookOpen size={16} className="mr-2" />
            View Journal History
          </AnimatedButton>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
