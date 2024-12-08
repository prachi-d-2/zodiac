import React from 'react';
import './Parallax.css';

const Parallax = () => (
  <div className="parallax-container">
    <div className="layer" data-depth="0.2"></div>
    <div className="layer stars" data-depth="0.5"></div>
  </div>
);

export default Parallax;
