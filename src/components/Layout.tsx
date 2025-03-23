
import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Home, Calendar, Book, Settings } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import UserProfileHeader from './UserProfileHeader';
import Logo from './Logo';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border shadow-sm bg-card">
        <div className="container mx-auto px-4 flex items-center justify-between h-14">
          <Link to="/" className="flex items-center">
            <Logo />
            <h1 className="text-xl font-bold ml-1">TapJournal</h1>
          </Link>
          <UserProfileHeader />
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-6 mb-16 md:mb-6">
        {children}
      </main>
      
      <nav className="fixed bottom-0 w-full border-t border-border shadow-[0_-2px_10px_rgba(0,0,0,0.05)] bg-card md:pb-0 pb-5">
        <div className="container mx-auto px-4 flex items-center justify-between h-14">
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
            aria-label="Journal"
          >
            <Book size={20} />
            <span className="text-xs">Journal</span>
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
