
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define user types
export type User = {
  id: string;
  email: string;
  name: string;
  isPremium: boolean;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  upgradeAccount: () => void;
};

// Mock users database
const MOCK_USERS = [
  {
    id: '1',
    email: 'demo@example.com',
    password: 'password123',
    name: 'Demo User',
    isPremium: false,
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('tapjournal_user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Find user by email and password
    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('tapjournal_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if email already exists
    if (MOCK_USERS.some(u => u.email === email)) {
      return false;
    }
    
    // Create new user
    const newUser = {
      id: Math.random().toString(36).substring(2, 9),
      email,
      password,
      name,
      isPremium: false,
    };
    
    // Add to mock database
    MOCK_USERS.push(newUser);
    
    // Log in the user
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    setIsAuthenticated(true);
    localStorage.setItem('tapjournal_user', JSON.stringify(userWithoutPassword));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('tapjournal_user');
  };

  const upgradeAccount = () => {
    if (user) {
      const upgradedUser = { ...user, isPremium: true };
      setUser(upgradedUser);
      localStorage.setItem('tapjournal_user', JSON.stringify(upgradedUser));
      
      // Update mock database
      const userIndex = MOCK_USERS.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        MOCK_USERS[userIndex] = { ...MOCK_USERS[userIndex], isPremium: true };
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        signup,
        logout,
        upgradeAccount,
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
