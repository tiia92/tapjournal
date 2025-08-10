
import React from 'react';
import { BookOpen } from 'lucide-react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = ({ size = 'small' }) => {
  // Size mappings
  const sizeClasses = {
    small: 'w-10 h-10 text-xl',
    medium: 'w-14 h-14 text-2xl',
    large: 'w-18 h-18 text-3xl'
  };
  
  return (
    <div className="flex items-center">
      <div className={`${sizeClasses[size]} rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/80 flex items-center justify-center text-white font-bold shadow-elegant transition-all duration-300 hover:shadow-floating hover:scale-105`}>
        <BookOpen className="w-3/5 h-3/5" strokeWidth={2.5} />
      </div>
    </div>
  );
};

export default Logo;
