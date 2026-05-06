import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import MobileNav from '@/components/MobileNav';
import { useAuth } from '@/context/AuthContext';
import { LogOut } from 'lucide-react';

const PublicNav: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-md safe-top">
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center"
          aria-label="TapJournal home"
        >
          <Logo size="medium" />
          <h1 className="text-xl md:text-2xl font-bold ml-2">TapJournal</h1>
        </button>

        <div className="hidden md:flex space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Button onClick={() => navigate('/dashboard')}>Go to Journal</Button>
              <Button variant="ghost" onClick={() => navigate('/about')}>About Us</Button>
              <Button variant="ghost" onClick={() => navigate('/pricing')}>Pricing</Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut size={18} className="mr-2" />
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate('/about')}>About Us</Button>
              <Button variant="ghost" onClick={() => navigate('/pricing')}>Pricing</Button>
              <Button variant="outline" onClick={() => navigate('/login')}>Log In</Button>
              <Button onClick={() => navigate('/signup')}>Sign Up</Button>
            </>
          )}
        </div>

        <MobileNav />
      </div>
    </header>
  );
};

export default PublicNav;
