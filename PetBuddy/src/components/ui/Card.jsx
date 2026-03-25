import React from 'react';

const Card = ({ children, className = '', hoverEffect = false }) => {
  const classes = `card ${hoverEffect ? 'hover-card' : ''} ${className}`;
  
  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default Card;
