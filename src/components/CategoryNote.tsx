
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface CategoryNoteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
}

const CategoryNote: React.FC<CategoryNoteProps> = ({ 
  value, 
  onChange, 
  placeholder = "Add a note (100 characters max)...",
  maxLength = 100 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= maxLength) {
      onChange(text);
    }
  };

  return (
    <div className="mt-2 space-y-1">
      <Textarea
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="resize-none text-sm min-h-[60px]"
      />
      <div className="text-xs text-right text-muted-foreground">
        {value.length}/{maxLength}
      </div>
    </div>
  );
};

export default CategoryNote;
