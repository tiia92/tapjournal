
// Get today's date in YYYY-MM-DD format based on user's timezone
export const getTodayDate = (): string => {
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

// Mood options
export const moodOptions = [
  { id: 'happy', emoji: '😊', label: 'Happy' },
  { id: 'sad', emoji: '😢', label: 'Sad' },
  { id: 'angry', emoji: '😡', label: 'Angry' },
  { id: 'anxious', emoji: '😰', label: 'Anxious' },
  { id: 'tired', emoji: '😴', label: 'Tired' },
  { id: 'calm', emoji: '😌', label: 'Calm' },
  { id: 'sick', emoji: '🤒', label: 'Sick' },
  { id: 'energetic', emoji: '⚡', label: 'Energetic' }
];

// Exercise options
export const exerciseOptions = [
  { id: 'walking', emoji: '🚶', label: 'Walking' },
  { id: 'running', emoji: '🏃', label: 'Running' },
  { id: 'cycling', emoji: '🚴', label: 'Cycling' },
  { id: 'swimming', emoji: '🏊', label: 'Swimming' },
  { id: 'yoga', emoji: '🧘', label: 'Yoga' },
  { id: 'weights', emoji: '🏋️', label: 'Weights' },
  { id: 'sports', emoji: '⚽', label: 'Sports' },
  { id: 'dance', emoji: '💃', label: 'Dance' }
];

// Self-care options
export const selfCareOptions = [
  { id: 'meditation', emoji: '🧠', label: 'Meditation' },
  { id: 'reading', emoji: '📚', label: 'Reading' },
  { id: 'bath', emoji: '🛁', label: 'Bath/Spa' },
  { id: 'nature', emoji: '🌳', label: 'Nature' },
  { id: 'music', emoji: '🎵', label: 'Music' },
  { id: 'cooking', emoji: '🍳', label: 'Cooking' },
  { id: 'art', emoji: '🎨', label: 'Art/Craft' },
  { id: 'social', emoji: '👥', label: 'Social Time' }
];

// Function to format dates for display
export const formatDateForDisplay = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    timeZone: localStorage.getItem('userTimezone') || undefined
  }).format(date);
};

// Function to format time
export const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', { 
    hour: 'numeric', 
    minute: 'numeric',
    timeZone: localStorage.getItem('userTimezone') || undefined
  }).format(date);
};
