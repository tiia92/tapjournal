
import React from 'react';
import { ChevronLeft, ChevronRight, CalendarIcon } from 'lucide-react';
import { formatDateDisplay, getTodayDate } from '@/utils/trackerUtils';

interface DateNavigationProps {
  currentDate: string;
  onDateChange: (date: string) => void;
}

const DateNavigation: React.FC<DateNavigationProps> = ({ currentDate, onDateChange }) => {
  const handlePreviousDay = () => {
    // Parse the current date string (YYYY-MM-DD format)
    const [year, month, day] = currentDate.split('-').map(Number);
    
    // Create a date object in local time
    const date = new Date(year, month - 1, day); // month is 0-indexed
    
    // Subtract one day
    date.setDate(date.getDate() - 1);
    
    // Format back to YYYY-MM-DD
    const newYear = date.getFullYear();
    const newMonth = String(date.getMonth() + 1).padStart(2, '0');
    const newDay = String(date.getDate()).padStart(2, '0');
    
    onDateChange(`${newYear}-${newMonth}-${newDay}`);
  };

  const handleNextDay = () => {
    // Parse the current date string (YYYY-MM-DD format)
    const [year, month, day] = currentDate.split('-').map(Number);
    
    // Create a date object in local time
    const date = new Date(year, month - 1, day); // month is 0-indexed
    
    // Add one day
    date.setDate(date.getDate() + 1);
    
    // Don't allow navigating to future dates
    const today = getTodayDate();
    const newYear = date.getFullYear();
    const newMonth = String(date.getMonth() + 1).padStart(2, '0');
    const newDay = String(date.getDate()).padStart(2, '0');
    const newDateString = `${newYear}-${newMonth}-${newDay}`;
    
    // Only update if the new date is not in the future
    if (newDateString <= today) {
      onDateChange(newDateString);
    }
  };

  const isToday = () => {
    const today = getTodayDate();
    return currentDate === today;
  };

  const handleToday = () => {
    const today = getTodayDate();
    onDateChange(today);
  };

  return (
    <div className="flex items-center justify-between w-full p-4 glass-panel">
      <button
        onClick={handlePreviousDay}
        className="tap-button w-10 h-10 rounded-full"
        aria-label="Previous day"
      >
        <ChevronLeft size={20} />
      </button>
      
      <div className="flex flex-col items-center">
        <div className="text-lg font-medium">{formatDateDisplay(currentDate)}</div>
        {!isToday() && (
          <button
            onClick={handleToday}
            className="flex items-center gap-1 text-xs text-primary mt-1"
          >
            <CalendarIcon size={12} />
            <span>Go to Today</span>
          </button>
        )}
      </div>
      
      <button
        onClick={handleNextDay}
        className={`tap-button w-10 h-10 rounded-full ${isToday() ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isToday()}
        aria-label="Next day"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default DateNavigation;
