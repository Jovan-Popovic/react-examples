import { forwardRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Card = forwardRef(({
  children,
  title,
  subtitle,
  footer,
  padding = 'normal',
  shadow = true,
  border = false,
  className = '',
  ...props
}, ref) => {
  const { isDark } = useTheme();

  const baseClasses = 'rounded-lg transition-all duration-200';
  
  const backgroundClasses = isDark 
    ? 'bg-gray-800 text-white' 
    : 'bg-white text-gray-900';
  
  const shadowClasses = shadow 
    ? (isDark ? 'shadow-lg shadow-gray-900/50' : 'shadow-lg shadow-gray-200/50')
    : '';
  
  const borderClasses = border 
    ? (isDark ? 'border border-gray-700' : 'border border-gray-200')
    : '';

  const paddings = {
    none: '',
    sm: 'p-3',
    normal: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };

  const classes = `${baseClasses} ${backgroundClasses} ${shadowClasses} ${borderClasses} ${className}`;

  return (
    <div ref={ref} className={classes} {...props}>
      {title && (
        <div className={`${paddings[padding]} ${subtitle ? 'pb-2' : 'pb-4'} border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className="text-lg font-semibold">{title}</h3>
          {subtitle && (
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {subtitle}
            </p>
          )}
        </div>
      )}
      
      <div className={!title && !footer ? paddings[padding] : `${paddings[padding]} ${title ? 'pt-4' : ''} ${footer ? 'pb-2' : ''}`}>
        {children}
      </div>
      
      {footer && (
        <div className={`${paddings[padding]} pt-2 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          {footer}
        </div>
      )}
    </div>
  );
});

Card.displayName = 'Card';

export { Card };