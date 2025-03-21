
import React from 'react';
import { Thermometer, BatteryMedium, Frown, Wind, HeartPulse } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

interface SymptomTrackerProps {
  painLevel: number;
  energyLevel: number;
  hasFever: boolean;
  hasCoughSneezing: boolean;
  hasNausea: boolean;
  otherSymptoms: string;
  onChange: (field: string, value: any) => void;
}

const SymptomTracker: React.FC<SymptomTrackerProps> = ({
  painLevel,
  energyLevel,
  hasFever,
  hasCoughSneezing,
  hasNausea,
  otherSymptoms,
  onChange,
}) => {
  const handleSliderChange = (field: string, value: number[]) => {
    onChange(field, value[0]);
  };

  return (
    <div className="tap-card space-y-5">
      <h3 className="text-lg font-medium mb-3">Symptom Tracker</h3>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <Frown className="text-orange-500" size={18} />
              Pain Level: {painLevel}/10
            </Label>
            <span className="text-sm font-medium">{painLevel}</span>
          </div>
          <Slider
            value={[painLevel]}
            min={0}
            max={10}
            step={1}
            onValueChange={(value) => handleSliderChange('painLevel', value)}
          />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <BatteryMedium className="text-green-500" size={18} />
              Energy Level: {energyLevel}/10
            </Label>
            <span className="text-sm font-medium">{energyLevel}</span>
          </div>
          <Slider
            value={[energyLevel]}
            min={0}
            max={10}
            step={1}
            onValueChange={(value) => handleSliderChange('energyLevel', value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="fever" 
              checked={hasFever}
              onCheckedChange={(checked) => onChange('hasFever', Boolean(checked))}
            />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="fever" className="flex items-center gap-1">
                <Thermometer className="text-red-500" size={14} />
                Fever
              </Label>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="coughSneezing" 
              checked={hasCoughSneezing}
              onCheckedChange={(checked) => onChange('hasCoughSneezing', Boolean(checked))}
            />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="coughSneezing" className="flex items-center gap-1">
                <Wind className="text-blue-500" size={14} />
                Cough/Sneezing
              </Label>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="nausea" 
              checked={hasNausea}
              onCheckedChange={(checked) => onChange('hasNausea', Boolean(checked))}
            />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="nausea" className="flex items-center gap-1">
                <HeartPulse className="text-purple-500" size={14} />
                Nausea
              </Label>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="other-symptoms">Other Symptoms</Label>
          <Textarea
            id="other-symptoms"
            placeholder="Describe any other symptoms you're experiencing..."
            value={otherSymptoms}
            onChange={(e) => onChange('otherSymptoms', e.target.value)}
            className="resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default SymptomTracker;
