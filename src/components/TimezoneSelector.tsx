
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

const timezones = [
  { value: 'Pacific/Honolulu', label: 'Hawaii (GMT-10:00)' },
  { value: 'America/Anchorage', label: 'Alaska (GMT-09:00)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (GMT-08:00/GMT-07:00)' },
  { value: 'America/Phoenix', label: 'Mountain Time - Arizona (GMT-07:00)' },
  { value: 'America/Denver', label: 'Mountain Time (GMT-07:00/GMT-06:00)' },
  { value: 'America/Chicago', label: 'Central Time (GMT-06:00/GMT-05:00)' },
  { value: 'America/New_York', label: 'Eastern Time (GMT-05:00/GMT-04:00)' },
  { value: 'America/Halifax', label: 'Atlantic Time (GMT-04:00/GMT-03:00)' },
  { value: 'America/St_Johns', label: 'Newfoundland Time (GMT-03:30/GMT-02:30)' },
  { value: 'America/Sao_Paulo', label: 'São Paulo, Brazil (GMT-03:00)' },
  { value: 'Europe/London', label: 'London, United Kingdom (GMT/GMT+01:00)' },
  { value: 'Europe/Paris', label: 'Paris, France (GMT+01:00/GMT+02:00)' },
  { value: 'Europe/Helsinki', label: 'Helsinki, Finland (GMT+02:00/GMT+03:00)' },
  { value: 'Asia/Dubai', label: 'Dubai, UAE (GMT+04:00)' },
  { value: 'Asia/Kolkata', label: 'Mumbai, India (GMT+05:30)' },
  { value: 'Asia/Shanghai', label: 'Beijing, China (GMT+08:00)' },
  { value: 'Asia/Tokyo', label: 'Tokyo, Japan (GMT+09:00)' },
  { value: 'Australia/Sydney', label: 'Sydney, Australia (GMT+10:00/GMT+11:00)' },
  { value: 'Pacific/Auckland', label: 'Auckland, New Zealand (GMT+12:00/GMT+13:00)' },
];

const TimezoneSelector: React.FC = () => {
  const [selectedTimezone, setSelectedTimezone] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    // Load the user's timezone preference from localStorage
    const savedTimezone = localStorage.getItem('userTimezone');
    if (savedTimezone) {
      setSelectedTimezone(savedTimezone);
    } else {
      // Default to the browser's timezone if not set
      const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setSelectedTimezone(browserTimezone);
      localStorage.setItem('userTimezone', browserTimezone);
    }
    
    // Update the current time
    updateCurrentTime();
    
    // Set interval to update the time every minute
    const interval = setInterval(updateCurrentTime, 60000);
    return () => clearInterval(interval);
  }, [selectedTimezone]);

  const updateCurrentTime = () => {
    try {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: selectedTimezone,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      setCurrentTime(formatter.format(new Date()));
    } catch (error) {
      setCurrentTime('Unable to determine current time');
    }
  };

  const handleTimezoneChange = (value: string) => {
    setSelectedTimezone(value);
    localStorage.setItem('userTimezone', value);
    updateCurrentTime();
    toast.success('Timezone updated successfully');
  };

  return (
    <div className="tap-card space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Clock className="h-5 w-5" />
        Time Zone Settings
      </h3>
      
      <div>
        <Label htmlFor="timezone-select" className="mb-2 block">
          Select Your Time Zone
        </Label>
        <Select value={selectedTimezone} onValueChange={handleTimezoneChange}>
          <SelectTrigger id="timezone-select" className="w-full">
            <SelectValue placeholder="Select a timezone" />
          </SelectTrigger>
          <SelectContent>
            {timezones.map((tz) => (
              <SelectItem key={tz.value} value={tz.value}>
                {tz.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="bg-muted/30 p-3 rounded-md">
        <div className="text-sm text-muted-foreground">Current time in your selected timezone:</div>
        <div className="font-medium mt-1">{currentTime}</div>
      </div>
    </div>
  );
};

export default TimezoneSelector;
