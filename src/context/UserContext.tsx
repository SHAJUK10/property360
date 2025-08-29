import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  profileImage?: string;
  bannerImage?: string;
  serviceName?: string;
  bio?: string;
  location?: string;
  price?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  recentlyBrowsed: User[];
  addToRecentlyBrowsed: (user: User) => void;
  shortlisted: User[];
  addToShortlist: (user: User) => void;
  removeFromShortlist: (userId: string) => void;
  isShortlisted: (userId: string) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [recentlyBrowsed, setRecentlyBrowsed] = useState<User[]>([]);
  const [shortlisted, setShortlisted] = useState<User[]>([]);

  useEffect(() => {
    // Load data from localStorage on mount
    const savedUser = localStorage.getItem('currentUser');
    const savedRecentlyBrowsed = localStorage.getItem('recentlyBrowsed');
    const savedShortlisted = localStorage.getItem('shortlisted');

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedRecentlyBrowsed) setRecentlyBrowsed(JSON.parse(savedRecentlyBrowsed));
    if (savedShortlisted) setShortlisted(JSON.parse(savedShortlisted));
  }, []);

  useEffect(() => {
    // Save user to localStorage when it changes
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [user]);

  const addToRecentlyBrowsed = (viewedUser: User) => {
    setRecentlyBrowsed(prev => {
      const filtered = prev.filter(u => u.id !== viewedUser.id);
      const updated = [viewedUser, ...filtered].slice(0, 5);
      localStorage.setItem('recentlyBrowsed', JSON.stringify(updated));
      return updated;
    });
  };

  const addToShortlist = (userToShortlist: User) => {
    setShortlisted(prev => {
      if (prev.some(u => u.id === userToShortlist.id)) return prev;
      const updated = [...prev, userToShortlist];
      localStorage.setItem('shortlisted', JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromShortlist = (userId: string) => {
    setShortlisted(prev => {
      const updated = prev.filter(u => u.id !== userId);
      localStorage.setItem('shortlisted', JSON.stringify(updated));
      return updated;
    });
  };

  const isShortlisted = (userId: string) => {
    return shortlisted.some(u => u.id === userId);
  };

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      recentlyBrowsed,
      addToRecentlyBrowsed,
      shortlisted,
      addToShortlist,
      removeFromShortlist,
      isShortlisted
    }}>
      {children}
    </UserContext.Provider>
  );
};