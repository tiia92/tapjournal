
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { formatDateForTimezone } from '@/utils/trackerUtils';

// Task type
export type Task = {
  id: string;
  name: string;
  completed: boolean;
};

// Medication type
export type Medication = {
  id: string;
  name: string;
  taken: boolean;
};

// Entry types
export type JournalEntry = {
  id: string;
  date: string;
  waterCount: number;
  sleepHours: number;
  chores: Task[];
  workTasks: Task[];
  medications: Medication[];
  mood: string;
  moodNote?: string;
  exercises: string[];
  exercisesNote?: string;
  selfCareActivities: string[];
  selfCareNote?: string;
  notes: string;
  audioNotes?: string; // For premium voice journaling
  audioTranscription?: string; // For premium voice transcription
  images?: string[]; // For premium image journaling
  attachments?: string[]; // For file attachments
  customMetrics?: Record<string, any>; // For premium custom tracking
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
  addEntry: (entry: JournalEntry) => void;
  updateEntry: (entry: JournalEntry) => void;
  getEntryByDate: (date: string) => JournalEntry | undefined;
  checkIfTodayEntryExists: () => boolean;
  createTodayEntry: () => JournalEntry;
  getAllMedicationNames: () => string[];
  getAllChoreNames: () => string[];
  getAllWorkTaskNames: () => string[];
  saveAudioToEntry: (entryId: string, audioUrl: string, transcription?: string) => void;
  saveAttachmentToEntry: (entryId: string, fileUrl: string) => void;
};

const defaultEntry: Omit<JournalEntry, 'id' | 'date'> = {
  waterCount: 0,
  sleepHours: 0,
  chores: [],
  workTasks: [],
  medications: [],
  mood: '',
  moodNote: '',
  exercises: [],
  exercisesNote: '',
  selfCareActivities: [],
  selfCareNote: '',
  notes: '',
  audioNotes: '',
  audioTranscription: '',
  images: [],
  attachments: [],
  // Default symptom values
  painLevel: 0,
  energyLevel: 0, // Starting at 0 as requested
  hasFever: false,
  hasCoughSneezing: false,
  hasNausea: false,
  otherSymptoms: '',
};

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export const JournalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [todayEntry, setTodayEntry] = useState<JournalEntry | undefined>();
  const { user } = useAuth();

  // Get today's date in the user's timezone
  const getTodayInUserTimezone = (): string => {
    return formatDateForTimezone(new Date());
  };

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
            // Set energyLevel to 0 if it's 5 (the old default)
            energyLevel: entry.energyLevel === 5 ? 0 : entry.energyLevel,
            // Ensure chores and workTasks are arrays
            chores: Array.isArray(entry.chores) ? entry.chores : [],
            workTasks: Array.isArray(entry.workTasks) ? entry.workTasks : []
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
    }
  }, [user]);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    if (user && entries.length > 0) {
      const storageKey = `journalEntries_${user.id}`;
      localStorage.setItem(storageKey, JSON.stringify(entries));
    }
  }, [entries, user]);

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
    };

    setEntries(prev => [...prev, newEntry]);
    setTodayEntry(newEntry);
    return newEntry;
  };

  const addEntry = (entry: JournalEntry): void => {
    setEntries(prev => [...prev, entry]);
    
    // Update today's entry if the new entry is for today
    const today = getTodayInUserTimezone();
    if (entry.date === today) {
      setTodayEntry(entry);
    }
  };

  const updateEntry = (updatedEntry: JournalEntry): void => {
    setEntries(prev => 
      prev.map(entry => 
        entry.id === updatedEntry.id ? updatedEntry : entry
      )
    );
    
    // Update today's entry if needed
    const today = getTodayInUserTimezone();
    if (updatedEntry.date === today) {
      setTodayEntry(updatedEntry);
    }
  };

  const getEntryByDate = (date: string): JournalEntry | undefined => {
    return entries.find(entry => entry.date === date);
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

  return (
    <JournalContext.Provider
      value={{
        entries,
        todayEntry,
        addEntry,
        updateEntry,
        getEntryByDate,
        checkIfTodayEntryExists,
        createTodayEntry,
        getAllMedicationNames,
        getAllChoreNames,
        getAllWorkTaskNames,
        saveAudioToEntry,
        saveAttachmentToEntry
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
