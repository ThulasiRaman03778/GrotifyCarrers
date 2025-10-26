// src/components/ProfileDropdown.jsx
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../ThemeContext';
import { useNavigate } from 'react-router-dom';

const ProfileDropdown = ({ user, onLogout }) => {
  const { isDarkMode, setIsDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const navigate = useNavigate();

  /* ---------- open / close ---------- */
  const open = () => {
    if (isOpen) return;
    setIsOpen(true);
    gsap.fromTo(
      dropdownRef.current,
      { opacity: 0, y: -10, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'back.out(1.7)' }
    );
  };

  const close = () => {
    gsap.to(dropdownRef.current, {
      opacity: 0,
      y: -10,
      scale: 0.95,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => setIsOpen(false),
    });
  };

  /* ---------- option click handler ---------- */
  const handleOptionClick = (action) => {
    close();
    if (action === 'logout') {
      gsap.to('.logout-icon', {
        scale: 0,
        rotate: -360,
        duration: 0.5,
        ease: 'back.in',
        onComplete: onLogout,
      });
    } else if (action === 'dashboard') {
      navigate('/dashboard');
    } else if (action === 'toggle') {
      const newMode = !isDarkMode;
      setIsDarkMode(newMode);
      localStorage.setItem('darkMode', newMode);
      document.documentElement.classList.toggle('dark', newMode);
    }
  };

  /* ---------- click-outside ---------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !triggerRef.current.contains(e.target)
      ) {
        close();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative">
      {/* ----- Trigger ----- */}
      <button
        ref={triggerRef}
        onMouseEnter={open}
        onClick={open}
        className={`
          flex items-center space-x-3 px-5 py-2.5 rounded-full
          font-medium text-sm
           ${isDarkMode ? ' text-white' : ' text-grey-900'}
          transition-all duration-300
        `}
      >
        <div
          className={`
            w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
            ${isDarkMode ? 'bg-white/20 text-white' : 'bg-gray-800/20 text-grey-900'}
          `}
        >
          {user.name.charAt(0).toUpperCase()}
        </div>
        <span className="hidden sm:block">{user.name.split(' ')[0]}</span>
      </button>

      {/* ----- Dropdown Menu ----- */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className={`
            absolute right-0 mt-3 w-64 rounded-2xl overflow-hidden shadow-2xl
            backdrop-blur-xl
            /*  REMOVED ALL BACKGROUND COLORS  */
            ${isDarkMode
              ? 'bg-gray-800/95 border border-gray-700'          // dark
              : 'bg-white/95 border border-gray-300'            // light
            }
          `}
        >
          {/* User Info */}
          <div className="px-5 py-4 text-left">
            <p className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {user.name}
            </p>
            <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {user.email}
            </p>
          </div>

          <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`} />

          {/* Options */}
          <div className="py-1">
            {/* Dashboard */}
            <button
              onClick={() => handleOptionClick('dashboard')}
              className={`
                w-full px-5 py-3 text-left flex items-center space-x-3
                transition-colors
                ${isDarkMode
                  ? 'text-gray-100 hover:bg-gray-700/50'
                  : 'text-gray-800 hover:bg-gray-100'
                }
              `}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span>Dashboard</span>
            </button>

            {/* Dark Mode */}
            <button
              onClick={() => handleOptionClick('toggle')}
              className={`
                w-full px-5 py-3 text-left flex items-center justify-between
                transition-colors
                ${isDarkMode
                  ? 'text-gray-100 hover:bg-gray-700/50'
                  : 'text-gray-800 hover:bg-gray-100'
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isDarkMode ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707-.707M6.343 17.657l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  )}
                </svg>
                <span>Dark Appearance</span>
              </div>
              <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {isDarkMode ? 'ON' : 'OFF'}
              </span>
            </button>

            {/* Logout */}
            <button
              onClick={() => handleOptionClick('logout')}
              className={`
                w-full px-5 py-3 text-left flex items-center space-x-3
                transition-colors
                ${isDarkMode
                  ? 'text-red-400 hover:bg-red-900/30'
                  : 'text-red-500 hover:bg-red-50'
                }
              `}
            >
              <svg
                className="w-5 h-5 logout-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;