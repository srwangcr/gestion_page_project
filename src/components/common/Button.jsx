import React from 'react';
import './Button.css';

const Button = ({ children, onClick, type = 'button' }) => {
  return (
    <button className="custom-button" type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;