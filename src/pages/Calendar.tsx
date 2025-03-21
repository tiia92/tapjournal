
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useJournal } from '@/context/JournalContext';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay, parseISO } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { moodOptions } from '@/utils/trackerUtils';

const Calendar = () => {
  const navigate = useNavigate();
  const { entries, createTodayEntry } = useJournal();
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const handlePreviousMonth = () => {
    const previousMonth = new Date(currentDate);
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    setCurrentDate(previousMonth);
  };
  
  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    
    // Don't allow navigating to future months beyond current month
    const today = new Date();
    if (nextMonth.getFullYear() < today.getFullYear() || 
       (nextMonth.getFullYear() === today.getFullYear() && nextMonth.getMonth() <= today.getMonth())) {
      setCurrentDate(nextMonth);
    }
  };
  
  const handleCreateTodayEntry = () => {
    createTodayEntry();
    navigate('/');
  };
  
  const handleDateClick = (date: Date) => {
    // Only allow clicking on dates up to today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date > today) return;
    
    const formattedDate = format(date, 'yyyy-MM-dd');
    navigate('/', { state: { date: formattedDate } });
  };
  
  // Get all days in current month
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Get the day of the week for the first day of the month (0 = Sunday)
  const startDay = monthStart.getDay();
  
  // Fill in empty spaces at the beginning for proper alignment
  const blanks = Array(startDay).fill(null);
  
  // Get entries for the current month
  const monthEntries = entries.filter(entry => {
    const entryDate = parseISO(entry.date);
    return isSameMonth(entryDate, currentDate);
  });
  
  // Check if an entry exists for a particular date
  const getEntryForDate = (date: Date) => {
    return entries.find(entry => {
      const entryDate = parseISO(entry.date);
      return isSameDay(entryDate, date);
    });
  };
  
  // Get mood emoji for a date
  const getMoodEmojiForDate = (date: Date) => {
    const entry = getEntryForDate(date);
    if (!entry || !entry.mood) return null;
    
    const mood = moodOptions.find(m => m.id === entry.mood);
    return mood ? mood.emoji : null;
  };
  
  // Function to generate the days of the week
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  return (
    <Layout>
      <div className="mb-6">
        <h2 className="text-2xl font-medium mb-2">Calendar View</h2>
        <p className="text-muted-foreground">
          View your wellness journey by month
        </p>
      </div>
      
      <div className="glass-panel p-4">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={handlePreviousMonth}
            className="tap-button w-9 h-9 rounded-full"
            aria-label="Previous month"
          >
            <ChevronLeft size={18} />
          </button>
          
          <h3 className="text-lg font-medium">
            {format(currentDate, 'MMMM yyyy')}
          </h3>
          
          <button 
            onClick={handleNextMonth}
            className={`tap-button w-9 h-9 rounded-full ${
              isSameMonth(currentDate, new Date()) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isSameMonth(currentDate, new Date())}
            aria-label="Next month"
          >
            <ChevronRight size={18} />
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-2">
          {daysOfWeek.map(day => (
            <div key={day} className="text-xs font-medium text-center text-muted-foreground py-1">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {blanks.map((_, index) => (
            <div key={`blank-${index}`} className="aspect-square"></div>
          ))}
          
          {daysInMonth.map(day => {
            const formattedDate = format(day, 'yyyy-MM-dd');
            const entry = getEntryForDate(day);
            const moodEmoji = getMoodEmojiForDate(day);
            const isFutureDate = day > new Date();
            
            return (
              <div 
                key={formattedDate}
                onClick={() => !isFutureDate && handleDateClick(day)}
                className={`
                  aspect-square flex flex-col items-center justify-center rounded-lg text-sm
                  transition-all cursor-pointer relative
                  ${isToday(day) ? 'bg-primary/10 font-medium' : entry ? 'bg-secondary/50 hover:bg-secondary' : 'hover:bg-secondary/30'}
                  ${isFutureDate ? 'opacity-30 cursor-not-allowed' : ''}
                `}
              >
                <span className={`${isToday(day) ? 'text-primary font-medium' : ''}`}>
                  {format(day, 'd')}
                </span>
                
                {moodEmoji && (
                  <span className="text-base mt-1">{moodEmoji}</span>
                )}
                
                {entry && !moodEmoji && (
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="mt-8">
        <div className="bg-secondary/50 rounded-xl p-4 text-center animate-fade-in">
          <h3 className="font-medium mb-2">Start Tracking Today</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Create a new entry to track your wellness journey
          </p>
          <button
            onClick={handleCreateTodayEntry}
            className="tap-button py-2 px-4 bg-primary text-primary-foreground inline-flex items-center"
          >
            <Plus size={16} className="mr-1" />
            New Entry
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Calendar;
