import React from 'react';

/**
 * Universal Button component
 * Explaining this to you in Russian:
 * Мы создаем компонент кнопки, который может быть разных стилей (primary, secondary, ghost).
 * Параметр 'variant' определяет, как кнопка будет выглядеть, а остальные пропсы (...props)
 * пробрасываются стандартной кнопке HTML.
 */
const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  
  return (
    <button 
      className={`${baseClass} ${variantClass} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
