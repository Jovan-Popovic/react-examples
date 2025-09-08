import { useTheme } from '../contexts/ThemeContext';

const ThemeSwitcher = ({ className = '' }) => {
  const { theme, toggleTheme, isLoading } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      disabled={isLoading}
      className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      role="switch"
      aria-checked={theme === 'dark'}
      aria-label="Toggle dark mode"
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
          theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
        }`}
      >
        <span
          className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-200 ease-in ${
            theme === 'dark' ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <svg className="h-3 w-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <span
          className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-200 ease-out ${
            theme === 'dark' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <svg className="h-3 w-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        </span>
      </span>
    </button>
  );
};

export default ThemeSwitcher;