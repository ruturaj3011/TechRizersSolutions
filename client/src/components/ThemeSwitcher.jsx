import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher = ({ variant = 'inline' }) => {
  const { theme, setTheme, themes, activeThemeConfig } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`theme-switcher ${variant}`} ref={dropdownRef}>
      <button
        type="button"
        className="theme-switcher-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Change 3D Color Theme"
        aria-label="Change 3D Color Theme"
        aria-expanded={isOpen}
      >
        <span
          className="theme-indicator-dot"
          style={{
            background: `linear-gradient(135deg, ${activeThemeConfig.primary}, ${activeThemeConfig.secondary})`,
            boxShadow: `0 0 10px ${activeThemeConfig.primary}`
          }}
        />
        <span className="theme-name-label">{activeThemeConfig.name}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div className="theme-dropdown-menu">
          <div className="theme-dropdown-header">
            <span>Select 3D Color Theme</span>
          </div>
          <div className="theme-options-list">
            {Object.values(themes).map((t) => {
              const isActive = t.id === theme;
              return (
                <button
                  key={t.id}
                  type="button"
                  className={`theme-option-item ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setTheme(t.id);
                    setIsOpen(false);
                  }}
                >
                  <div className="theme-option-preview">
                    <span
                      className="theme-option-circle"
                      style={{
                        background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
                        boxShadow: isActive ? `0 0 12px ${t.primary}` : 'none'
                      }}
                    />
                  </div>
                  <div className="theme-option-text">
                    <span className="theme-option-title">{t.name}</span>
                    <span className="theme-option-desc">{t.badge}</span>
                  </div>
                  {isActive && (
                    <svg className="theme-check-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
