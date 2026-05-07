
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';

// Define user types
export type User = {
  id: string;
  email: string;
  name: string;
  isPremium: boolean;
};

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  upgradeAccount: () => void;
  refreshPremiumStatus: () => Promise<void>;
  loading: boolean;
  isDemoMode: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  // Check for demo mode
  const isDemoMode = new URLSearchParams(window.location.search).get('demo') === '1';
  
  // Demo user for demo mode
  const demoUser: User = {
    id: 'demo-user',
    email: 'demo@example.com', 
    name: 'Demo User',
    isPremium: true
  };

  // Transform Supabase user to our User type
  const transformUser = (supabaseUser: SupabaseUser, profile?: any, isPremium = false): User => {
    return {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
      name: profile?.name || supabaseUser.user_metadata?.name || 'User',
      isPremium,
    };
  };

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
      }
      return data;
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      return null;
    }
  };

  // Check premium status from user_subscriptions
  const fetchPremiumStatus = async (userId: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select('end_date')
        .eq('user_id', userId)
        .eq('subscription_type', 'premium')
        .eq('is_active', true)
        .maybeSingle();
      if (error) {
        console.error('Error fetching premium status:', error);
        return false;
      }
      if (!data) return false;
      if (data.end_date && new Date(data.end_date) < new Date()) return false;
      return true;
    } catch (error) {
      console.error('Error in fetchPremiumStatus:', error);
      return false;
    }
  };

  const refreshPremiumStatus = async () => {
    if (!user || isDemoMode) return;
    const isPremium = await fetchPremiumStatus(user.id);
    setUser((prev) => (prev ? { ...prev, isPremium } : prev));
  };

  useEffect(() => {
    // Handle demo mode
    if (isDemoMode) {
      setUser(demoUser);
      setIsAuthenticated(true);
      setLoading(false);
      return;
    }
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        
        if (session?.user) {
          setTimeout(async () => {
            const [profile, isPremium] = await Promise.all([
              fetchUserProfile(session.user.id),
              fetchPremiumStatus(session.user.id),
            ]);
            setUser(transformUser(session.user, profile, isPremium));
            setIsAuthenticated(true);
            setLoading(false);
          }, 0);
        } else {
          setUser(null);
          setIsAuthenticated(false);
          setLoading(false);
        }
      }
    );

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const [profile, isPremium] = await Promise.all([
          fetchUserProfile(session.user.id),
          fetchPremiumStatus(session.user.id),
        ]);
        setUser(transformUser(session.user, profile, isPremium));
        setSession(session);
        setIsAuthenticated(true);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [isDemoMode]);

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error: error.message };
      }

      return {};
    } catch (error: any) {
      return { error: error.message || 'An error occurred during login' };
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            name: name
          }
        }
      });

      if (error) {
        return { error: error.message };
      }

      return {};
    } catch (error: any) {
      return { error: error.message || 'An error occurred during signup' };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const upgradeAccount = () => {
    if (user) {
      const upgradedUser = { ...user, isPremium: !user.isPremium };
      setUser(upgradedUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAuthenticated,
        login,
        signup,
        logout,
        upgradeAccount,
        refreshPremiumStatus,
        loading,
        isDemoMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
