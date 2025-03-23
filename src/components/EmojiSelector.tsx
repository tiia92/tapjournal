
import React, { useState } from 'react';

interface EmojiOption {
  id: string;
  emoji: string;
  label: string;
}

interface EmojiSelectorProps {
  options: EmojiOption[];
  selectedIds: string[];
  onChange: (selectedIds: string[]) => void;
  label: string;
  multiSelect?: boolean;
  labelOnly?: boolean;
}

const EmojiSelector: React.FC<EmojiSelectorProps> = ({ 
  options, 
  selectedIds, 
  onChange, 
  label,
  multiSelect = true,
  labelOnly = false
}) => {
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  const toggleEmoji = (id: string) => {
    if (multiSelect) {
      const newSelectedIds = selectedIds.includes(id)
        ? selectedIds.filter(selectedId => selectedId !== id)
        : [...selectedIds, id];
      onChange(newSelectedIds);
    } else {
      onChange([id]);
    }
  };
  
  return (
    <div className="tap-card">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={toggleExpanded}
      >
        <span className="text-sm font-medium">{label}</span>
        {!labelOnly && (
          <span className="text-xs text-muted-foreground">
            {expanded ? 'Hide' : 'Select'}
          </span>
        )}
      </div>
      
      {!expanded && selectedIds.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedIds.map(id => {
            const option = options.find(opt => opt.id === id);
            return option ? (
              <div 
                key={option.id}
                className="flex items-center gap-1 px-2 py-1 rounded-full bg-secondary text-sm"
              >
                <span>{option.emoji}</span>
                <span>{option.label}</span>
              </div>
            ) : null;
          })}
        </div>
      )}
      
      {expanded && (
        <div className="mt-3 grid grid-cols-4 gap-2">
          {options.map(option => (
            <button
              key={option.id}
              onClick={() => toggleEmoji(option.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg ${
                selectedIds.includes(option.id) ? 'bg-primary/10 border border-primary' : 'bg-secondary hover:bg-secondary/90'
              }`}
              aria-pressed={selectedIds.includes(option.id)}
            >
              <span className="text-2xl" role="img" aria-label={option.label}>
                {option.emoji}
              </span>
              <span className="text-xs mt-1">{option.label}</span>
            </button>
          ))}
        </div>
      )}
      
      {!expanded && (
        <button 
          onClick={toggleExpanded}
          className="w-full mt-3 text-sm py-1.5 text-center rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
        >
          Tap to select
        </button>
      )}
    </div>
  );
};

export default EmojiSelector;
