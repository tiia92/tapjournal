
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from '@/components/ui/drawer';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const MobileNav = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Signed out successfully');
    navigate('/');
    setOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <div className="md:hidden">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon" className="min-h-[44px] min-w-[44px]">
            <Menu size={20} />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[80vh]">
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Menu</h2>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon" className="min-h-[44px] min-w-[44px]">
                  <X size={20} />
                </Button>
              </DrawerClose>
            </div>
            
            <div className="space-y-3">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-left min-h-[44px]"
                onClick={() => handleNavigation('/about')}
              >
                About Us
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start text-left min-h-[44px]"
                onClick={() => handleNavigation('/pricing')}
              >
                Pricing
              </Button>
              
              {isAuthenticated ? (
                <>
                  <Button 
                    className="w-full min-h-[44px]"
                    onClick={() => handleNavigation('/dashboard')}
                  >
                    Go to Journal
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full min-h-[44px]"
                    onClick={handleLogout}
                  >
                    <LogOut size={18} className="mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    className="w-full min-h-[44px]"
                    onClick={() => handleNavigation('/login')}
                  >
                    Log In
                  </Button>
                  <Button 
                    className="w-full min-h-[44px]"
                    onClick={() => handleNavigation('/signup')}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileNav;
