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
    console.log('🔍 fetchUserProfile called with user:', supabaseUser.id, supabaseUser.email);
    try {
      console.log('📡 Attempting to fetch profile from database...');
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      console.log('📊 Database query result:', { profile, error });

      if (error) {
        console.error('❌ Error fetching profile from database:', error.message, error.code, error.details);
        
        // If profile doesn't exist, create it from auth metadata
        if (error.code === 'PGRST116') {
          console.log('👤 Profile not found, creating from auth metadata...');
          const authMetadata = supabaseUser.user_metadata;
          
          if (authMetadata.name && authMetadata.phone && authMetadata.role) {
            console.log('📝 Creating profile with metadata:', authMetadata);
            const { data: newProfile, error: createError } = await supabase
              .from('profiles')
              .insert({
                id: supabaseUser.id,
                name: authMetadata.name,
                phone: authMetadata.phone,
                role: authMetadata.role
              })
              .select()
              .single();

            if (createError) {
              console.error('❌ Error creating profile:', createError);
              return null;
            }

            console.log('✅ Profile created successfully:', newProfile);
            const userProfile = {
              id: supabaseUser.id,
              email: supabaseUser.email!,
              name: newProfile.name,
              phone: newProfile.phone,
              role: newProfile.role,
              serviceName: newProfile.service_name,
              bio: newProfile.bio,
              location: newProfile.location,
              price: newProfile.price,
              profileImage: newProfile.profile_image,
              bannerImage: newProfile.banner_image
            };
            
            console.log('🔄 Transformed user profile from new profile:', userProfile);
            return userProfile;
          } else {
            console.error('❌ No metadata available to create profile');
            return null;
          }
        }
        
        console.error('Error fetching profile:', error);
        return null;
      }

      console.log('✅ Profile data fetched successfully:', profile);
      
      const userProfile = {
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
      
      console.log('🔄 Transformed user profile:', userProfile);
      return userProfile;
    } catch (error) {
      console.error('💥 Unexpected error in fetchUserProfile:', error);
      console.error('Error in fetchUserProfile:', error);
      return null;
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    console.log('🎯 Setting up auth state listener...');
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔔 Auth state changed:', event, 'Session exists:', !!session);
        setLoading(true);
        
        if (session?.user) {
          console.log('👤 User session found, fetching profile...');
          const userProfile = await fetchUserProfile(session.user);
          console.log('📝 Setting user profile in context:', userProfile);
          setUserState(userProfile);
        } else {
          console.log('🚫 No user session, clearing user state');
          setUserState(null);
        }
        
        console.log('✨ Auth state processing complete, loading set to false');
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const setUser = async (userData: User | null) => {
    console.log('🔧 setUser called with:', userData);
    if (userData === null) {
      await logout();
    } else {
      setUserState(userData);
    }
  };

  const logout = async () => {
    console.log('🚪 Logout initiated...');
    try {
      await supabase.auth.signOut();
      console.log('✅ Logout successful');
      setUserState(null);
    } catch (error) {
      console.error('❌ Logout error:', error);
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