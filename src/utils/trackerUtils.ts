
import { format } from 'date-fns';

export const formatDateForTimezone = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'yyyy-MM-dd');
};

export const getTodayDate = (): string => {
  return formatDateForTimezone(new Date());
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

export const formatDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  };
  return new Date(date).toLocaleDateString('en-US', options);
};
