import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  // eslint-disable-next-line no-unused-vars
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isProfileSetupComplete: boolean;
  // eslint-disable-next-line no-unused-vars
  completeProfileSetup: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isProfileSetupComplete, setIsProfileSetupComplete] = useState(false);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setIsProfileSetupComplete(false);
  };

  const completeProfileSetup = () => {
    setIsProfileSetupComplete(true);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isProfileSetupComplete,
    completeProfileSetup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
