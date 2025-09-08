import React from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { UserProvider } from "./contexts/UserContext";
import { CounterExample } from "./examples/CounterExample";
import { ThemeExample } from "./examples/ThemeExample";
import { UserDashboard } from "./examples/UserDashboard";
import { SearchFilterExample } from "./examples/SearchFilterExample";
import ThemeSwitcher from "./components/ThemeSwitcher";
import { useLocalStorage } from "./hooks/useLocalStorage";

function AppContent() {
  const [activeExample, setActiveExample] = useLocalStorage("activeExample", "counter");

  const examples = [
    { id: "counter", name: "Counter & Hooks", component: CounterExample },
    { id: "user", name: "User Context", component: UserDashboard },
    { id: "theme", name: "Theme Switcher", component: ThemeExample },
    { id: "search", name: "Search & Filter", component: SearchFilterExample },
  ];

  const ActiveComponent =
    examples.find(ex => ex.id === activeExample)?.component || CounterExample;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1"></div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white flex-1">
              React Learning Examples
            </h1>
            <div className="flex-1 flex justify-end">
              <ThemeSwitcher />
            </div>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Interactive examples covering state management, custom hooks,
            context providers, component composition, and props forwarding
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {examples.map(example => (
            <button
              key={example.id}
              onClick={() => setActiveExample(example.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeExample === example.id
                  ? "bg-blue-500 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600"
              }`}
            >
              {example.name}
            </button>
          ))}
        </div>

        <div className="flex justify-center">
          <ActiveComponent />
        </div>

        <footer className="text-center mt-12 text-sm text-gray-500 dark:text-gray-400">
          <div className="space-y-2">
            <p>
              React learning examples with modern patterns and best practices
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              <span>✅ Custom Hooks</span>
              <span>✅ Context Providers</span>
              <span>✅ Props Forwarding</span>
              <span>✅ State Management</span>
              <span>✅ Component Composition</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <UserProvider>
        <AppContent />
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
