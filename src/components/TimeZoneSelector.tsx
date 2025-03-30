
import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import { toast } from 'sonner';

interface TimeZoneSelectorProps {
  onChange: (timezone: string) => void;
  currentTimezone: string;
}

const TimeZoneSelector: React.FC<TimeZoneSelectorProps> = ({ onChange, currentTimezone }) => {
  const [selectedTimezone, setSelectedTimezone] = useState(currentTimezone);
  const [timezones, setTimezones] = useState<string[]>([]);

  useEffect(() => {
    // Get all available timezones
    try {
      // Try to detect user's timezone
      const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      
      const allTimezones = [
        detectedTimezone, // Put detected timezone first
        'America/Los_Angeles', // Pacific Time
        'America/Denver',      // Mountain Time
        'America/Chicago',     // Central Time
        'America/New_York',    // Eastern Time
        'America/Anchorage',   // Alaska Time
        'Pacific/Honolulu',    // Hawaii Time
        'Europe/London',
        'Europe/Paris',
        'Europe/Berlin',
        'Asia/Tokyo',
        'Asia/Shanghai',
        'Australia/Sydney',
        'UTC'
      ].filter((tz, index, self) => self.indexOf(tz) === index); // Remove duplicates
      
      setTimezones(allTimezones);
      
      // If no timezone is set yet, use detected timezone
      if (!currentTimezone) {
        setSelectedTimezone(detectedTimezone);
        onChange(detectedTimezone);
        localStorage.setItem('userTimezone', detectedTimezone);
      }
    } catch (error) {
      console.error('Error getting timezones:', error);
      // Fallback to a few common timezones
      setTimezones([
        'America/Los_Angeles', // Pacific Time
        'America/Denver',      // Mountain Time
        'America/Chicago',     // Central Time
        'America/New_York',    // Eastern Time
        'UTC'
      ]);
    }
  }, [currentTimezone, onChange]);

  const handleTimezoneChange = (value: string) => {
    setSelectedTimezone(value);
  };

  const handleSave = () => {
    onChange(selectedTimezone);
    localStorage.setItem('userTimezone', selectedTimezone);
    toast.success('Timezone updated');
  };

  return (
    <div className="border rounded-lg p-4 mb-4">
      <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
        <Clock size={18} />
        Time Zone Settings
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Choose your time zone to ensure journal entries are correctly dated.
      </p>
      
      <div className="space-y-4">
        <Select
          value={selectedTimezone}
          onValueChange={handleTimezoneChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your timezone" />
          </SelectTrigger>
          <SelectContent>
            {timezones.map((tz) => (
              <SelectItem key={tz} value={tz}>
                {tz.replace(/_/g, ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {selectedTimezone !== currentTimezone && (
          <div className="flex justify-end">
            <Button onClick={handleSave}>
              Save Time Zone
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeZoneSelector;
