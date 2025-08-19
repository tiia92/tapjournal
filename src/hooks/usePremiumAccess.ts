import { useAuth } from '@/context/AuthContext';

export const usePremiumAccess = () => {
  const { user, isDemoMode } = useAuth();
  
  const isPremium = user?.isPremium || isDemoMode;
  
  return {
    isPremium,
    isDemoMode
  };
};