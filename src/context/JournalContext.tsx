import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { formatDateForTimezone } from '@/utils/trackerUtils';

// Task type
export type Priority = 'high' | 'medium' | 'low' | 'none';

export type Task = {
  id: string;
  name: string;
  completed: boolean;
  priority: Priority;
};

// Medication type
export type Medication = {
  id: string;
  name: string;
  taken: boolean;
};

// Goal type
export type Goal = {
  id: string;
  text: string;
  completed: boolean;
  dateAdded: string;
};

// Entry types
export type JournalEntry = {
  id: string;
  date: string;
  waterCount: number;
  waterNote?: string;
  sleepHours: number;
  sleepNote?: string;
  chores: Task[];
  workTasks: Task[];
  medications: Medication[];
  mood: string;
  moodNote?: string;
  exercises: string[];
  exercisesNote?: string;
  exerciseMinutes?: number;
  selfCareActivities: string[];
  selfCareNote?: string;
  selfCareMinutes?: number;
  notes: string;
  medicationNote?: string;
  audioNotes?: string; // For premium voice journaling
  audioTranscription?: string; // For premium voice transcription
  images?: string[]; // For premium image journaling
  attachments?: string[]; // For file attachments
  customMetrics?: Record<string, any>; // For premium custom tracking
  goals?: Goal[]; // For smart goals
  // Symptoms
  painLevel: number;
  energyLevel: number;
  hasFever: boolean;
  hasCoughSneezing: boolean;
  hasNausea: boolean;
  otherSymptoms: string;
};

type JournalContextType = {
  entries: JournalEntry[];
  todayEntry: JournalEntry | undefined;
  goals: Goal[];
  addEntry: (entry: JournalEntry) => void;
  updateEntry: (entry: JournalEntry) => void;
  getEntryByDate: (date: string) => JournalEntry | undefined;
  checkIfTodayEntryExists: () => boolean;
  createTodayEntry: () => JournalEntry;
  getAllMedicationNames: () => string[];
  getAllChoreNames: () => string[];
  getAllWorkTaskNames: () => string[];
  getDeletedChoreNames: () => string[];
  getDeletedWorkTaskNames: () => string[];
  deleteChoreFromHistory: (choreName: string) => void;
  deleteWorkTaskFromHistory: (taskName: string) => void;
  saveAudioToEntry: (entryId: string, audioUrl: string, transcription?: string) => void;
  saveAttachmentToEntry: (entryId: string, fileUrl: string) => void;
  removeAttachmentFromEntry: (entryId: string, fileUrl: string) => void;
  addGoal: (goalText: string) => void;
  removeGoal: (goalId: string) => void;
  toggleGoalCompletion: (goalId: string, completed: boolean) => void;
};

const defaultEntry: Omit<JournalEntry, 'id' | 'date'> = {
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
  medicationNote: '',
  audioNotes: '',
  audioTranscription: '',
  images: [],
  attachments: [],
  customMetrics: {},
  goals: [],
  // Default symptom values
  painLevel: 0,
  energyLevel: 0,
  hasFever: false,
  hasCoughSneezing: false,
  hasNausea: false,
  otherSymptoms: '',
};

// Smart goal suggestions
const genericGoalSuggestions: string[] = [
  "Drink at least 8 glasses of water daily",
  "Get 7-8 hours of sleep each night",
  "Take a 10-minute walk after lunch",
  "Practice meditation for 5 minutes daily",
  "Read for 15 minutes before bed",
  "Stretch for 5 minutes in the morning",
  "Take medication on schedule every day",
  "Practice deep breathing for 2 minutes when stressed",
  "Make time for one self-care activity daily",
  "Write down one thing you're grateful for each day",
  "Limit screen time one hour before bed",
  "Call or text a friend or family member",
  "Eat a fruit or vegetable with every meal",
  "Take a short break every 90 minutes of work",
  "Go outside for at least 15 minutes daily"
];

