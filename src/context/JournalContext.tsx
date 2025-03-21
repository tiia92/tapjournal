
import React, { createContext, useContext, useState, useEffect } from 'react';

// Entry types
export type JournalEntry = {
  id: string;
  date: string;
  waterCount: number;
  sleepHours: number;
  choresCompleted: boolean;
  workGoalsCompleted: boolean;
  veggieCount: number;
  medicationCount: number;
  mood: string;
  exercises: string[];
  selfCareActivities: string[];
  notes: string;
};

type JournalContextType = {
  entries: JournalEntry[];
  todayEntry: JournalEntry | undefined;
  addEntry: (entry: JournalEntry) => void;
  updateEntry: (entry: JournalEntry) => void;
  getEntryByDate: (date: string) => JournalEntry | undefined;
  checkIfTodayEntryExists: () => boolean;
  createTodayEntry: () => JournalEntry;
};

const defaultEntry: Omit<JournalEntry, 'id' | 'date'> = {
  waterCount: 0,
  sleepHours: 0,
  choresCompleted: false,
  workGoalsCompleted: false,
  veggieCount: 0,
  medicationCount: 0,
  mood: '',
  exercises: [],
  selfCareActivities: [],
  notes: '',
};

const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export const JournalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [todayEntry, setTodayEntry] = useState<JournalEntry | undefined>();

  // Load entries from localStorage on mount
  useEffect(() => {
    const storedEntries = localStorage.getItem('journalEntries');
    if (storedEntries) {
      const parsedEntries = JSON.parse(storedEntries);
      setEntries(parsedEntries);
      
      // Find today's entry
      const today = formatDate(new Date());
      const todayEntryFromStorage = parsedEntries.find((entry: JournalEntry) => entry.date === today);
      
      if (todayEntryFromStorage) {
        setTodayEntry(todayEntryFromStorage);
      }
    }
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem('journalEntries', JSON.stringify(entries));
    }
  }, [entries]);

  const checkIfTodayEntryExists = (): boolean => {
    const today = formatDate(new Date());
    return entries.some(entry => entry.date === today);
  };

  const createTodayEntry = (): JournalEntry => {
    const today = formatDate(new Date());
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
    const today = formatDate(new Date());
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
    const today = formatDate(new Date());
    if (updatedEntry.date === today) {
      setTodayEntry(updatedEntry);
    }
  };

  const getEntryByDate = (date: string): JournalEntry | undefined => {
    return entries.find(entry => entry.date === date);
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
