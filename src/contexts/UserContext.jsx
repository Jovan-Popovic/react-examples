import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (credentials.username === 'demo' && credentials.password === 'password') {
        const userData = {
          id: 1,
          username: credentials.username,
          email: 'demo@example.com',
          name: 'Demo User',
          avatar: '👤',
          preferences: {
            notifications: true,
            theme: 'auto'
          }
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return userData;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setError(null);
    localStorage.removeItem('user');
  }, []);

  const updateUser = useCallback((updates) => {
    setUser(prev => {
      const updated = { ...prev, ...updates };
      localStorage.setItem('user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updatePreferences = useCallback((preferences) => {
    updateUser({
      preferences: { ...user?.preferences, ...preferences }
    });
  }, [user?.preferences, updateUser]);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (err) {
      console.warn('Failed to load user from localStorage:', err);
      localStorage.removeItem('user');
    }
  }, []);

  const value = {
    user,
    isLoading,
    error,
    login,
    logout,
    updateUser,
    updatePreferences,
    isAuthenticated: !!user,
    isGuest: !user
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const useAuthGuard = (redirectTo = '/login') => {
  const { isAuthenticated, isLoading } = useUser();
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      console.log(`User not authenticated, would redirect to: ${redirectTo}`);
    }
  }, [isAuthenticated, isLoading, redirectTo]);
  
  return { isAuthenticated, isLoading };
};