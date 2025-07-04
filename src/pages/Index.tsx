
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import DateNavigation from '@/components/DateNavigation';
import TapCounter from '@/components/TapCounter';
import TaskTracker from '@/components/TaskTracker';
import EmojiSelector from '@/components/EmojiSelector';
import AnimatedButton from '@/components/AnimatedButton';
import SymptomTracker from '@/components/SymptomTracker';
import MedicationTracker from '@/components/MedicationTracker';
import VoiceJournal from '@/components/premium/VoiceJournal';
import JournalPrompts from '@/components/premium/JournalPrompts';
import CustomTrackers from '@/components/premium/CustomTrackers';
import SmartGoalTracker from '@/components/premium/SmartGoalTracker';
import FileAttachment from '@/components/FileAttachment';
import { useJournal, JournalEntry } from '@/context/JournalContext';
import { getTodayDate, exerciseOptions, selfCareOptions, moodOptions } from '@/utils/trackerUtils';
import { Droplets, Moon, Home, Briefcase, Plus, Save, Edit, BookOpen } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const isPremium = user?.isPremium || false;
  
  const { 
    todayEntry, 
    createTodayEntry, 
    updateEntry, 
    addEntry,
    checkIfTodayEntryExists, 
    getEntryByDate,
    getAllMedicationNames,
    getAllChoreNames,
    getAllWorkTaskNames,
    getDeletedChoreNames,
    getDeletedWorkTaskNames,
    deleteChoreFromHistory,
    deleteWorkTaskFromHistory
  } = useJournal();
  
  const [currentDate, setCurrentDate] = useState(getTodayDate());
  const [entry, setEntry] = useState<JournalEntry | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState('');
  const [allMedicationNames, setAllMedicationNames] = useState<string[]>([]);
  const [allChoreNames, setAllChoreNames] = useState<string[]>([]);
  const [allWorkTaskNames, setAllWorkTaskNames] = useState<string[]>([]);
  const [deletedChoreNames, setDeletedChoreNames] = useState<string[]>([]);
  const [deletedWorkTaskNames, setDeletedWorkTaskNames] = useState<string[]>([]);
  
  const [moodNote, setMoodNote] = useState('');
  const [exercisesNote, setExercisesNote] = useState('');
  const [selfCareNote, setSelfCareNote] = useState('');
  const [waterNote, setWaterNote] = useState('');
  const [sleepNote, setSleepNote] = useState('');

  useEffect(() => {
    // Check if we're navigating from calendar with a selected date
    if (location.state?.selectedDate) {
      console.log('Navigating to selected date:', location.state.selectedDate);
      setCurrentDate(location.state.selectedDate);
      // Clear the state to prevent issues with browser back/forward
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  useEffect(() => {
    console.log('Loading entry for date:', currentDate);
    const existingEntry = getEntryByDate(currentDate);
    
    if (existingEntry) {
      console.log('Found existing entry:', existingEntry);
      setEntry(existingEntry);
      setNotes(existingEntry.notes);
      setMoodNote(existingEntry.moodNote || '');
      setExercisesNote(existingEntry.exercisesNote || '');
      setSelfCareNote(existingEntry.selfCareNote || '');
      setWaterNote(existingEntry.waterNote || '');
      setSleepNote(existingEntry.sleepNote || '');
    } else {
      console.log('No entry found for date:', currentDate);
      setEntry(null);
      setNotes('');
      setMoodNote('');
      setExercisesNote('');
      setSelfCareNote('');
      setWaterNote('');
      setSleepNote('');
    }
    
    setAllMedicationNames(getAllMedicationNames());
    setAllChoreNames(getAllChoreNames());
    setAllWorkTaskNames(getAllWorkTaskNames());
    setDeletedChoreNames(getDeletedChoreNames());
    setDeletedWorkTaskNames(getDeletedWorkTaskNames());
    
    setIsEditing(false);
  }, [currentDate, getEntryByDate, getAllMedicationNames, getAllChoreNames, getAllWorkTaskNames, getDeletedChoreNames, getDeletedWorkTaskNames]);
  
  const handleCreateEntry = () => {
    console.log('Creating entry for date:', currentDate);
    let newEntry: JournalEntry;
    
    if (currentDate === getTodayDate()) {
      newEntry = createTodayEntry();
      toast.success('Created new entry for today');
    } else {
      newEntry = {
        id: crypto.randomUUID(),
        date: currentDate,
        waterCount: 0,
        waterNote: '',
        sleepHours: 0,
        sleepNote: '',
        chores: [],
        workTasks: [],
        medications: [],
        mood: '',
        moodNote: '',
        exercises: [],
        exercisesNote: '',
        exerciseMinutes: 0,
        selfCareActivities: [],
        selfCareNote: '',
        selfCareMinutes: 0,
        notes: '',
        painLevel: 0,
        energyLevel: 0,
        hasFever: false,
        hasCoughSneezing: false,
        hasNausea: false,
        otherSymptoms: '',
      };
      
      addEntry(newEntry);
      toast.success(`Created new entry for ${currentDate}`);
    }
    
    console.log('New entry created:', newEntry);
    // Immediately set all the state to show the entry interface
    setEntry(newEntry);
    setNotes(newEntry.notes);
    setMoodNote(newEntry.moodNote || '');
    setExercisesNote(newEntry.exercisesNote || '');
    setSelfCareNote(newEntry.selfCareNote || '');
    setWaterNote(newEntry.waterNote || '');
    setSleepNote(newEntry.sleepNote || '');
    setIsEditing(true);
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
    toast.success('Journal notes saved');
  };
  
  const handleSaveAll = () => {
    if (!entry) return;
    
    const updatedEntry = {
      ...entry,
      notes,
      moodNote,
      exercisesNote,
      selfCareNote,
      waterNote,
      sleepNote
    };
    
    updateEntry(updatedEntry);
    toast.success('All changes saved successfully');
  };
  
  const handleViewJournal = () => {
    navigate('/journal');
  };
  
  const handleUpdateCategoryNote = (category: 'moodNote' | 'exercisesNote' | 'selfCareNote' | 'waterNote' | 'sleepNote', value: string) => {
    if (!entry) return;
    
    if (category === 'moodNote') {
      setMoodNote(value);
    } else if (category === 'exercisesNote') {
      setExercisesNote(value);
    } else if (category === 'selfCareNote') {
      setSelfCareNote(value);
    } else if (category === 'waterNote') {
      setWaterNote(value);
    } else if (category === 'sleepNote') {
      setSleepNote(value);
    }
    
    const updatedEntry = {
      ...entry,
      [category]: value,
    };
    
    setEntry(updatedEntry);
    updateEntry(updatedEntry);
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
          
          {currentDate !== getTodayDate() && (
            <button 
              onClick={() => setCurrentDate(getTodayDate())}
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
      
      <div className="mt-6 space-y-6 pb-20">
        <div className="space-y-4">
          <EmojiSelector
            options={moodOptions}
            selectedIds={entry.mood ? [entry.mood] : []}
            onChange={(ids) => handleUpdateField('mood', ids[0])}
            label="Today's Mood"
            multiSelect={false}
            onNoteChange={(note) => handleUpdateCategoryNote('moodNote', note)}
            note={moodNote}
            placeholder="Add a note about your mood..."
          />

          <EmojiSelector
            options={exerciseOptions}
            selectedIds={entry.exercises}
            onChange={(ids) => handleUpdateField('exercises', ids)}
            label="Exercise Activities"
            onNoteChange={(note) => handleUpdateCategoryNote('exercisesNote', note)}
            note={exercisesNote}
            placeholder="Add a note about your exercise..."
          />

          <EmojiSelector
            options={selfCareOptions}
            selectedIds={entry.selfCareActivities}
            onChange={(ids) => handleUpdateField('selfCareActivities', ids)}
            label="Self Care Activities"
            onNoteChange={(note) => handleUpdateCategoryNote('selfCareNote', note)}
            note={selfCareNote}
            placeholder="Add a note about your self care..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <TapCounter
            count={entry.waterCount}
            onChange={(count) => handleUpdateField('waterCount', count)}
            icon={<Droplets className="text-blue-500" />}
            label="Water Glasses"
            color="bg-blue-100 text-blue-700"
            onNoteChange={(note) => handleUpdateCategoryNote('waterNote', note)}
            note={waterNote}
          />
          
          <TapCounter
            count={entry.sleepHours}
            onChange={(count) => handleUpdateField('sleepHours', count)}
            icon={<Moon className="text-indigo-500" />}
            label="Sleep Hours"
            color="bg-indigo-100 text-indigo-700"
            max={24}
            onNoteChange={(note) => handleUpdateCategoryNote('sleepNote', note)}
            note={sleepNote}
          />
        </div>
        
        <SymptomTracker 
          painLevel={entry.painLevel}
          energyLevel={entry.energyLevel}
          hasFever={entry.hasFever}
          hasCoughSneezing={entry.hasCoughSneezing}
          hasNausea={entry.hasNausea}
          otherSymptoms={entry.otherSymptoms}
          onChange={handleUpdateSymptom}
        />

        <MedicationTracker 
          medications={entry.medications}
          previousMedications={allMedicationNames}
          onChange={(medications) => handleUpdateField('medications', medications)}
        />

        <div className="grid grid-cols-1 gap-4">
          <TaskTracker
            tasks={entry.chores || []}
            previousTasks={allChoreNames}
            deletedTasks={deletedChoreNames}
            onChange={(tasks) => handleUpdateField('chores', tasks)}
            onDeletePreviousTask={deleteChoreFromHistory}
            icon={<Home className="text-orange-500" />}
            label="Chores"
          />
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <TaskTracker
            tasks={entry.workTasks || []}
            previousTasks={allWorkTaskNames}
            deletedTasks={deletedWorkTaskNames}
            onChange={(tasks) => handleUpdateField('workTasks', tasks)}
            onDeletePreviousTask={deleteWorkTaskFromHistory}
            icon={<Briefcase className="text-slate-500" />}
            label="Work Tasks"
          />
        </div>
        
        {isPremium && (
          <SmartGoalTracker entryId={entry.id} />
        )}
        
        {isPremium && (
          <CustomTrackers entryId={entry.id} />
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
          
          {isPremium && (
            <div className="space-y-4 mt-4">
              <JournalPrompts inJournalPage={true} />
              <VoiceJournal 
                entryId={entry.id}
                audioUrl={entry.audioNotes}
                transcription={entry.audioTranscription}
              />
              <FileAttachment 
                entryId={entry.id} 
                attachments={entry.attachments} 
              />
            </div>
          )}
        </div>
        
        <div className="flex flex-col gap-4">
          <Button
            onClick={handleSaveAll}
            className="w-full flex items-center justify-center"
          >
            <Save size={18} className="mr-2" />
            Save All Changes
          </Button>
          
          <AnimatedButton 
            onClick={handleViewJournal}
            variant="outline"
            className="w-full"
          >
            <BookOpen size={16} className="mr-2" />
            View Insights
          </AnimatedButton>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
