import React from 'react';

/**
 * Universal Input component with label
 * Russian logic:
 * Этот компонент объединяет <label> и <input>. Это удобно, чтобы не писать
 * лишний код каждый раз, когда нам нужно текстовое поле.
 */
const Input = ({ label, id, className = '', ...props }) => {
  return (
    <div className="input-group">
      {label && <label htmlFor={id} className="label">{label}</label>}
      <input 
        id={id}
        className={`input-field ${className}`} 
        {...props}
      />
    </div>
  );
};

export default Input;
