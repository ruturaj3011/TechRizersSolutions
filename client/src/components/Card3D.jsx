import React, { useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const Card3D = ({
  children,
  className = '',
  style = {},
  maxTilt = 12,
  scale = 1.02,
  glare = true,
  onClick
}) => {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState('');
  const [glareStyle, setGlareStyle] = useState({ opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const { activeThemeConfig } = useTheme();

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`
    );

    if (glare) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      setGlareStyle({
        opacity: 0.35,
        background: `radial-gradient(circle at ${glareX}% ${glareY}%, ${activeThemeConfig.glow || 'rgba(0, 240, 255, 0.4)'} 0%, transparent 65%)`
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlareStyle({ opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      className={`card-3d-wrapper ${className}`}
      style={{
        ...style,
        transform: transformStyle,
        transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.4s ease-out',
        transformStyle: 'preserve-3d',
        position: 'relative'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="card-3d-content" style={{ transformStyle: 'preserve-3d' }}>
        {children}
      </div>

      {glare && (
        <div
          className="card-3d-glare"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            transition: isHovered ? 'opacity 0.15s ease' : 'opacity 0.4s ease',
            zIndex: 10,
            ...glareStyle
          }}
        />
      )}
    </div>
  );
};

export default Card3D;
