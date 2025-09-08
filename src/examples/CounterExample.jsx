import { useMemo } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { useTheme } from "../contexts/ThemeContext";
import { useCounter } from "../hooks/useCounter";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const CounterExample = () => {
  const { isDark } = useTheme();
  const [step, setStep] = useLocalStorage("counter-step", 1);
  const {
    count,
    increment,
    decrement,
    reset,
    setValue,
    isPositive,
    isNegative,
    isZero,
  } = useCounter(0, step);

  const variable = useMemo(() => {
    console.log("test");
    return step;
  }, [count]);

  const handleStepChange = newStep => {
    setStep(parseInt(newStep) || 1);
  };

  const handleSetValue = () => {
    const value = prompt("Enter a new value:");
    if (value !== null) {
      setValue(parseInt(value) || 0);
    }
  };

  return (
    <Card
      title="Counter Example"
      subtitle="Demonstrates custom hooks: useCounter & useLocalStorage"
      className="w-full max-w-md"
    >
      <div className="text-center space-y-4">
        <div className="text-6xl font-mono font-bold">
          <span
            className={
              isPositive
                ? "text-green-500"
                : isNegative
                ? "text-red-500"
                : "text-gray-500"
            }
          >
            {count}
          </span>
        </div>

        <div
          className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
        >
          Status: {isZero ? "Zero" : isPositive ? "Positive" : "Negative"}
        </div>

        <div className="flex gap-2 justify-center">
          <Button variant="outline" onClick={decrement} size="sm">
            -{step}
          </Button>

          <Button variant="secondary" onClick={reset} size="sm">
            Reset
          </Button>

          <Button variant="primary" onClick={increment} size="sm">
            +{step}
          </Button>
        </div>

        <div className="border-t pt-4 space-y-3">
          <div className="flex items-center gap-2">
            <label
              className={`text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Step:
            </label>
            <select
              value={step}
              onChange={e => handleStepChange(e.target.value)}
              className={`px-2 py-1 rounded border text-sm ${
                isDark
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              <option value="1">1</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="100">100</option>
            </select>
          </div>

          <Button
            variant="outline"
            onClick={handleSetValue}
            size="sm"
            className="w-full"
          >
            Set Custom Value
          </Button>
        </div>

        <div
          className={`text-xs p-2 rounded ${
            isDark ? "bg-gray-700" : "bg-gray-100"
          }`}
        >
          💡 Step value is saved to localStorage and persists between sessions
        </div>
      </div>
    </Card>
  );
};
