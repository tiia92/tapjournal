
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import AnimatedButton from '@/components/AnimatedButton';
import { useJournal } from '@/context/JournalContext';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { Trash2, Download, Info, Bell, BellOff, Save, Crown } from 'lucide-react';
import PremiumUpgrade from '@/components/PremiumUpgrade';
import ThemeSelector from '@/components/premium/ThemeSelector';
import CustomTrackers from '@/components/premium/CustomTrackers';
import VoiceJournal from '@/components/premium/VoiceJournal';

const Settings = () => {
  const { entries } = useJournal();
  const { user } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    localStorage.getItem('notificationsEnabled') === 'true'
  );
  const [selectedTheme, setSelectedTheme] = useState(() => {
    return localStorage.getItem('selectedTheme') || 'default';
  });
  
  // Apply theme when it changes
  useEffect(() => {
    if (user?.isPremium) {
      localStorage.setItem('selectedTheme', selectedTheme);
      // In a real implementation, we would apply theme changes to the app here
      toast.success(`Theme applied: ${selectedTheme}`);
    }
  }, [selectedTheme, user?.isPremium]);
  
  const handleExportData = () => {
    try {
      const dataStr = JSON.stringify(entries, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `tapjournal-export-${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast.success('Data exported successfully');
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Failed to export data');
    }
  };
  
  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all your journal data? This action cannot be undone.')) {
      localStorage.removeItem('journalEntries');
      toast.success('All journal data has been cleared. Please refresh the page to see the changes.');
    }
  };
  
  const handleToggleNotifications = () => {
    const newState = !notificationsEnabled;
    setNotificationsEnabled(newState);
    localStorage.setItem('notificationsEnabled', String(newState));
    
    if (newState) {
      requestNotificationPermission();
      toast.success('Notifications enabled');
    } else {
      toast.success('Notifications disabled');
    }
  };
  
  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      
      if (permission !== 'granted') {
        toast.error('Permission for notifications was denied');
        setNotificationsEnabled(false);
        localStorage.setItem('notificationsEnabled', 'false');
      }
    } else {
      toast.error('This browser does not support notifications');
      setNotificationsEnabled(false);
      localStorage.setItem('notificationsEnabled', 'false');
    }
  };
  
  return (
    <Layout>
      <div className="mb-6">
        <h2 className="text-2xl font-medium mb-2">Settings</h2>
        <p className="text-muted-foreground">
          Manage your TapJournal preferences
        </p>
      </div>
      
      <div className="space-y-6">
        {/* Premium Upgrade */}
        {!user?.isPremium && (
          <div className="mb-6">
            <PremiumUpgrade />
          </div>
        )}

        {/* Premium Theme Selector */}
        {user?.isPremium && (
          <ThemeSelector 
            selectedTheme={selectedTheme}
            onSelectTheme={setSelectedTheme}
          />
        )}

        {/* Voice Journal for Premium Users */}
        <VoiceJournal />

        {/* Custom Trackers for Premium Users */}
        <CustomTrackers />

        {/* Account Info */}
        {user && (
          <div className="tap-card">
            <h3 className="text-lg font-medium mb-4">Account</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                <div>
                  <div className="font-medium">Account Type</div>
                  <div className="text-sm text-muted-foreground">
                    Your current subscription
                  </div>
                </div>
                
                <div className="flex items-center">
                  {user.isPremium ? (
                    <span className="flex items-center gap-1 text-sm bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-2 py-1 rounded-full">
                      <Crown size={14} />
                      Premium
                    </span>
                  ) : (
                    <span className="text-sm bg-secondary text-muted-foreground px-2 py-1 rounded-full">
                      Free
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notification settings */}
        <div className="tap-card">
          <h3 className="text-lg font-medium mb-4">Notifications</h3>
          
          <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg mb-4">
            <div>
              <div className="font-medium">Daily Reminders</div>
              <div className="text-sm text-muted-foreground">
                Get reminded to complete your wellness tracking
              </div>
            </div>
            
            <button
              onClick={handleToggleNotifications}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                notificationsEnabled ? 'bg-primary' : 'bg-muted'
              }`}
              aria-label={notificationsEnabled ? 'Disable notifications' : 'Enable notifications'}
            >
              <span 
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform transform ${
                  notificationsEnabled ? 'left-7' : 'left-1'
                }`} 
              />
            </button>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg text-sm">
            <Info size={18} className="text-muted-foreground shrink-0 mt-0.5" />
            <div>
              {notificationsEnabled 
                ? "You'll receive daily reminders for activities you missed the previous day."
                : "Enable notifications to get daily reminders about your wellness activities."}
            </div>
          </div>
        </div>
        
        {/* Data Management */}
        <div className="tap-card">
          <h3 className="text-lg font-medium mb-4">Data Management</h3>
          
          <div className="space-y-3">
            <AnimatedButton
              onClick={handleExportData}
              className="w-full justify-start"
              variant="outline"
              disabled={entries.length === 0}
            >
              <Download size={16} className="mr-2" />
              Export Journal Data
            </AnimatedButton>
            
            <AnimatedButton
              onClick={handleClearData}
              className="w-full justify-start text-destructive border-destructive hover:bg-destructive/5"
              variant="outline"
              disabled={entries.length === 0}
            >
              <Trash2 size={16} className="mr-2" />
              Clear All Journal Data
            </AnimatedButton>
          </div>
        </div>
        
        {/* About */}
        <div className="tap-card">
          <h3 className="text-lg font-medium mb-2">About TapJournal</h3>
          <p className="text-muted-foreground text-sm mb-3">
            Your personal wellness tracker and journal
          </p>
          
          <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg text-sm">
            <Info size={18} className="text-muted-foreground shrink-0 mt-0.5" />
            <div>
              TapJournal helps you track your daily wellness habits with a simple tap interface.
              Log your water intake, sleep, exercise, mood, and more to build healthy habits.
            </div>
          </div>
          
          <div className="text-center mt-6 text-sm text-muted-foreground">
            Version 1.0.0
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
