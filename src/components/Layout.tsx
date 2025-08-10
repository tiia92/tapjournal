
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Calendar, BookOpen, Settings } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import UserProfileHeader from './UserProfileHeader';
import Logo from './Logo';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, loading } = useAuth();

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border shadow-sm bg-card safe-top">
        <div className="container mx-auto px-4 flex items-center justify-between h-12 md:h-14">
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => navigate('/')}
          >
            <Logo />
            <h1 className="text-lg md:text-xl font-bold ml-1">TapJournal</h1>
          </div>
          <UserProfileHeader />
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-4 md:py-6 mb-20 md:mb-6 mobile-scroll">
        {children}
      </main>
      
      <nav className="fixed bottom-0 w-full border-t border-border shadow-[0_-2px_10px_rgba(0,0,0,0.05)] bg-card/95 backdrop-blur-sm z-50 safe-bottom">
        <div className="container mx-auto px-2 md:px-4 flex items-center justify-between h-16 md:h-14">
          <button 
            onClick={() => navigate('/dashboard')}
            className={`nav-button ${location.pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground'}`}
            aria-label="Dashboard"
          >
            <Home size={20} />
            <span className="text-xs">Today</span>
          </button>
          
          <button 
            onClick={() => navigate('/journal')}
            className={`nav-button ${location.pathname === '/journal' ? 'text-primary' : 'text-muted-foreground'}`}
            aria-label="Insights"
          >
            <BookOpen size={20} />
            <span className="text-xs">Insights</span>
          </button>
          
          <button 
            onClick={() => navigate('/calendar')}
            className={`nav-button ${location.pathname === '/calendar' ? 'text-primary' : 'text-muted-foreground'}`}
            aria-label="Calendar"
          >
            <Calendar size={20} />
            <span className="text-xs">Calendar</span>
          </button>
          
          <button 
            onClick={() => navigate('/settings')}
            className={`nav-button ${location.pathname === '/settings' ? 'text-primary' : 'text-muted-foreground'}`}
            aria-label="Settings"
          >
            <Settings size={20} />
            <span className="text-xs">Settings</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
