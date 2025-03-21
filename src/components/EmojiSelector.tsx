
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
}

const EmojiSelector: React.FC<EmojiSelectorProps> = ({ 
  options, 
  selectedIds, 
  onChange, 
  label,
  multiSelect = true 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleEmojiClick = (id: string) => {
    if (multiSelect) {
      if (selectedIds.includes(id)) {
        onChange(selectedIds.filter(selectedId => selectedId !== id));
      } else {
        onChange([...selectedIds, id]);
      }
    } else {
      onChange([id]);
    }
  };

  const selectedEmojis = options
    .filter(option => selectedIds.includes(option.id))
    .map(option => option.emoji)
    .join(' ');

  return (
    <div className="tap-card animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground hover:text-foreground transition-colors"
        >
          {isExpanded ? 'Hide' : 'Select'}
        </button>
      </div>
      
      {selectedEmojis ? (
        <div className="flex flex-wrap gap-2 mb-3 min-h-12 items-center">
          <div className="text-2xl">{selectedEmojis}</div>
        </div>
      ) : (
        <div className="bg-muted/30 rounded-xl py-3 mb-3 text-center text-muted-foreground text-sm">
          Tap to select
        </div>
      )}
      
      {isExpanded && (
        <div className="emoji-selector animate-scale-in mt-2">
          {options.map(option => (
            <button
              key={option.id}
              onClick={() => handleEmojiClick(option.id)}
              className={`emoji-item ${selectedIds.includes(option.id) ? 'selected' : ''}`}
              title={option.label}
              aria-label={option.label}
            >
              {option.emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmojiSelector;
