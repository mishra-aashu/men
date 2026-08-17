import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [onboardingState, setOnboardingState] = useState({
    oathAccepted: false,
    age: null,
    interests: [],
    username: '',
    avatar: 'batman', // default avatar tag
    anonymousMode: true, // default anonymous
  });

  const login = async (email, password) => {
    setIsLoading(true);
    // Mock API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    setUser({
      id: '1',
      email,
      username: onboardingState.username || email.split('@')[0],
      avatar: onboardingState.avatar,
      isPremium: false,
      streakCount: 3,
      isAnonymous: onboardingState.anonymousMode,
    });
    setIsLoading(false);
  };

  const signup = async (email, password) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setUser({
      id: '1',
      email,
      username: onboardingState.username || 'DarkKnight_01',
      avatar: onboardingState.avatar,
      isPremium: false,
      streakCount: 1,
      isAnonymous: onboardingState.anonymousMode,
    });
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  const updateOnboarding = (data) => {
    setOnboardingState((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const completeOnboarding = () => {
    setOnboardingCompleted(true);
  };

  const toggleAnonymousMode = () => {
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        isAnonymous: !prev.isAnonymous,
      };
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        onboardingCompleted,
        onboardingState,
        login,
        signup,
        logout,
        updateOnboarding,
        completeOnboarding,
        toggleAnonymousMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
