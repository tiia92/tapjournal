
import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface YesNoTapProps {
  value: boolean;
  onChange: (value: boolean) => void;
  icon: React.ReactNode;
  label: string;
}

const YesNoTap: React.FC<YesNoTapProps> = ({ value, onChange, icon, label }) => {
  return (
    <div className="tap-card flex flex-col items-center gap-3 animate-fade-in">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-muted/50 text-4xl">
        {icon}
      </div>
      
      <div className="flex items-center gap-2 mt-1">
        <button 
          onClick={() => onChange(true)}
          className={`tap-button flex items-center gap-1.5 py-2 px-3 ${
            value ? 'bg-green-100 text-green-700 border-green-200' : 'text-muted-foreground'
          }`}
          aria-label="Yes"
        >
          <CheckCircle size={16} />
          <span className="text-sm font-medium">Yes</span>
        </button>
        
        <button 
          onClick={() => onChange(false)}
          className={`tap-button flex items-center gap-1.5 py-2 px-3 ${
            value === false ? 'bg-red-100 text-red-700 border-red-200' : 'text-muted-foreground'
          }`}
          aria-label="No"
        >
          <XCircle size={16} />
          <span className="text-sm font-medium">No</span>
        </button>
      </div>
    </div>
  );
};

export default YesNoTap;
