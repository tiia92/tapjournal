
import React from 'react';
import { BookOpen } from 'lucide-react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = ({ size = 'small' }) => {
  // Size mappings
  const sizeClasses = {
    small: 'w-8 h-8 text-xl',
    medium: 'w-12 h-12 text-2xl',
    large: 'w-16 h-16 text-3xl'
  };
  
  return (
    <div className="flex items-center">
      <div className={`${sizeClasses[size]} mr-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md`}>
        <BookOpen className="w-2/3 h-2/3" />
      </div>
    </div>
  );
};

export default Logo;
