
import { format } from 'date-fns';

export const formatDateForTimezone = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Use the browser's timezone to get the correct date string
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

export const getTodayDate = (): string => {
  // Get current date in user's local timezone
  const now = new Date();
  return formatDateForTimezone(now);
};

// Format date for display (used in DateNavigation component)
export const formatDateDisplay = (date: string): string => {
  const dateObj = new Date(date);
  return format(dateObj, 'EEEE, MMMM d, yyyy');
};

// Format date for shorter display
export const formatDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  };
  return new Date(date).toLocaleDateString('en-US', options);
};

// Check if it's past 8 AM in the user's timezone
export const isPast8AM = (): boolean => {
  const now = new Date();
  return now.getHours() >= 8;
};

// Calculate program start date based on enrollment
export const calculateProgramDay = (startDate: string): number => {
  const start = new Date(startDate);
  const today = new Date();
  
  // Set both dates to midnight to compare just the dates
  start.setHours(0, 0, 0, 0);
  const todayAtMidnight = new Date(today);
  todayAtMidnight.setHours(0, 0, 0, 0);
  
  // Calculate difference in days
  const diffTime = todayAtMidnight.getTime() - start.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // Day count starts at 1
  return diffDays + 1;
};

// Determine if a specific program day is accessible
export const isDayAccessible = (startDate: string, day: number): boolean => {
  const currentDay = calculateProgramDay(startDate);
  const is8AMPassed = isPast8AM();
  
  // Current day is accessible if 8 AM has passed
  if (day === currentDay) return is8AMPassed;
  
  // Past days are always accessible
  if (day < currentDay) return true;
  
  // Future days are not accessible
  return false;
};

// Mood options (limited set for the basic "Today's Mood")
export const moodOptions = [
  { id: 'happy', emoji: '😊', label: 'Happy' },
  { id: 'good', emoji: '🙂', label: 'Good' },
  { id: 'neutral', emoji: '😐', label: 'Neutral' },
  { id: 'sad', emoji: '😔', label: 'Sad' },
  { id: 'angry', emoji: '😠', label: 'Angry' },
  { id: 'anxious', emoji: '😰', label: 'Anxious' },
  { id: 'tired', emoji: '😴', label: 'Tired' },
  { id: 'sick', emoji: '🤒', label: 'Sick' }
];

// Exercise options
export const exerciseOptions = [
  { id: 'walking', emoji: '🚶', label: 'Walking' },
  { id: 'running', emoji: '🏃', label: 'Running' },
  { id: 'cycling', emoji: '🚴', label: 'Cycling' },
  { id: 'swimming', emoji: '🏊', label: 'Swimming' },
  { id: 'yoga', emoji: '🧘', label: 'Yoga' },
  { id: 'gym', emoji: '🏋️', label: 'Gym' },
  { id: 'sports', emoji: '⚽', label: 'Sports' },
  { id: 'dancing', emoji: '💃', label: 'Dancing' },
  { id: 'hiking', emoji: '🥾', label: 'Hiking' },
  { id: 'stretch', emoji: '🤸', label: 'Stretching' }
];

// Self care options
export const selfCareOptions = [
  { id: 'reading', emoji: '📚', label: 'Reading' },
  { id: 'bath', emoji: '🛁', label: 'Bath' },
  { id: 'nap', emoji: '💤', label: 'Nap' },
  { id: 'skincare', emoji: '🧴', label: 'Skincare' },
  { id: 'meditation', emoji: '🧠', label: 'Meditation' },
  { id: 'outdoors', emoji: '🌳', label: 'Time Outdoors' },
  { id: 'craft', emoji: '🧶', label: 'Crafting' },
  { id: 'cooking', emoji: '🍳', label: 'Cooking' },
  { id: 'music', emoji: '🎵', label: 'Music' },
  { id: 'friend', emoji: '👋', label: 'Friend Time' }
];
