// src/Kitty.js
import React from 'react';

const Kitty = ({ image, onClick }) => {
  return (
    <div onClick={onClick} style={{ cursor: 'pointer' }}>
      <img src={image} alt="Kitty" style={{ width: '50px', height: '50px' }} />
    </div>
  );
};

export default Kitty;
