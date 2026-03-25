import React from 'react';

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
