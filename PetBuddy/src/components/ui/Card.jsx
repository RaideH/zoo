import React from 'react';

/**
 * Universal Card component
 * Russian logic:
 * Помнишь, мы делали PetCard? Это более продвинутая версия.
 * Она просто создает красивую "рамку", внутри которой может быть любой контент (children).
 */
const Card = ({ children, className = '', hoverEffect = false }) => {
  const classes = `card ${hoverEffect ? 'hover-card' : ''} ${className}`;
  
  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default Card;
