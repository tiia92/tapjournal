
import React from 'react';
import { ChevronLeft, ChevronRight, CalendarIcon } from 'lucide-react';
import { formatDateDisplay, getTodayDate } from '@/utils/trackerUtils';
import { utcToZonedTime } from 'date-fns-tz';

interface DateNavigationProps {
  currentDate: string;
  onDateChange: (date: string) => void;
}

const DateNavigation: React.FC<DateNavigationProps> = ({ currentDate, onDateChange }) => {
  const handlePreviousDay = () => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - 1);
    
    // Get user timezone
    const userTimezone = localStorage.getItem('userTimezone') || 'America/Los_Angeles';
    
    // Format using user's timezone
    const zonedDate = utcToZonedTime(date, userTimezone);
    const year = zonedDate.getFullYear();
    const month = String(zonedDate.getMonth() + 1).padStart(2, '0');
    const day = String(zonedDate.getDate()).padStart(2, '0');
    
    onDateChange(`${year}-${month}-${day}`);
  };

  const handleNextDay = () => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + 1);
    
    // Don't allow navigating to future dates
    const userTimezone = localStorage.getItem('userTimezone') || 'America/Los_Angeles';
    const now = new Date();
    const todayInTimezone = utcToZonedTime(now, userTimezone);
    todayInTimezone.setHours(0, 0, 0, 0);
    
    if (date <= todayInTimezone) {
      // Format using user's timezone
      const zonedDate = utcToZonedTime(date, userTimezone);
      const year = zonedDate.getFullYear();
      const month = String(zonedDate.getMonth() + 1).padStart(2, '0');
      const day = String(zonedDate.getDate()).padStart(2, '0');
      
      onDateChange(`${year}-${month}-${day}`);
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
