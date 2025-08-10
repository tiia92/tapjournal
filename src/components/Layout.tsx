
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
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary/20 border-t-primary"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-accent/20">
      <header className="border-b border-border/50 backdrop-blur-md bg-card/80 shadow-soft safe-top">
        <div className="container mx-auto px-6 flex items-center justify-between h-16">
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <Logo />
            <h1 className="text-xl font-display font-bold ml-2 tracking-tight group-hover:text-primary transition-colors duration-200">
              TapJournal
            </h1>
          </div>
          <UserProfileHeader />
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-6 py-8 mb-24 md:mb-8 mobile-scroll">
        {children}
      </main>
      
      <nav className="fixed bottom-0 w-full border-t border-border/50 backdrop-blur-md bg-card/90 shadow-floating z-50 safe-bottom">
        <div className="container mx-auto px-4 flex items-center justify-between h-20">
          <button 
            onClick={() => navigate('/dashboard')}
            className={`nav-button ${location.pathname === '/dashboard' ? 'text-primary bg-primary/10' : 'text-muted-foreground'}`}
            aria-label="Dashboard"
          >
            <Home size={22} strokeWidth={location.pathname === '/dashboard' ? 2.5 : 2} />
            <span className="text-xs font-medium">Today</span>
          </button>
          
          <button 
            onClick={() => navigate('/journal')}
            className={`nav-button ${location.pathname === '/journal' ? 'text-primary bg-primary/10' : 'text-muted-foreground'}`}
            aria-label="Insights"
          >
            <BookOpen size={22} strokeWidth={location.pathname === '/journal' ? 2.5 : 2} />
            <span className="text-xs font-medium">Insights</span>
          </button>
          
          <button 
            onClick={() => navigate('/calendar')}
            className={`nav-button ${location.pathname === '/calendar' ? 'text-primary bg-primary/10' : 'text-muted-foreground'}`}
            aria-label="Calendar"
          >
            <Calendar size={22} strokeWidth={location.pathname === '/calendar' ? 2.5 : 2} />
            <span className="text-xs font-medium">Calendar</span>
          </button>
          
          <button 
            onClick={() => navigate('/settings')}
            className={`nav-button ${location.pathname === '/settings' ? 'text-primary bg-primary/10' : 'text-muted-foreground'}`}
            aria-label="Settings"
          >
            <Settings size={22} strokeWidth={location.pathname === '/settings' ? 2.5 : 2} />
            <span className="text-xs font-medium">Settings</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
