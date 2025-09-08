import { useTheme } from '../contexts/ThemeContext';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export const ThemeExample = () => {
  const { theme, toggleTheme, setTheme, isDark, isLight, isLoading } = useTheme();

  const themeOptions = [
    { value: 'light', label: 'Light', emoji: '☀️' },
    { value: 'dark', label: 'Dark', emoji: '🌙' }
  ];

  return (
    <Card
      title="Theme Switcher"
      subtitle="Demonstrates theme context with useReducer"
      className="w-full max-w-md"
    >
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-4xl mb-2">
            {isDark ? '🌙' : '☀️'}
          </div>
          <p className="text-lg font-medium capitalize">
            Current theme: {theme}
          </p>
          {isLoading && (
            <p className="text-sm text-blue-500 mt-1">
              Switching theme...
            </p>
          )}
        </div>

        <div className="space-y-3">
          <Button
            onClick={toggleTheme}
            disabled={isLoading}
            className="w-full"
            variant="primary"
          >
            {isLoading ? 'Switching...' : `Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
          </Button>

          <div className="grid grid-cols-2 gap-2">
            {themeOptions.map(option => (
              <Button
                key={option.value}
                onClick={() => setTheme(option.value)}
                disabled={isLoading || theme === option.value}
                variant={theme === option.value ? 'primary' : 'outline'}
                size="sm"
              >
                {option.emoji} {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div className={`p-3 rounded-lg border-2 border-dashed transition-colors ${
          isDark 
            ? 'border-gray-600 bg-gray-800/50' 
            : 'border-gray-300 bg-gray-50/50'
        }`}>
          <h4 className="font-medium text-sm mb-2">Theme Features:</h4>
          <ul className="text-xs space-y-1">
            <li>✅ Context-based state management</li>
            <li>✅ useReducer for complex state logic</li>
            <li>✅ Persistent theme storage</li>
            <li>✅ Loading states during transitions</li>
            <li>✅ Document-level theme application</li>
          </ul>
        </div>

        <div className="text-xs text-center space-y-1">
          <div>State values:</div>
          <div className="font-mono">
            isDark: {isDark.toString()} | isLight: {isLight.toString()}
          </div>
        </div>
      </div>
    </Card>
  );
};