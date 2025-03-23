
import { format, parseISO, addDays, subDays } from 'date-fns';

export const formatDateDisplay = (dateString: string): string => {
  const date = parseISO(dateString);
  return format(date, 'EEEE, MMMM d, yyyy');
};

export const getYesterdayDate = (): string => {
  const yesterday = subDays(new Date(), 1);
  return formatDateForTimezone(yesterday);
};

export const getTomorrowDate = (): string => {
  const tomorrow = addDays(new Date(), 1);
  return formatDateForTimezone(tomorrow);
};

export const getTodayDate = (): string => {
  return formatDateForTimezone(new Date());
};

// Format date according to user's timezone
export const formatDateForTimezone = (date: Date): string => {
  const userTimezone = localStorage.getItem('userTimezone') || 
    Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  try {
    // Convert the date to the user's timezone
    const dateInUserTimezone = new Date(
      date.toLocaleString('en-US', { timeZone: userTimezone })
    );
    return format(dateInUserTimezone, 'yyyy-MM-dd');
  } catch (error) {
    console.error('Error with timezone conversion:', error);
    return format(date, 'yyyy-MM-dd');
  }
};

export const getLastNDays = (n: number): string[] => {
  const dates: string[] = [];
  const today = new Date();
  
  for (let i = 0; i < n; i++) {
    const date = subDays(today, i);
    dates.push(formatDateForTimezone(date));
  }
  
  return dates;
};

// Exercise options with emojis
export const exerciseOptions = [
  { id: 'walking', emoji: '🚶', label: 'Walking' },
  { id: 'running', emoji: '🏃', label: 'Running' },
  { id: 'swimming', emoji: '🏊', label: 'Swimming' },
  { id: 'cycling', emoji: '🚴', label: 'Cycling' },
  { id: 'yoga', emoji: '🧘', label: 'Yoga' },
  { id: 'weightlifting', emoji: '🏋️', label: 'Weightlifting' },
  { id: 'dancing', emoji: '💃', label: 'Dancing' },
  { id: 'hiking', emoji: '🥾', label: 'Hiking' },
  { id: 'tennis', emoji: '🎾', label: 'Tennis' },
  { id: 'basketball', emoji: '🏀', label: 'Basketball' },
  { id: 'soccer', emoji: '⚽', label: 'Soccer' },
  { id: 'climbing', emoji: '🧗', label: 'Climbing' }
];

// Self-care activity options with emojis
export const selfCareOptions = [
  { id: 'reading', emoji: '📚', label: 'Reading' },
  { id: 'meditation', emoji: '🧠', label: 'Meditation' },
  { id: 'bath', emoji: '🛁', label: 'Bath' },
  { id: 'music', emoji: '🎵', label: 'Music' },
  { id: 'art', emoji: '🎨', label: 'Art' },
  { id: 'writing', emoji: '✍️', label: 'Writing' },
  { id: 'nature', emoji: '🌳', label: 'Nature Walk' },
  { id: 'cooking', emoji: '👨‍🍳', label: 'Cooking' },
  { id: 'gardening', emoji: '🌱', label: 'Gardening' },
  { id: 'tv', emoji: '📺', label: 'TV/Movies' },
  { id: 'gaming', emoji: '🎮', label: 'Gaming' },
  { id: 'massage', emoji: '💆', label: 'Massage' }
];

// Mood options with emojis
export const moodOptions = [
  { id: 'amazing', emoji: '😁', label: 'Amazing' },
  { id: 'happy', emoji: '😊', label: 'Happy' },
  { id: 'good', emoji: '🙂', label: 'Good' },
  { id: 'meh', emoji: '😐', label: 'Meh' },
  { id: 'tired', emoji: '😴', label: 'Tired' },
  { id: 'sad', emoji: '😔', label: 'Sad' },
  { id: 'angry', emoji: '😠', label: 'Angry' },
  { id: 'anxious', emoji: '😰', label: 'Anxious' }
];

export const getStreakCount = (dates: string[]): number => {
  // Sort dates in descending order
  const sortedDates = [...dates].sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );
  
  if (sortedDates.length === 0) return 0;
  
  let streak = 1;
  let currentDate = parseISO(sortedDates[0]);
  
  for (let i = 1; i < sortedDates.length; i++) {
    const expectedDate = subDays(currentDate, 1);
    const nextDate = parseISO(sortedDates[i]);
    
    if (format(expectedDate, 'yyyy-MM-dd') === format(nextDate, 'yyyy-MM-dd')) {
      streak++;
      currentDate = nextDate;
    } else {
      break;
    }
  }
  
  return streak;
};
