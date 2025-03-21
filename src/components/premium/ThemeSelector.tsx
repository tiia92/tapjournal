
import React from 'react';
import { Check } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface ThemeOption {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
}

const themes: ThemeOption[] = [
  { id: 'default', name: 'Default', primaryColor: 'hsl(222.1, 83.2%, 9.8%)', secondaryColor: 'hsl(210, 40%, 96.1%)' },
  { id: 'purple', name: 'Purple', primaryColor: '#8B5CF6', secondaryColor: '#E5DEFF' },
  { id: 'blue', name: 'Ocean', primaryColor: '#0EA5E9', secondaryColor: '#D3E4FD' },
  { id: 'green', name: 'Forest', primaryColor: '#10B981', secondaryColor: '#F2FCE2' },
  { id: 'orange', name: 'Sunset', primaryColor: '#F97316', secondaryColor: '#FEC6A1' },
  { id: 'pink', name: 'Blossom', primaryColor: '#D946EF', secondaryColor: '#FFDEE2' },
];

interface ThemeSelectorProps {
  selectedTheme: string;
  onSelectTheme: (themeId: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ selectedTheme, onSelectTheme }) => {
  const { user } = useAuth();
  const isPremium = user?.isPremium || false;

  if (!isPremium) {
    return (
      <div className="tap-card">
        <h3 className="text-lg font-medium mb-2">Theme</h3>
        <p className="text-sm text-muted-foreground mb-4">Default theme is active</p>
        <div className="grid grid-cols-3 gap-2 opacity-50 pointer-events-none">
          {themes.slice(0, 3).map(theme => (
            <div
              key={theme.id}
              className="h-12 rounded-md border relative"
              style={{ backgroundColor: theme.secondaryColor }}
            >
              <div 
                className="absolute top-0 left-0 w-1/3 h-full rounded-l-md"
                style={{ backgroundColor: theme.primaryColor }}
              />
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <button 
            className="text-xs px-3 py-1.5 bg-secondary rounded-full text-muted-foreground"
            disabled
          >
            Premium Feature
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="tap-card">
      <h3 className="text-lg font-medium mb-2">Customize Theme</h3>
      <p className="text-sm text-muted-foreground mb-4">Select a theme for your journal</p>
      <div className="grid grid-cols-3 gap-3">
        {themes.map(theme => (
          <button
            key={theme.id}
            className={`h-12 rounded-md border relative overflow-hidden hover:ring-2 ring-primary/10 transition-all ${
              selectedTheme === theme.id ? 'ring-2 ring-primary' : ''
            }`}
            style={{ backgroundColor: theme.secondaryColor }}
            onClick={() => onSelectTheme(theme.id)}
          >
            <div 
              className="absolute top-0 left-0 w-1/3 h-full"
              style={{ backgroundColor: theme.primaryColor }}
            />
            {selectedTheme === theme.id && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                <Check className="w-4 h-4 text-primary" />
              </div>
            )}
          </button>
        ))}
      </div>
      <div className="mt-3 text-xs text-muted-foreground text-center">
        {themes.find(t => t.id === selectedTheme)?.name || 'Default'} theme selected
      </div>
    </div>
  );
};

export default ThemeSelector;
