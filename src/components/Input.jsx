import { forwardRef, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Input = forwardRef(({
  type = 'text',
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  error,
  label,
  helpText,
  required = false,
  size = 'md',
  className = '',
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const { isDark } = useTheme();

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const baseClasses = 'w-full rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1';
  
  const stateClasses = () => {
    if (error) {
      return isDark 
        ? 'border-red-500 bg-gray-800 text-white focus:border-red-500 focus:ring-red-500'
        : 'border-red-500 bg-white text-gray-900 focus:border-red-500 focus:ring-red-500';
    }
    
    if (isFocused) {
      return isDark
        ? 'border-blue-500 bg-gray-800 text-white focus:border-blue-500 focus:ring-blue-500'
        : 'border-blue-500 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-500';
    }
    
    return isDark
      ? 'border-gray-600 bg-gray-800 text-white hover:border-gray-500'
      : 'border-gray-300 bg-white text-gray-900 hover:border-gray-400';
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg'
  };

  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed'
    : '';

  const inputClasses = `${baseClasses} ${stateClasses()} ${sizes[size]} ${disabledClasses} ${className}`;

  const placeholderClasses = isDark ? 'placeholder-gray-400' : 'placeholder-gray-500';

  return (
    <div className="w-full">
      {label && (
        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`${inputClasses} ${placeholderClasses}`}
        {...props}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-500 flex items-center">
          <span className="mr-1">⚠️</span>
          {error}
        </p>
      )}
      
      {helpText && !error && (
        <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {helpText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export { Input };