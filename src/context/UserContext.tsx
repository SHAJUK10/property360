import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: string;
  serviceName?: string;
  bio?: string;
  location?: string;
  price?: string;
  profileImage?: string;
  bannerImage?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  recentlyBrowsed: User[];
  addToRecentlyBrowsed: (user: User) => void;
  shortlisted: User[];
  addToShortlist: (user: User) => void;
  removeFromShortlist: (userId: string) => void;
  isShortlisted: (userId: string) => boolean;
  logout: () => Promise<void>;
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
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentlyBrowsed, setRecentlyBrowsed] = useState<User[]>([]);
  const [shortlisted, setShortlisted] = useState<User[]>([]);

  // Load recently browsed and shortlisted from localStorage
  useEffect(() => {
    const savedRecentlyBrowsed = localStorage.getItem('recentlyBrowsed');
    const savedShortlisted = localStorage.getItem('shortlisted');

    if (savedRecentlyBrowsed) setRecentlyBrowsed(JSON.parse(savedRecentlyBrowsed));
    if (savedShortlisted) setShortlisted(JSON.parse(savedShortlisted));
  }, []);

  // Fetch user profile from profiles table
  const fetchUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      return {
        id: supabaseUser.id,
        email: supabaseUser.email!,
        name: profile.name,
        phone: profile.phone,
        role: profile.role,
        serviceName: profile.service_name,
        bio: profile.bio,
        location: profile.location,
        price: profile.price,
        profileImage: profile.profile_image,
        bannerImage: profile.banner_image
      };
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      return null;
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setLoading(true);
        
        if (session?.user) {
          const userProfile = await fetchUserProfile(session.user);
          setUserState(userProfile);
        } else {
          setUserState(null);
        }
        
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const setUser = async (userData: User | null) => {
    if (userData === null) {
      await logout();
    } else {
      setUserState(userData);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUserState(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

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
      loading,
      recentlyBrowsed,
      addToRecentlyBrowsed,
      shortlisted,
      addToShortlist,
      removeFromShortlist,
      isShortlisted,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
};