import { useCallback, useState } from "react";

export const useCounter = (initialValue = 0, step = 1) => {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount(prev => prev + step);
  }, [step]);

  const decrement = useCallback(() => {
    setCount(prev => prev - step);
  }, [step]);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  const setValue = useCallback(value => {
    if (typeof value === "function") {
      setCount(value);
    } else {
      setCount(value);
    }
  }, []);

  return {
    count,
    increment,
    decrement,
    reset,
    setValue,
    isPositive: count > 0,
    isNegative: count < 0,
    isZero: count === 0,
  };
};
