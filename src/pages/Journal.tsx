
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import AnimatedButton from '@/components/AnimatedButton';
import { useJournal, JournalEntry } from '@/context/JournalContext';
import { formatDateDisplay, getLastNDays, exerciseOptions, selfCareOptions, moodOptions } from '@/utils/trackerUtils';
import { ChevronDown, ChevronUp, Calendar, Edit, Droplets, Moon, Home, Briefcase, Carrot, Pill, Dumbbell, Smile, Heart } from 'lucide-react';

const Journal = () => {
  const navigate = useNavigate();
  const { entries } = useJournal();
  const [expandedEntryId, setExpandedEntryId] = useState<string | null>(null);
  
  // Sort entries by date (newest first)
  const sortedEntries = [...entries].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  const handleToggleExpand = (entryId: string) => {
    setExpandedEntryId(expandedEntryId === entryId ? null : entryId);
  };
  
  const handleEditEntry = (date: string) => {
    navigate('/', { state: { date } });
  };
  
  const getMoodEmoji = (moodId: string) => {
    const mood = moodOptions.find(m => m.id === moodId);
    return mood ? mood.emoji : '';
  };
  
  const getActivityNames = (activityIds: string[], options: typeof exerciseOptions) => {
    return activityIds
      .map(id => {
        const activity = options.find(opt => opt.id === id);
        return activity ? `${activity.emoji} ${activity.label}` : '';
      })
      .filter(Boolean)
      .join(', ');
  };
  
  return (
    <Layout>
      <div className="mb-6">
        <h2 className="text-2xl font-medium mb-2">Journal Entries</h2>
        <p className="text-muted-foreground">
          Review your wellness progress
        </p>
      </div>
      
      {sortedEntries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="bg-muted/50 p-8 rounded-xl mb-4">
            <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
            <h3 className="text-lg font-medium mb-1">No journal entries yet</h3>
            <p className="text-muted-foreground mb-4">
              Start tracking your daily wellness to build your journal
            </p>
            <AnimatedButton onClick={() => navigate('/')}>
              Create Your First Entry
            </AnimatedButton>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedEntries.map((entry) => (
            <div key={entry.id} className="tap-card overflow-hidden animate-fade-in">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => handleToggleExpand(entry.id)}
              >
                <div className="flex items-center">
                  <div className="mr-3 text-2xl">
                    {entry.mood ? getMoodEmoji(entry.mood) : '📝'}
                  </div>
                  <div>
                    <h3 className="font-medium">{formatDateDisplay(entry.date)}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <div className="flex items-center">
                        <Droplets size={14} className="text-blue-500 mr-1" />
                        {entry.waterCount}
                      </div>
                      <div className="flex items-center">
                        <Moon size={14} className="text-indigo-500 mr-1" />
                        {entry.sleepHours}h
                      </div>
                      <div className="flex items-center">
                        <Carrot size={14} className="text-green-500 mr-1" />
                        {entry.veggieCount}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditEntry(entry.date);
                    }}
                    className="mr-2 p-2 rounded-full hover:bg-muted/50 transition-colors"
                    aria-label="Edit entry"
                  >
                    <Edit size={16} className="text-muted-foreground" />
                  </button>
                  
                  {expandedEntryId === entry.id ? (
                    <ChevronUp size={20} className="text-muted-foreground" />
                  ) : (
                    <ChevronDown size={20} className="text-muted-foreground" />
                  )}
                </div>
              </div>
              
              {expandedEntryId === entry.id && (
                <div className="mt-4 pt-4 border-t border-border/50 animate-slide-down">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-secondary/30 p-3 rounded-lg text-sm">
                      <div className="flex items-center mb-1">
                        <Home size={16} className="text-orange-500 mr-2" />
                        <span className="text-muted-foreground">Chores:</span>
                      </div>
                      <span className="font-medium">{entry.choresCompleted ? 'Completed' : 'Not Completed'}</span>
                    </div>
                    
                    <div className="bg-secondary/30 p-3 rounded-lg text-sm">
                      <div className="flex items-center mb-1">
                        <Briefcase size={16} className="text-slate-500 mr-2" />
                        <span className="text-muted-foreground">Work Goals:</span>
                      </div>
                      <span className="font-medium">{entry.workGoalsCompleted ? 'Completed' : 'Not Completed'}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="bg-secondary/30 p-3 rounded-lg text-sm">
                      <div className="flex items-center mb-1">
                        <Dumbbell size={16} className="text-primary mr-2" />
                        <span className="text-muted-foreground">Exercise:</span>
                      </div>
                      <div>
                        {entry.exercises.length > 0 ? (
                          <span>{getActivityNames(entry.exercises, exerciseOptions)}</span>
                        ) : (
                          <span className="text-muted-foreground italic">None recorded</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-secondary/30 p-3 rounded-lg text-sm">
                      <div className="flex items-center mb-1">
                        <Heart size={16} className="text-pink-500 mr-2" />
                        <span className="text-muted-foreground">Self Care:</span>
                      </div>
                      <div>
                        {entry.selfCareActivities.length > 0 ? (
                          <span>{getActivityNames(entry.selfCareActivities, selfCareOptions)}</span>
                        ) : (
                          <span className="text-muted-foreground italic">None recorded</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {entry.notes && (
                    <div className="bg-secondary/30 p-3 rounded-lg text-sm mt-3">
                      <div className="flex items-center mb-1">
                        <span className="text-muted-foreground">Journal Notes:</span>
                      </div>
                      <p>{entry.notes}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Journal;
