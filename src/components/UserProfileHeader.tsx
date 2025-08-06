
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, Settings, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserProfileHeader: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 p-2 rounded-full hover:bg-secondary transition-colors"
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
          <User size={16} />
        </div>
        <span className="text-sm font-medium hidden md:block">{user.name}</span>
        {user.isPremium && (
          <span className="text-xs bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-2 py-0.5 rounded-full hidden md:block">
            Premium
          </span>
        )}
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-card rounded-md shadow-lg border overflow-hidden z-10">
          <div className="p-3 border-b">
            <div className="font-medium">{user.name}</div>
            <div className="text-xs text-muted-foreground">{user.email}</div>
            {user.isPremium && (
              <span className="text-xs bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-2 py-0.5 rounded-full mt-1 inline-block">
                Premium
              </span>
            )}
          </div>
          <div className="p-1">
            <button
              onClick={() => {
                setShowMenu(false);
                navigate('/settings');
              }}
              className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm hover:bg-secondary rounded-sm"
            >
              <Settings size={14} />
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm hover:bg-destructive/10 text-destructive rounded-sm"
            >
              <LogOut size={14} />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileHeader;
