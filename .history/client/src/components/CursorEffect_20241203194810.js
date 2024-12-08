import React, { useState, useEffect } from 'react';
import './CursorEffect.css';

const CursorEffect = () => {
  const [positions, setPositions] = useState([]);

  const handleMouseMove = (e) => {
    setPositions([{ x: e.clientX, y: e.clientY }, ...positions.slice(0, 19)]);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [positions]);

  return (
    <div className="cursor-effect">
      {positions.map((pos, index) => (
        <div
          key={index}
          className="cursor-particle"
          style={{ left: pos.x, top: pos.y, opacity: 1 - index / 20 }}
        ></div>
      ))}
    </div>
  );
};

export default CursorEffect;
