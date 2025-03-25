
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ChevronDown } from 'lucide-react';

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

// Additional emoji options for premium users
const premiumEmojis: Record<string, EmojiOption[]> = {
  mood: [
    { id: 'ecstatic', emoji: '🤩', label: 'Ecstatic' },
    { id: 'loved', emoji: '🥰', label: 'Loved' },
    { id: 'proud', emoji: '😊', label: 'Proud' },
    { id: 'relaxed', emoji: '😌', label: 'Relaxed' },
    { id: 'thankful', emoji: '🙏', label: 'Thankful' },
    { id: 'peaceful', emoji: '😇', label: 'Peaceful' },
    { id: 'content', emoji: '🙂', label: 'Content' },
    { id: 'optimistic', emoji: '😃', label: 'Optimistic' },
    { id: 'excited', emoji: '😁', label: 'Excited' },
    { id: 'focused', emoji: '🧐', label: 'Focused' },
    { id: 'hopeful', emoji: '🤗', label: 'Hopeful' },
    { id: 'amused', emoji: '😄', label: 'Amused' },
    { id: 'curious', emoji: '🤔', label: 'Curious' },
    { id: 'bored', emoji: '😒', label: 'Bored' },
    { id: 'indifferent', emoji: '😐', label: 'Indifferent' },
    { id: 'anxious', emoji: '😰', label: 'Anxious' },
    { id: 'worried', emoji: '😟', label: 'Worried' },
    { id: 'stressed', emoji: '😫', label: 'Stressed' },
    { id: 'frustrated', emoji: '😤', label: 'Frustrated' },
    { id: 'annoyed', emoji: '😠', label: 'Annoyed' },
    { id: 'angry', emoji: '😡', label: 'Angry' },
    { id: 'sad', emoji: '😢', label: 'Sad' },
    { id: 'disappointed', emoji: '😞', label: 'Disappointed' },
    { id: 'heartbroken', emoji: '💔', label: 'Heartbroken' },
    { id: 'exhausted', emoji: '😩', label: 'Exhausted' },
    { id: 'overwhelmed', emoji: '🥴', label: 'Overwhelmed' },
    { id: 'jealous', emoji: '😒', label: 'Jealous' },
    { id: 'confused', emoji: '😕', label: 'Confused' },
  ],
  exercise: [
    { id: 'biking', emoji: '🚴‍♀️', label: 'Biking' },
    { id: 'crossfit', emoji: '🏋️‍♀️', label: 'Crossfit' },
    { id: 'dancing', emoji: '💃', label: 'Dancing' },
    { id: 'hiking', emoji: '🥾', label: 'Hiking' },
    { id: 'pilates', emoji: '🧘‍♀️', label: 'Pilates' },
    { id: 'rockclimbing', emoji: '🧗‍♀️', label: 'Rock Climbing' },
    { id: 'skating', emoji: '⛸️', label: 'Skating' },
    { id: 'skiing', emoji: '⛷️', label: 'Skiing' },
    { id: 'basketball', emoji: '🏀', label: 'Basketball' },
    { id: 'football', emoji: '🏈', label: 'Football' },
    { id: 'baseball', emoji: '⚾', label: 'Baseball' },
    { id: 'tennis', emoji: '🎾', label: 'Tennis' },
    { id: 'volleyball', emoji: '🏐', label: 'Volleyball' },
    { id: 'golf', emoji: '⛳', label: 'Golf' },
    { id: 'boxing', emoji: '🥊', label: 'Boxing' },
    { id: 'rowing', emoji: '🚣‍♀️', label: 'Rowing' },
    { id: 'karate', emoji: '🥋', label: 'Karate' },
    { id: 'surfing', emoji: '🏄‍♀️', label: 'Surfing' },
    { id: 'horseback', emoji: '🏇', label: 'Horseback Riding' },
    { id: 'swimming', emoji: '🏊‍♀️', label: 'Swimming' },
  ],
  selfCare: [
    { id: 'massage', emoji: '💆‍♀️', label: 'Massage' },
    { id: 'sauna', emoji: '🧖‍♀️', label: 'Sauna' },
    { id: 'facemask', emoji: '🧴', label: 'Face Mask' },
    { id: 'musictherapy', emoji: '🎵', label: 'Music Therapy' },
    { id: 'aromatherapy', emoji: '🕯️', label: 'Aromatherapy' },
    { id: 'shopping', emoji: '🛍️', label: 'Shopping' },
    { id: 'gardening', emoji: '🌱', label: 'Gardening' },
    { id: 'cooking', emoji: '👨‍🍳', label: 'Cooking' },
    { id: 'baking', emoji: '🧁', label: 'Baking' },
    { id: 'painting', emoji: '🎨', label: 'Painting' },
    { id: 'crafting', emoji: '✂️', label: 'Crafting' },
    { id: 'photography', emoji: '📷', label: 'Photography' },
    { id: 'beach', emoji: '🏖️', label: 'Beach Time' },
    { id: 'nature', emoji: '🌲', label: 'Nature Time' },
    { id: 'petsitting', emoji: '🐱', label: 'Pet Sitting' },
    { id: 'volunteering', emoji: '🤝', label: 'Volunteering' },
    { id: 'writing', emoji: '✏️', label: 'Writing' },
    { id: 'decluttering', emoji: '🧹', label: 'Decluttering' },
    { id: 'digitaldetox', emoji: '📵', label: 'Digital Detox' },
    { id: 'hobbytime', emoji: '🧩', label: 'Hobby Time' },
  ]
};

const EmojiSelector: React.FC<EmojiSelectorProps> = ({ 
  options, 
  selectedIds, 
  onChange, 
  label,
  multiSelect = true,
  onNoteChange,
  note = '' 
}) => {
  const { user } = useAuth();
  const isPremium = user?.isPremium || false;
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMoreEmojis, setShowMoreEmojis] = useState(false);

  // Determine which premium emoji set to use based on label
  const getPremiumEmojis = () => {
    if (label === "Today's Mood") return premiumEmojis.mood;
    if (label === "Exercise Activities") return premiumEmojis.exercise;
    if (label === "Self Care Activities") return premiumEmojis.selfCare;
    return [];
  };

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
          
          {isPremium && !showMoreEmojis && getPremiumEmojis().length > 0 && (
            <button
              onClick={() => setShowMoreEmojis(true)}
              className="w-full text-xs px-3 py-2 mt-2 rounded-md bg-secondary/80 text-primary hover:bg-secondary transition-colors"
            >
              <ChevronDown size={14} className="inline mr-1" /> See More Emojis
            </button>
          )}
          
          {isPremium && showMoreEmojis && getPremiumEmojis().map(option => (
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
              onClick={() => {
                setIsExpanded(false);
                setShowMoreEmojis(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiSelector;