const getRandomGoalSuggestions = (count = 3) => {
  const shuffled = [...genericGoalSuggestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export const JournalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [todayEntry, setTodayEntry] = useState<JournalEntry | undefined>();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [deletedChores, setDeletedChores] = useState<string[]>([]);
  const [deletedWorkTasks, setDeletedWorkTasks] = useState<string[]>([]);
  const { user } = useAuth();

  // Get today's date in the user's timezone
  const getTodayInUserTimezone = (): string => {
    return formatDateForTimezone(new Date());
  };

  // Generate new goal suggestions daily
  useEffect(() => {
    if (user?.isPremium) {
      const lastGoalDate = localStorage.getItem(`lastGoalDate_${user.id}`);
      const today = getTodayInUserTimezone();
      
      if (lastGoalDate !== today) {
        // Generate new suggestions for a new day
        let storedGoals = localStorage.getItem(`goals_${user.id}`);
        let currentGoals: Goal[] = storedGoals ? JSON.parse(storedGoals) : [];
        
        // Only generate new goals if we have fewer than 3 active goals
        if (entries.length < 3 && currentGoals.filter(g => !g.completed).length < 3) {
          const newSuggestions = getRandomGoalSuggestions()
            .filter(text => !currentGoals.some(g => g.text === text))
            .map(text => ({
              id: crypto.randomUUID(),
              text,
              completed: false,
              dateAdded: today
            }));
          
          const updatedGoals = [...currentGoals, ...newSuggestions];
          setGoals(updatedGoals);
          localStorage.setItem(`goals_${user.id}`, JSON.stringify(updatedGoals));
          localStorage.setItem(`lastGoalDate_${user.id}`, today);
        }
      }
    }
  }, [user, entries.length]);

  // Load entries from localStorage on mount or when user changes
  useEffect(() => {
    if (user) {
      const storageKey = `journalEntries_${user.id}`;
      const storedEntries = localStorage.getItem(storageKey);
      
      if (storedEntries) {
        const parsedEntries = JSON.parse(storedEntries);
        
        // Handle migration from old format to new format
        const migratedEntries = parsedEntries.map((entry: any) => {
          // Add new fields if they don't exist
          return {
            ...entry,
            moodNote: entry.moodNote || '',
            exercisesNote: entry.exercisesNote || '',
            selfCareNote: entry.selfCareNote || '',
            audioNotes: entry.audioNotes || '',
            audioTranscription: entry.audioTranscription || '',
            attachments: entry.attachments || [],
            customMetrics: entry.customMetrics || {},
            goals: entry.goals || [],
            // Set energyLevel to 0 if it's 5 (the old default)
            energyLevel: entry.energyLevel === 5 ? 0 : entry.energyLevel,
            // Ensure chores and workTasks are arrays with priority field
            chores: Array.isArray(entry.chores) ? entry.chores.map((chore: any) => ({
              ...chore,
              priority: chore.priority || 'none'
            })) : [],
            workTasks: Array.isArray(entry.workTasks) ? entry.workTasks.map((task: any) => ({
              ...task,
              priority: task.priority || 'none'
            })) : []
          };
        });
        
        setEntries(migratedEntries);
        
        // Find today's entry
        const today = getTodayInUserTimezone();
        const todayEntryFromStorage = migratedEntries.find((entry: JournalEntry) => entry.date === today);
        
        if (todayEntryFromStorage) {
          setTodayEntry(todayEntryFromStorage);
        } else {
          setTodayEntry(undefined);
        }
      } else {
        // Reset entries if no stored entries for this user
        setEntries([]);
        setTodayEntry(undefined);
      }
      
      // Load goals
      const storedGoals = localStorage.getItem(`goals_${user.id}`);
      if (storedGoals) {
        setGoals(JSON.parse(storedGoals));
      } else {
        setGoals([]);
      }

      // Load deleted tasks
      const storedDeletedChores = localStorage.getItem(`deletedChores_${user.id}`);
      if (storedDeletedChores) {
        setDeletedChores(JSON.parse(storedDeletedChores));
      }

      const storedDeletedWorkTasks = localStorage.getItem(`deletedWorkTasks_${user.id}`);
      if (storedDeletedWorkTasks) {
        setDeletedWorkTasks(JSON.parse(storedDeletedWorkTasks));
      }
    }
  }, [user]);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    if (user && entries.length >= 0) { // Changed from > 0 to >= 0 to handle empty arrays
      const storageKey = `journalEntries_${user.id}`;
      localStorage.setItem(storageKey, JSON.stringify(entries));
    }
  }, [entries, user]);

  // Save goals to localStorage whenever they change
  useEffect(() => {
    if (user && goals.length > 0) {
      localStorage.setItem(`goals_${user.id}`, JSON.stringify(goals));
    }
  }, [goals, user]);

  // Save deleted tasks to localStorage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`deletedChores_${user.id}`, JSON.stringify(deletedChores));
      localStorage.setItem(`deletedWorkTasks_${user.id}`, JSON.stringify(deletedWorkTasks));
    }
  }, [deletedChores, deletedWorkTasks, user]);

  const checkIfTodayEntryExists = (): boolean => {
    const today = getTodayInUserTimezone();
    return entries.some(entry => entry.date === today);
  };

  const createTodayEntry = (): JournalEntry => {
    const today = getTodayInUserTimezone();
    const newEntry: JournalEntry = {
      ...defaultEntry,
      id: crypto.randomUUID(),
      date: today,
      goals: goals.filter(g => !g.completed).map(g => ({...g, completed: false}))
    };

    setEntries(prev => {
      const updated = [...prev, newEntry];
      console.log('Updated entries after creating today entry:', updated);
      return updated;
    });
    setTodayEntry(newEntry);
    return newEntry;
  };

  const addEntry = (entry: JournalEntry): void => {
    console.log('Adding entry:', entry);
    setEntries(prev => {
      const updated = [...prev, entry];
      console.log('Updated entries after adding:', updated);
      return updated;
    });
    
    // Update today's entry if the new entry is for today
    const today = getTodayInUserTimezone();
    if (entry.date === today) {
      setTodayEntry(entry);
    }
  };

  const updateEntry = (updatedEntry: JournalEntry): void => {
    console.log('Updating entry:', updatedEntry);
    setEntries(prev => {
      const updated = prev.map(entry => 
        entry.id === updatedEntry.id ? updatedEntry : entry
      );
      console.log('Updated entries after updating:', updated);
      return updated;
    });
    
    // Update today's entry if needed
    const today = getTodayInUserTimezone();
    if (updatedEntry.date === today) {
      setTodayEntry(updatedEntry);
    }
  };

  const getEntryByDate = (date: string): JournalEntry | undefined => {
    const found = entries.find(entry => entry.date === date);
    console.log(`Looking for entry with date ${date}, found:`, found);
    console.log('All entries:', entries);
    return found;
  };

  const getAllMedicationNames = (): string[] => {
    // Extract unique medication names from all entries
    const allMedNames = new Set<string>();
    
    entries.forEach(entry => {
      entry.medications?.forEach(med => {
        allMedNames.add(med.name);
      });
    });
    
    return Array.from(allMedNames);
  };

  const getAllChoreNames = (): string[] => {
    // Extract unique chore names from all entries
    const allChoreNames = new Set<string>();
    
    entries.forEach(entry => {
      entry.chores?.forEach(chore => {
        allChoreNames.add(chore.name);
      });
    });
    
    return Array.from(allChoreNames);
  };

  const getAllWorkTaskNames = (): string[] => {
    // Extract unique work task names from all entries
    const allWorkTaskNames = new Set<string>();
    
    entries.forEach(entry => {
      entry.workTasks?.forEach(task => {
        allWorkTaskNames.add(task.name);
      });
    });
    
    return Array.from(allWorkTaskNames);
  };

  const getDeletedChoreNames = (): string[] => {
    return deletedChores;
  };

  const getDeletedWorkTaskNames = (): string[] => {
    return deletedWorkTasks;
  };

  const deleteChoreFromHistory = (choreName: string): void => {
    if (!deletedChores.includes(choreName)) {
      setDeletedChores(prev => [...prev, choreName]);
    }
  };

  const deleteWorkTaskFromHistory = (taskName: string): void => {
    if (!deletedWorkTasks.includes(taskName)) {
      setDeletedWorkTasks(prev => [...prev, taskName]);
    }
  };

  const saveAudioToEntry = (entryId: string, audioUrl: string, transcription?: string): void => {
    setEntries(prev => 
      prev.map(entry => {
        if (entry.id === entryId) {
          return {
            ...entry,
            audioNotes: audioUrl,
            audioTranscription: transcription || entry.audioTranscription
          };
        }
        return entry;
      })
    );
    
    // Update today's entry if needed
    const entryToUpdate = entries.find(entry => entry.id === entryId);
    if (entryToUpdate && entryToUpdate.date === getTodayInUserTimezone()) {
      setTodayEntry({
        ...entryToUpdate,
        audioNotes: audioUrl,
        audioTranscription: transcription || entryToUpdate.audioTranscription
      });
    }
  };

  const saveAttachmentToEntry = (entryId: string, fileUrl: string): void => {
    setEntries(prev => 
      prev.map(entry => {
        if (entry.id === entryId) {
          return {
            ...entry,
            attachments: [...(entry.attachments || []), fileUrl]
          };
        }
        return entry;
      })
    );
    
    // Update today's entry if needed
    const entryToUpdate = entries.find(entry => entry.id === entryId);
    if (entryToUpdate && entryToUpdate.date === getTodayInUserTimezone()) {
      setTodayEntry({
        ...entryToUpdate,
        attachments: [...(entryToUpdate.attachments || []), fileUrl]
      });
    }
  };

  const removeAttachmentFromEntry = (entryId: string, fileUrl: string): void => {
    setEntries(prev => 
      prev.map(entry => {
        if (entry.id === entryId) {
          return {
            ...entry,
            attachments: (entry.attachments || []).filter(url => url !== fileUrl)
          };
        }
        return entry;
      })
    );
    
    // Update today's entry if needed
    const entryToUpdate = entries.find(entry => entry.id === entryId);
    if (entryToUpdate && entryToUpdate.date === getTodayInUserTimezone()) {
      setTodayEntry({
        ...entryToUpdate,
        attachments: (entryToUpdate.attachments || []).filter(url => url !== fileUrl)
      });
    }
  };

  const addGoal = (goalText: string): void => {
    const newGoal: Goal = {
      id: crypto.randomUUID(),
      text: goalText,
      completed: false,
      dateAdded: getTodayInUserTimezone()
    };
    
    setGoals(prev => [...prev, newGoal]);
    
    // Add to today's entry if it exists
    if (todayEntry) {
      const updatedGoals = [...(todayEntry.goals || []), newGoal];
      const updatedEntry = { ...todayEntry, goals: updatedGoals };
      updateEntry(updatedEntry);
    }
  };

  const removeGoal = (goalId: string): void => {
    setGoals(prev => prev.filter(goal => goal.id !== goalId));
    
    // Remove from today's entry if it exists
    if (todayEntry && todayEntry.goals) {
      const updatedGoals = todayEntry.goals.filter(goal => goal.id !== goalId);
      const updatedEntry = { ...todayEntry, goals: updatedGoals };
      updateEntry(updatedEntry);
    }
  };

  const toggleGoalCompletion = (goalId: string, completed: boolean): void => {
    // Update in goals list
    setGoals(prev => prev.map(goal => 
      goal.id === goalId ? { ...goal, completed } : goal
    ));
    
    // Update in today's entry if it exists
    if (todayEntry && todayEntry.goals) {
      const updatedGoals = todayEntry.goals.map(goal => 
        goal.id === goalId ? { ...goal, completed } : goal
      );
      const updatedEntry = { ...todayEntry, goals: updatedGoals };
      updateEntry(updatedEntry);
    }
  };

  return (
    <JournalContext.Provider
      value={{
        entries,
        todayEntry,
        goals,
        addEntry,
        updateEntry,
        getEntryByDate,
        checkIfTodayEntryExists,
        createTodayEntry,
        getAllMedicationNames,
        getAllChoreNames,
        getAllWorkTaskNames,
        getDeletedChoreNames,
        getDeletedWorkTaskNames,
        deleteChoreFromHistory,
        deleteWorkTaskFromHistory,
        saveAudioToEntry,
        saveAttachmentToEntry,
        removeAttachmentFromEntry,
        addGoal,
        removeGoal,
        toggleGoalCompletion
      }}
    >
      {children}
    </JournalContext.Provider>
  );
};

export const useJournal = (): JournalContextType => {
  const context = useContext(JournalContext);
  if (context === undefined) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
};
