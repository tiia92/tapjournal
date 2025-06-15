
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

interface EmojiOption {
  id: string;
  emoji: string;
  label: string;
}

interface EmojiSelectorProps {
  options: EmojiOption[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  label: string;
  multiSelect?: boolean;
  onNoteChange?: (note: string) => void;
  note?: string;
  placeholder?: string;
  maxCharacters?: number;
}

// Full emoji categories for premium users
const emojiCategories = {
  smileys: ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😶‍🌫️', '😏', '😒', '🙄', '😬', '😮‍💨', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '😵‍💫', '🤯', '🤠', '🥳', '🥸', '😎', '🤓', '🧐', '😕', '😟', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '😈', '👿', '💀', '☠️'],
  gestures: ['👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '💪', '🦾', '🦿', '🦵', '🦶', '👂', '🦻', '👃', '👀', '👁️', '👅', '👄', '💋', '🩸'],
  activities: ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🪃', '🥅', '⛳', '🪁', '🏹', '🎣', '🤿', '🥊', '🥋', '🎽', '🛹', '🛼', '🛷', '⛸️', '🥌', '🎿', '⛷️', '🏂', '🪂', '🏋️', '🤼', '🤸', '⛹️', '🤺', '🤾', '🏌️', '🏇', '🧘', '🏄', '🏊', '🤽', '🚣', '🧗', '🚵', '🚴', '🏆', '🥇', '🥈', '🥉', '🏅', '🎖️', '🏵️', '🎗️', '🎫', '🎟️', '🎪', '🎭', '🎨', '🎬', '🎤', '🎧', '🎼', '🎹', '🪕', '🎸', '🎻', '🪘', '🥁', '🎲', '♟️', '🎯', '🎳', '🎮', '🎰', '🧩'],
  travel: ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🛻', '🚚', '🚛', '🚜', '🦯', '🦽', '🦼', '🛴', '🚲', '🛵', '🏍️', '🚨', '🚔', '🚍', '🚘', '🚖', '🚡', '🚠', '🚟', '🚃', '🚋', '🚞', '🚝', '🚄', '🚅', '🚈', '🚂', '🚆', '🚇', '🚊', '🚉', '✈️', '🛫', '🛬', '🛩️', '💺', '🛰️', '🚀', '🛸', '🛶', '⛵', '🛥️', '🚤', '⛴️', '🛳️', '🚢', '⚓', '⛽', '🚧', '🚏', '🚦', '🚥', '🗺️', '🗿', '🗽', '🗼', '🏰', '🏯', '🏟️', '🎡', '🎢', '🎠', '⛲', '⛱️', '🏖️', '🏝️', '🏜️', '🌋', '⛰️', '🏔️', '🗻', '🏕️', '⛺', '🏠', '🏡', '🏘️', '🏚️', '🏗️', '🏢', '🏭', '🏬', '🏣', '🏤', '🏥', '🏦', '🏨', '🏪', '🏫', '🏩', '💒', '🏛️', '⛪', '🕌', '🕍', '🛕', '🕋', '⛩️', '🛤️', '🛣️', '🗾', '🎑', '🏞️', '🌅', '🌄', '🌠', '🎇', '🎆', '🌇', '🌆', '🏙️', '🌃', '🌌', '🌉', '🌁'],
  objects: ['⌚', '📱', '📲', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '🕹️', '🗜️', '💽', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥', '📽️', '🎞️', '📞', '☎️', '📟', '📠', '📺', '📻', '🎙️', '🎚️', '🎛️', '🧭', '⏱️', '⏲️', '⏰', '🕰️', '⌛', '⏳', '📡', '🔋', '🔌', '💡', '🔦', '🕯️', '🪔', '🧯', '🛢️', '💸', '💵', '💴', '💶', '💷', '💰', '💳', '💎', '⚖️', '🧰', '🔧', '🔨', '⚒️', '🛠️', '⛏️', '🔩', '⚙️', '🧱', '⛓️', '🧲', '🔫', '💣', '🧨', '🪓', '🔪', '🗡️', '⚔️', '🛡️', '🚬', '⚰️', '⚱️', '🏺', '🔮', '📿', '🧿', '💈', '⚗️', '🔭', '🔬', '🕳️', '🩹', '🩺', '💊', '💉', '🩸', '🧬', '🦠', '🧫', '🧪', '🌡️', '🧹', '🧺', '🧻', '🚽', '🚰', '🚿', '🛁', '🛀', '🧼', '🪥', '🪒', '🧽', '🪣', '🧴', '🛎️', '🔑', '🗝️', '🚪', '🪑', '🛋️', '🛏️', '🛌', '🧸', '🪆', '🖼️', '🪞', '🪟', '🛍️', '🛒', '🎁', '🎈', '🎏', '🎀', '🪄', '🪅', '🎊', '🎉', '🎎', '🏮', '🎐', '🧧', '✉️', '📩', '📨', '📧', '💌', '📥', '📤', '📦', '🏷️', '📪', '📫', '📬', '📭', '📮', '📯', '📜', '📃', '📄', '📑', '🧾', '📊', '📈', '📉', '🗒️', '🗓️', '📆', '📅', '🗑️', '📇', '🗃️', '🗳️', '🗄️', '📋', '📁', '📂', '🗂️', '🗞️', '📰', '📓', '📔', '📒', '📕', '📗', '📘', '📙', '📚', '📖', '🔖', '🧷', '🔗', '📎', '🖇️', '📐', '📏', '🧮', '📌', '📍', '✂️', '🖊️', '🖋️', '✒️', '🖌️', '🖍️', '📝', '✏️', '🔍', '🔎', '🔏', '🔐', '🔒', '🔓'],
  symbols: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉️', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐', '⛎', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', '🆔', '⚛️', '🉑', '☢️', '☣️', '📴', '📳', '🈶', '🈚', '🈸', '🈺', '🈷️', '✴️', '🆚', '💮', '🉐', '㊙️', '㊗️', '🈴', '🈵', '🈹', '🈲', '🅰️', '🅱️', '🆎', '🆑', '🅾️', '🆘', '❌', '⭕', '🛑', '⛔', '📛', '🚫', '💯', '💢', '♨️', '🚷', '🚯', '🚳', '🚱', '🔞', '📵', '🚭', '❗', '❕', '❓', '❔', '‼️', '⁉️', '🔅', '🔆', '〽️', '⚠️', '🚸', '🔱', '⚜️', '🔰', '♻️', '✅', '🈯', '💹', '❇️', '✳️', '❎', '🌐', '💠', 'Ⓜ️', '🌀', '💤', '🏧', '🚾', '♿', '🅿️', '🛗', '🈳', '🈂️', '🛂', '🛃', '🛄', '🛅', '🚹', '🚺', '🚼', '⚧', '🚻', '🚮', '🎦', '📶', '🈁', '🔣', 'ℹ️', '🔤', '🔡', '🔠', '🆖', '🆗', '🆙', '🆒', '🆕', '🆓', '0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', '🔢', '#️⃣', '*️⃣', '⏏️', '▶️', '⏸️', '⏯️', '⏹️', '⏺️', '⏭️', '⏮️', '⏩', '⏪', '⏫', '⏬', '◀️', '🔼', '🔽', '➡️', '⬅️', '⬆️', '⬇️', '↗️', '↘️', '↙️', '↖️', '↕️', '↔️', '↪️', '↩️', '⤴️', '⤵️', '🔀', '🔁', '🔂', '🔄', '🔃', '🎵', '🎶', '➕', '➖', '➗', '✖️', '♾️', '💲', '💱', '™️', '©️', '®️', '〰️', '➰', '➿', '🔚', '🔙', '🔛', '🔝', '🔜', '✔️', '☑️', '🔘', '🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '⚫', '⚪', '🟤', '🔺', '🔻', '🔸', '🔹', '🔶', '🔷', '🔳', '🔲', '▪️', '▫️', '◾', '◽', '◼️', '◻️', '🟥', '🟧', '🟨', '🟩', '🟦', '🟪', '⬛', '⬜', '🟫', '🔈', '🔇', '🔉', '🔊', '🔔', '🔕', '📣', '📢', '💬', '💭', '🗯️', '♠️', '♣️', '♥️', '♦️', '🃏', '🎴', '🀄', '🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕛', '🕜', '🕝', '🕞', '🕟', '🕠', '🕡', '🕢', '🕣', '🕤', '🕥', '🕦', '🕧'],
  foods: ['🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶️', '🫑', '🌽', '🥕', '🫒', '🧄', '🧅', '🥔', '🍠', '🥐', '🥯', '🍞', '🥖', '🥨', '🧀', '🥚', '🍳', '🧈', '🥞', '🧇', '🥓', '🥩', '🍗', '🍖', '🦴', '🌭', '🍔', '🍟', '🍕', '🫓', '🥪', '🥙', '🧆', '🌮', '🌯', '🫔', '🥗', '🥘', '🫕', '🥫', '🍝', '🍜', '🍲', '🍛', '🍣', '🍱', '🥟', '🦪', '🍤', '🍙', '🍚', '🍘', '🍥', '🥠', '🥮', '🍢', '🍡', '🍧', '🍨', '🍦', '🥧', '🧁', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫', '🍿', '🍩', '🍪', '🌰', '🥜', '🫘', '🍯', '🥛', '🍼', '🫖', '☕', '🍵', '🧃', '🥤', '🧋', '🍶', '🍺', '🍻', '🥂', '🍷', '🥃', '🍸', '🍹', '🧉', '🍾', '🧊', '🥄', '🍴', '🍽️', '🥣', '🥡', '🥢', '🧂'],
  nature: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐻‍❄️', '🐨', '🐯', '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🪱', '🐛', '🦋', '🐌', '🐞', '🐜', '🪰', '🪲', '🪳', '🦗', '🕷️', '🕸️', '🦂', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🦣', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🦬', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏', '🐑', '🦙', '🐐', '🦌', '🐕', '🐩', '🦮', '🐕‍🦺', '🐈', '🐈‍⬛', '🪶', '🐓', '🦃', '🦤', '🦚', '🦜', '🦢', '🦩', '🕊️', '🐇', '🦝', '🦨', '🦡', '🦫', '🦦', '🦥', '🐁', '🐀', '🐿️', '🦔', '🐾', '🐉', '🐲', '🌵', '🎄', '🌲', '🌳', '🌴', '🪵', '🌱', '🌿', '☘️', '🍀', '🎍', '🪴', '🎋', '🍃', '🍂', '🍁', '🍄', '🐚', '🪨', '🌾', '💐', '🌷', '🌹', '🥀', '🪷', '🌺', '🌸', '🌼', '🌻', '🌞', '🌝', '🌛', '🌜', '🌚', '🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓', '🌔', '🌙', '🌎', '🌍', '🌏', '🪐', '💫', '⭐', '🌟', '✨', '⚡', '☄️', '💥', '🔥', '🌪️', '🌈', '☀️', '🌤️', '⛅', '🌥️', '☁️', '🌦️', '🌧️', '⛈️', '🌩️', '🌨️', '❄️', '☃️', '⛄', '🌬️', '💨', '💧', '💦', '☔', '☂️', '🌊', '🌫️']
};

const EmojiSelector: React.FC<EmojiSelectorProps> = ({
  options,
  selectedIds,
  onChange,
  label,
  multiSelect = true,
  onNoteChange,
  note = '',
  placeholder = 'Add a note...',
  maxCharacters = 100
}) => {
  const { user } = useAuth();
  const isPremium = user?.isPremium || false;
  const [isSelecting, setIsSelecting] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [showEmojiDialog, setShowEmojiDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof emojiCategories>('smileys');
  const [showNote, setShowNote] = useState(false);
  const [minutes, setMinutes] = useState<string>('');

  const handleToggleView = () => {
    setShowAll(!showAll);
  };

  const handleToggleEmoji = (id: string) => {
    if (multiSelect) {
      if (selectedIds.includes(id)) {
        onChange(selectedIds.filter(selectedId => selectedId !== id));
      } else {
        onChange([...selectedIds, id]);
      }
    } else {
      onChange([id]);
    }
    setIsSelecting(true);
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onNoteChange) {
      const value = e.target.value;
      if (value.length <= maxCharacters) {
        onNoteChange(value);
      }
    }
  };

  const handleSelectFullEmoji = (emoji: string) => {
    // Create a custom ID for this emoji
    const newId = `custom-${emoji}-${Date.now()}`;
    
    // For simplicity, we'll just add this emoji without proper tracking
    // In a real app, you'd want to register this custom emoji properly
    if (multiSelect) {
      onChange([...selectedIds, emoji]);
    } else {
      onChange([emoji]);
    }
    
    setShowEmojiDialog(false);
    setIsSelecting(true);
  };

  // Determine which emojis to show based on the current state
  const getEmojisToShow = () => {
    if (showAll) {
      // Show all available options
      return options;
    } else {
      // Show only selected emojis
      return options.filter(option => selectedIds.includes(option.id));
    }
  };

  const emojisToShow = getEmojisToShow();

  return (
    <div className="tap-card">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <div className="flex gap-2">
          {onNoteChange && (
            <button
              onClick={() => setShowNote(!showNote)}
              className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            >
              {showNote ? "Hide Note" : "Add Note"}
            </button>
          )}
          {label !== "Today's Mood" && (
            <button
              onClick={handleToggleView}
              className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            >
              {showAll ? "Less" : "More"}
            </button>
          )}
        </div>
      </div>

      {!isSelecting && selectedIds.length === 0 ? (
        <div 
          className="text-center p-4 bg-muted/30 rounded-lg mb-3 cursor-pointer"
          onClick={() => setIsSelecting(true)}
        >
          <p className="text-sm text-muted-foreground">Tap to select</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 mb-3">
          {isSelecting && emojisToShow.map(option => (
            <button
              key={option.id}
              onClick={() => handleToggleEmoji(option.id)}
              className={`relative text-2xl p-2 rounded-lg hover:bg-muted/50 transition-colors ${
                selectedIds.includes(option.id) ? 'bg-primary/10 border border-primary' : 'bg-muted/30'
              }`}
              title={option.label}
            >
              {option.emoji}
              {selectedIds.includes(option.id) && (
                <span className="absolute -top-1 -right-1 bg-primary text-[10px] text-primary-foreground w-5 h-5 flex items-center justify-center rounded-full">
                  ✓
                </span>
              )}
            </button>
          ))}
          
          {isPremium && isSelecting && showAll && label !== "Today's Mood" && (
            <button 
              onClick={() => setShowEmojiDialog(true)}
              className="text-2xl p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              title="More emojis"
            >
              +
            </button>
          )}
        </div>
      )}

      {/* Show selected emojis if any and not in selecting mode */}
      {!isSelecting && selectedIds.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {selectedIds.map((id, index) => {
            const option = options.find(opt => opt.id === id);
            return (
              <div
                key={index}
                className="relative text-2xl p-2 rounded-lg bg-primary/10 border border-primary"
                onClick={() => setIsSelecting(true)}
              >
                {option?.emoji || id}
              </div>
            );
          })}
          <button 
            onClick={() => setIsSelecting(true)}
            className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            Change
          </button>
        </div>
      )}

      {/* Minutes input for Exercise or Self Care */}
      {(label === "Exercise Activities" || label === "Self Care Activities") && selectedIds.length > 0 && (
        <div className="mt-2 mb-3">
          <label htmlFor={`${label.toLowerCase().replace(/\s+/g, '-')}-minutes`} className="block text-sm text-muted-foreground mb-1">
            Minutes of {label === "Exercise Activities" ? "exercise" : "self-care"} today:
          </label>
          <input
            id={`${label.toLowerCase().replace(/\s+/g, '-')}-minutes`}
            type="number"
            min="0"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            className="w-full p-2 text-sm bg-muted/30 rounded-md focus:ring-1 focus:ring-primary focus:outline-none"
            placeholder="Enter minutes"
          />
        </div>
      )}

      {/* Notes section */}
      {(showNote || (selectedIds.length > 0 && note)) && onNoteChange && (
        <div className="mt-2">
          <Textarea
            value={note}
            onChange={handleNoteChange}
            placeholder={placeholder}
            className="w-full p-2 text-sm bg-muted/30 rounded-md resize-none h-20 focus:ring-1 focus:ring-primary focus:outline-none"
            maxLength={maxCharacters}
          />
          <div className="text-xs text-right text-muted-foreground mt-1">
            {note.length}/{maxCharacters}
          </div>
        </div>
      )}

      {/* Full Emoji Dialog */}
      {isPrem um && label !== "Today's Mood" && (
        <Dialog open={showEmojiDialog} onOpenChange={setShowEmojiDialog}>
          <DialogContent className="max-w-md">
            <DialogTitle>Select an Emoji</DialogTitle>
            
            <div className="flex gap-2 overflow-x-auto pb-2 mb-2">
              {(Object.keys(emojiCategories) as Array<keyof typeof emojiCategories>).map(category => (
                <Button 
                  key={category}
                  variant={category === selectedCategory ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
            
            <div className="grid grid-cols-8 gap-2 max-h-[300px] overflow-y-auto">
              {emojiCategories[selectedCategory].map((emoji, index) => (
                <button
                  key={index}
                  className="text-2xl p-2 hover:bg-muted rounded-md"
                  onClick={() => handleSelectFullEmoji(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default EmojiSelector;
