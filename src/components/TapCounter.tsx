
import React from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';

interface TapCounterProps {
  count: number;
  onChange: (count: number) => void;
  icon: React.ReactNode;
  label: string;
  color?: string;
  max?: number;
}

const TapCounter: React.FC<TapCounterProps> = ({ 
  count, 
  onChange, 
  icon, 
  label, 
  color = 'bg-primary/10 text-primary',
  max
}) => {
  const handleIncrement = () => {
    if (max !== undefined && count >= max) return;
    onChange(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      onChange(count - 1);
    }
  };

  return (
    <div className="tap-card flex flex-col items-center gap-3 animate-fade-in">
      <div className="flex items-center justify-between w-full">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <div className={`tap-count-bubble ${color}`}>{count}</div>
      </div>
      
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-muted/50 text-4xl">
        {icon}
      </div>
      
      <div className="flex items-center gap-4 mt-1">
        <button 
          onClick={handleDecrement}
          className="tap-button w-10 h-10 text-muted-foreground hover:text-foreground"
          disabled={count === 0}
          aria-label="Decrease count"
        >
          <MinusCircle size={20} />
        </button>
        
        <button 
          onClick={handleIncrement}
          className="tap-button w-10 h-10 text-accent hover:text-accent"
          disabled={max !== undefined && count >= max}
          aria-label="Increase count"
        >
          <PlusCircle size={20} />
        </button>
      </div>
    </div>
  );
};

export default TapCounter;
