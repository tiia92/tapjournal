
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  className,
  variant = 'default',
  size = 'md',
  ...props
}) => {
  const baseClasses = "relative overflow-hidden rounded-xl flex items-center justify-center transition-all duration-300 active:scale-95";
  
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "bg-transparent border border-primary text-primary hover:bg-primary/5",
    ghost: "bg-transparent hover:bg-primary/5 text-foreground",
    glass: "bg-white/20 backdrop-blur-lg border border-white/30 text-foreground shadow-glass hover:bg-white/30"
  };
  
  const sizeClasses = {
    sm: "text-sm px-3 py-1.5",
    md: "px-4 py-2",
    lg: "text-lg px-6 py-3"
  };
  
  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-white/10 transform scale-x-0 origin-left transition-transform group-hover:scale-x-100" />
    </button>
  );
};

export default AnimatedButton;
