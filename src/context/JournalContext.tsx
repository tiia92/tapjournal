
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

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
  exerciseNote?: string;
  selfCareActivities: string[];
  selfCareNote?: string;
  notes: string;
  audioNotes?: string; // For premium voice journaling
  images?: string[]; // For premium image journaling
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
  exerciseNote: '',
  selfCareActivities: [],
  selfCareNote: '',
  notes: '',
  // Default symptom values
  painLevel: 0,
  energyLevel: 0, // Changed from 5 to 0 as requested
  hasFever: false,
  hasCoughSneezing: false,
  hasNausea: false,
  otherSymptoms: '',
};

// Function to get today's date based on user's timezone
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

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export const JournalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [todayEntry, setTodayEntry] = useState<JournalEntry | undefined>();
  const { user } = useAuth();

  // Load entries from localStorage on mount or when user changes
  useEffect(() => {
    if (user) {
      const storageKey = `journalEntries_${user.id}`;
      const storedEntries = localStorage.getItem(storageKey);
      
      if (storedEntries) {
        const parsedEntries = JSON.parse(storedEntries);
        
        // Handle migration from old format to new format
        const migratedEntries = parsedEntries.map((entry: any) => {
          // If entry already has the new format, return it as is
          if (entry.chores && Array.isArray(entry.chores)) {
            return entry;
          }
          
          // Migrate from old boolean format to new array format
          return {
            ...entry,
            chores: entry.choresCompleted 
              ? [{ id: crypto.randomUUID(), name: "Default Chore", completed: true }] 
              : [],
            workTasks: entry.workGoalsCompleted 
              ? [{ id: crypto.randomUUID(), name: "Default Work Task", completed: true }] 
              : [],
          };
        });
        
        setEntries(migratedEntries);
        
        // Find today's entry
        const today = getTodayDateInUserTimezone();
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
    const today = getTodayDateInUserTimezone();
    return entries.some(entry => entry.date === today);
  };

  const createTodayEntry = (): JournalEntry => {
    const today = getTodayDateInUserTimezone();
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
    const today = getTodayDateInUserTimezone();
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
    const today = getTodayDateInUserTimezone();
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
