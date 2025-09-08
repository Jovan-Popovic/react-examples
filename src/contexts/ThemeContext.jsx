import { createContext, useContext, useReducer, useEffect } from 'react';

const ThemeContext = createContext();

const themeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const ThemeProvider = ({ children, defaultTheme = 'light' }) => {
  const [state, dispatch] = useReducer(themeReducer, {
    theme: defaultTheme,
    isLoading: false
  });

  const setTheme = (theme) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    setTimeout(() => {
      dispatch({ type: 'SET_THEME', payload: theme });
      localStorage.setItem('theme', theme);
      dispatch({ type: 'SET_LOADING', payload: false });
    }, 300);
  };

  const toggleTheme = () => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && savedTheme !== state.theme) {
      dispatch({ type: 'SET_THEME', payload: savedTheme });
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (state.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [state.theme]);

  const value = {
    ...state,
    setTheme,
    toggleTheme,
    isDark: state.theme === 'dark',
    isLight: state.theme === 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};