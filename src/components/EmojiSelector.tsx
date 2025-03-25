
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
  onNoteChange?: (note: string) => void;
  note?: string;
}

const EmojiSelector: React.FC<EmojiSelectorProps> = ({ 
  options, 
  selectedIds, 
  onChange, 
  label,
  multiSelect = true,
  onNoteChange,
  note = '' 
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
      setIsExpanded(false);
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
      </div>
      
      {selectedEmojis ? (
        <div onClick={() => setIsExpanded(!isExpanded)} className="flex flex-wrap gap-2 mb-3 min-h-12 items-center cursor-pointer">
          <div className="text-2xl">{selectedEmojis}</div>
        </div>
      ) : (
        <div 
          className="bg-muted/30 rounded-xl py-3 mb-3 text-center text-muted-foreground text-sm cursor-pointer"
          onClick={() => setIsExpanded(true)}
        >
          Tap to select
        </div>
      )}
      
      {onNoteChange !== undefined && (
        <div className="mb-3">
          <input
            type="text"
            value={note}
            onChange={(e) => onNoteChange(e.target.value.slice(0, 100))}
            placeholder="Add a note (100 characters max)"
            className="w-full p-2 rounded-md bg-secondary/50 border border-border text-sm"
            maxLength={100}
          />
          <div className="text-xs text-right text-muted-foreground mt-1">
            {note.length}/100
          </div>
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
          <div className="w-full text-center mt-2">
            <button 
              className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsExpanded(false)}
            >
              Tap to select
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiSelector;
