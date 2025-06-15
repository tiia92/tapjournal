import { format } from 'date-fns';
import { toZonedTime, format as formatTZ } from 'date-fns-tz';

export const formatDateForTimezone = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Get user's timezone from localStorage or default to America/Los_Angeles
  const userTimezone = localStorage.getItem('userTimezone') || 'America/Los_Angeles';
  
  // Convert UTC date to user's timezone
  const zonedDate = toZonedTime(dateObj, userTimezone);
  
  // Format the date in YYYY-MM-DD
  const year = zonedDate.getFullYear();
  const month = String(zonedDate.getMonth() + 1).padStart(2, '0');
  const day = String(zonedDate.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

export const getTodayDate = (): string => {
  // Get current date in user's timezone
  const userTimezone = localStorage.getItem('userTimezone') || 'America/Los_Angeles';
  const now = new Date();
  const zonedDate = toZonedTime(now, userTimezone);
  
  return formatDateForTimezone(zonedDate);
};

// Format date for display (used in DateNavigation component)
export const formatDateDisplay = (date: string): string => {
  // Create a new date object from the date string
  // The date string is in YYYY-MM-DD format, which is interpreted as UTC
  // So we need to explicitly create a date in the correct timezone
  const dateObj = new Date(date + 'T00:00:00');
  const userTimezone = localStorage.getItem('userTimezone') || 'America/Los_Angeles';
  
  // Convert to the user's timezone
  const zonedDate = toZonedTime(dateObj, userTimezone);
  
  // Format with the correct day name, month, day, year
  return formatTZ(zonedDate, 'EEEE, MMMM d, yyyy', { timeZone: userTimezone });
};

// Format date for shorter display
export const formatDate = (date: string): string => {
  const userTimezone = localStorage.getItem('userTimezone') || 'America/Los_Angeles';
  const dateObj = new Date(date);
  const zonedDate = toZonedTime(dateObj, userTimezone);
  
  return formatTZ(zonedDate, 'EEE, MMM d', { timeZone: userTimezone });
};

// Check if it's past 8 AM in the user's timezone
export const isPast8AM = (): boolean => {
  const userTimezone = localStorage.getItem('userTimezone') || 'America/Los_Angeles';
  const now = new Date();
  const zonedDate = toZonedTime(now, userTimezone);
  return zonedDate.getHours() >= 8;
};

// Calculate program start date based on enrollment
export const calculateProgramDay = (startDate: string): number => {
  const start = new Date(startDate);
  const userTimezone = localStorage.getItem('userTimezone') || 'America/Los_Angeles';
  const now = new Date();
  const todayInTimezone = toZonedTime(now, userTimezone);
  
  // Set both dates to midnight to compare just the dates
  start.setHours(0, 0, 0, 0);
  const todayAtMidnight = new Date(todayInTimezone);
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

// Mood options (limited to 5 specific emojis for consistency with insights)
export const moodOptions = [
  { id: 'very-happy', emoji: '😁', label: 'Very Happy' },
  { id: 'happy', emoji: '😊', label: 'Happy' },
  { id: 'neutral', emoji: '😐', label: 'Neutral' },
  { id: 'sad', emoji: '☹️', label: 'Sad' },
  { id: 'angry', emoji: '😠', label: 'Angry' }
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
  { id: 'stretch', emoji: '🤸', label: 'Stretching' },
  { id: 'boxing', emoji: '🥊', label: 'Boxing' },
  { id: 'martial-arts', emoji: '🥋', label: 'Martial Arts' },
  { id: 'roller-skating', emoji: '🛼', label: 'Roller Skating' },
  { id: 'skateboarding', emoji: '🛹', label: 'Skateboarding' },
  { id: 'rock-climbing', emoji: '🧗‍♀️', label: 'Rock Climbing' },
  { id: 'skiing', emoji: '⛷️', label: 'Skiing' },
  { id: 'golf', emoji: '⛳', label: 'Golf' },
  { id: 'ice-skating', emoji: '⛸️', label: 'Ice Skating' },
  { id: 'tennis', emoji: '🎾', label: 'Tennis' },
  { id: 'hockey', emoji: '🏒', label: 'Hockey' },
  { id: 'bowling', emoji: '🎳', label: 'Bowling' },
  { id: 'basketball', emoji: '🏀', label: 'Basketball' },
  { id: 'volleyball', emoji: '🏐', label: 'Volleyball' },
  { id: 'football', emoji: '🏈', label: 'Football' },
  { id: 'baseball', emoji: '⚾', label: 'Baseball' }
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
  { id: 'friend', emoji: '👋', label: 'Friend Time' },
  { id: 'road-trip', emoji: '🛣️', label: 'Road Trip' },
  { id: 'plants', emoji: '🪴', label: 'Plant Care' },
  { id: 'apple', emoji: '🍎', label: 'Healthy Eating' },
  { id: 'vegetables', emoji: '🥦', label: 'Vegetables' },
  { id: 'phone-free', emoji: '📵', label: 'Phone Free Time' },
  { id: 'sunshine', emoji: '☀️', label: 'Sunshine' },
  { id: 'cleaning', emoji: '🧹', label: 'Cleaning' },
  { id: 'couch', emoji: '🛋️', label: 'Relax on Couch' },
  { id: 'bed', emoji: '🛏️', label: 'Rest in Bed' },
  { id: 'barber', emoji: '💈', label: 'Hair Care' },
  { id: 'tv', emoji: '📺', label: 'Watch TV' },
  { id: 'calendar', emoji: '📆', label: 'Planning' },
  { id: 'journal', emoji: '📓', label: 'Journaling' },
  { id: 'laptop', emoji: '💻', label: 'Computer Time' },
  { id: 'luggage', emoji: '🧳', label: 'Travel' },
  { id: 'stethoscope', emoji: '🩺', label: 'Health Check' },
  { id: 'musical-score', emoji: '🎼', label: 'Playing Music' },
  { id: 'teddy-bear', emoji: '🧸', label: 'Comfort Items' },
  { id: 'puzzle', emoji: '🧩', label: 'Puzzles' },
  { id: 'gaming', emoji: '🎮', label: 'Gaming' },
  { id: 'kiss', emoji: '💋', label: 'Romance' },
  { id: 'shopping', emoji: '🛒', label: 'Shopping' },
  { id: 'art', emoji: '🎨', label: 'Art' },
  { id: 'family', emoji: '👨‍👩', label: 'Family Time' },
  { id: 'nails', emoji: '💅', label: 'Nail Care' },
  { id: 'writing', emoji: '✍️', label: 'Writing' },
  { id: 'tools', emoji: '🪛', label: 'DIY Projects' },
  { id: 'massage', emoji: '💆‍♂️', label: 'Massage' },
  { id: 'pets', emoji: '🐾', label: 'Pet Care' },
  { id: 'prayer', emoji: '✝️', label: 'Prayer/Spiritual' },
  { id: 'tickets', emoji: '🎟️', label: 'Entertainment' }
];
