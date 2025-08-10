
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface TapCounterProps {
  count: number;
  onChange: (count: number) => void;
  label: string;
  icon: React.ReactNode;
  color?: string;
  max?: number;
  onNoteChange?: (note: string) => void;
  note?: string;
}

const TapCounter: React.FC<TapCounterProps> = ({
  count,
  onChange,
  label,
  icon,
  color = 'bg-blue-100 text-blue-700',
  max = 20,
  onNoteChange,
  note = ''
}) => {
  const [showNote, setShowNote] = useState(false);
  
  const increment = () => {
    if (count < max) {
      onChange(count + 1);
    }
  };
  
  const decrement = () => {
    if (count > 0) {
      onChange(count - 1);
    }
  };
  
  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onNoteChange) {
      const value = e.target.value;
      if (value.length <= 100) {
        onNoteChange(value);
      }
    }
  };
  
  return (
    <div className="tap-card">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          {icon}
          {label}
        </span>
        {onNoteChange && (
          <button
            onClick={() => setShowNote(!showNote)}
            className="text-xs px-3 py-2 rounded-full bg-secondary text-muted-foreground hover:text-foreground transition-colors min-h-[36px]"
          >
            {showNote ? "Hide Note" : "Add Note"}
          </button>
        )}
      </div>
      
      <div className="flex items-center justify-between">
        <button 
          onClick={decrement}
          className="w-12 h-12 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-secondary/50 hover:bg-secondary text-foreground transition-colors disabled:opacity-50"
          disabled={count === 0}
          aria-label="Decrease count"
        >
          <Minus size={18} />
        </button>
        
        <div className={`${color} rounded-full w-16 h-16 md:w-14 md:h-14 flex items-center justify-center text-xl font-semibold`}>
          {count}
        </div>
        
        <button 
          onClick={increment}
          className="w-12 h-12 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-secondary/50 hover:bg-secondary text-foreground transition-colors disabled:opacity-50"
          disabled={count === max}
          aria-label="Increase count"
        >
          <Plus size={18} />
        </button>
      </div>
      
      {(showNote || note) && onNoteChange && (
        <div className="mt-3">
          <Textarea
            value={note}
            onChange={handleNoteChange}
            placeholder={`Add a note about your ${label.toLowerCase()}...`}
            className="w-full p-3 text-sm bg-muted/30 rounded-md resize-none h-20 focus:ring-1 focus:ring-primary focus:outline-none"
            maxLength={100}
          />
          <div className="text-xs text-right text-muted-foreground mt-1">
            {note?.length || 0}/100
          </div>
        </div>
      )}
    </div>
  );
};

export default TapCounter;
