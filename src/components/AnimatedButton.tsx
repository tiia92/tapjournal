
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
  const baseClasses = "relative overflow-hidden rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] font-medium";
  
  const variantClasses = {
    default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
    outline: "bg-transparent border border-primary text-primary hover:bg-primary/5 shadow-sm",
    ghost: "bg-transparent hover:bg-primary/5 text-foreground",
    glass: "bg-white/10 backdrop-blur-lg border border-white/20 text-foreground shadow-lg hover:bg-white/20"
  };
  
  const sizeClasses = {
    sm: "text-sm px-4 py-2 h-9",
    md: "px-6 py-2 h-11",
    lg: "text-lg px-8 py-3 h-12"
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
    </button>
  );
};

export default AnimatedButton;
