
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import ThemeSelector from '@/components/premium/ThemeSelector';
import TimeZoneSelector from '@/components/TimeZoneSelector';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import CustomTrackers from '@/components/premium/CustomTrackers';
import { 
  ChartLine, 
  Palette, 
  Mic, 
  Camera, 
  Plus, 
  BookOpen, 
  Target 
} from 'lucide-react';

const Settings = () => {
  const { user, logout, upgradeAccount } = useAuth();
  const [selectedTheme, setSelectedTheme] = useState('default');
  const [currentTimezone, setCurrentTimezone] = useState('UTC');
  const isPremium = user?.isPremium || false;
  
  useEffect(() => {
    // Load timezone from localStorage if available
    const savedTimezone = localStorage.getItem('userTimezone');
    if (savedTimezone) {
      setCurrentTimezone(savedTimezone);
    }
  }, []);
  
  const handleUpgrade = () => {
    upgradeAccount();
    toast.success('You are now a premium user!');
  };
  
  const handleDowngrade = () => {
    // Since the actual method name is upgradeAccount, we'll toggle premium state in reverse
    upgradeAccount();
    toast.success('Your account has been downgraded to free.');
  };
  
  const handleTimezoneChange = (timezone: string) => {
    setCurrentTimezone(timezone);
    toast.success('Timezone updated successfully');
  };
  
  return (
    <Layout>
      <div className="mb-6">
        <h2 className="text-2xl font-medium mb-2">Settings</h2>
        <p className="text-muted-foreground">
          Customize your journal experience
        </p>
      </div>
      
      <div className="space-y-6">
        {/* Account Settings */}
        <div className="tap-card">
          <h3 className="text-lg font-medium mb-2">Account</h3>
          <p className="text-sm text-muted-foreground mb-4">Manage your account settings</p>
          
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg mb-4">
            <div>
              <p className="font-medium">{user?.name}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            <div className="bg-secondary px-3 py-1 rounded-full text-xs font-medium">
              {isPremium ? 'Premium' : 'Free'}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            {isPremium ? (
              <Button variant="outline" onClick={handleDowngrade} className="w-full">
                Downgrade to Free
              </Button>
            ) : (
              <Button onClick={handleUpgrade} className="w-full">
                Upgrade to Premium
              </Button>
            )}
          </div>
        </div>

        {/* Premium Features List (only show for free users) */}
        {!isPremium && (
          <div className="tap-card">
            <h3 className="text-lg font-medium mb-2">Premium Features</h3>
            <p className="text-sm text-muted-foreground mb-4">Upgrade to access these premium features</p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <ChartLine className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">Advanced Insights & Trends</h4>
                  <p className="text-sm text-muted-foreground">Detailed charts showing your patterns over time</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Palette className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">Customizable Themes</h4>
                  <p className="text-sm text-muted-foreground">Personalize the look and feel of your journal</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mic className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">Voice & Image Journaling</h4>
                  <p className="text-sm text-muted-foreground">Record voice notes or add images to entries</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Plus className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">Custom Tracking Metrics</h4>
                  <p className="text-sm text-muted-foreground">Create your own trackers for personalized tracking</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">Guided Wellness Programs</h4>
                  <p className="text-sm text-muted-foreground">Follow structured programs like "7-Day Sleep Reset"</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">Smart Goal Suggestions</h4>
                  <p className="text-sm text-muted-foreground">Get personalized recommendations based on your habits</p>
                </div>
              </div>
            </div>
            
            <Button onClick={handleUpgrade} className="w-full mt-6">
              Upgrade to Premium Now
            </Button>
          </div>
        )}
        
        {/* Timezone Settings */}
        <TimeZoneSelector 
          onChange={handleTimezoneChange}
          currentTimezone={currentTimezone}
        />
        
        {/* Theme Settings */}
        <ThemeSelector 
          selectedTheme={selectedTheme}
          onSelectTheme={setSelectedTheme}
        />
        
        {/* Custom Trackers - Only show this in Settings for non-premium users */}
        {!isPremium && <CustomTrackers inSettings={true} />}
        
        {/* Logout Button */}
        <div className="tap-card">
          <Button 
            variant="destructive" 
            onClick={logout}
            className="w-full"
          >
            Logout
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
