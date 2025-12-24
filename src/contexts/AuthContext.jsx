import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../services/supabaseClient';
import { authService, userService } from '../services';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((async (event, session) => {
      setSession(session);

      if (session?.user) {
        setUser(session.user);
        await loadUserProfile(session.user.id);
      } else {
        setUser(null);
        setProfile(null);
      }

      setLoading(false);
    }));

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session?.user) {
        setUser(session.user);
        await loadUserProfile(session.user.id);
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserProfile = async (userId) => {
    const { data, error } = await userService.getUserProfile(userId);
    if (data) {
      setProfile(data);
    }
  };

  const signIn = async (email, password) => {
    const { user, session, error } = await authService.signIn(email, password);
    if (error) return { error };

    if (user) {
      setUser(user);
      setSession(session);
      await loadUserProfile(user.id);
    }

    return { user, error: null };
  };

  const signUp = async (email, password, displayName) => {
    const { user, error } = await authService.signUp(email, password, displayName);
    if (error) return { error };

    return { user, error: null };
  };

  const signOut = async () => {
    await authService.signOut();
    setUser(null);
    setProfile(null);
    setSession(null);
  };

  const updateProfile = async (updates) => {
    if (!user) return { error: 'No user logged in' };

    const { data, error } = await userService.getUserProfile(user.id);
    if (error) return { error };

    await loadUserProfile(user.id);
    return { error: null };
  };

  const value = {
    user,
    profile,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    refreshProfile: () => user && loadUserProfile(user.id)
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
