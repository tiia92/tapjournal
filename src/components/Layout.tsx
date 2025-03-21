
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, BookOpen, Calendar, Settings } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const navItems = [
    { icon: <Home size={20} />, label: 'Today', path: '/' },
    { icon: <BookOpen size={20} />, label: 'Journal', path: '/journal' },
    { icon: <Calendar size={20} />, label: 'Calendar', path: '/calendar' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="min-h-screen px-4 pt-6 pb-20 sm:pb-6 sm:px-6 md:px-8 mx-auto max-w-md transition-all">
      <header className="mb-6 relative">
        <h1 className="text-3xl font-display font-semibold text-center transition-all">
          <span className="text-primary">Tap</span>Journal
        </h1>
      </header>
      
      <main className="mb-16 sm:mb-6">{children}</main>
      
      <nav className="fixed bottom-0 left-0 right-0 sm:relative bg-background/80 backdrop-blur-lg border-t sm:border sm:rounded-xl sm:mt-6 pt-2 pb-4 px-4 sm:py-3 shadow-lg sm:shadow-glass z-50">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-all ${
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`
              }
            >
              {item.icon}
              <span className="text-xs font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
