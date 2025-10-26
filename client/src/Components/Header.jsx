import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { useTheme } from '../ThemeContext';
import axios from 'axios';
import ProfileDropdown from './ProfileDropdown';

const Header = () => {
  const { isDarkMode } = useTheme();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const logoRef = useRef(null);

  // -----------------------------------------------------------------
  // 1. Hide header on auth pages
  // -----------------------------------------------------------------
  const authPaths = ['/login', '/register'];
  const isAuthPage = authPaths.includes(location.pathname);

  // -----------------------------------------------------------------
  // 2. Fetch logged-in user (skip on auth pages)
  // -----------------------------------------------------------------
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token || isAuthPage) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error('Failed to load user', err);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [isAuthPage]);

  // -----------------------------------------------------------------
  // 3. Logo hover animation
  // -----------------------------------------------------------------
  const handleLogoHover = useCallback(() => {
    gsap.to('.logo-g', {
      scale: 1.3,
      y: -5,
      color: isDarkMode ? '#FFD700' : '#1E40AF',
      duration: 0.4,
      ease: 'bounce.out',
    });
    gsap.to('.logo-text', {
      letterSpacing: '2px',
      color: isDarkMode ? '#E5E7EB' : '#1F2937',
      duration: 0.4,
      ease: 'power2.out',
    });
  }, [isDarkMode]);

  const handleLogoLeave = useCallback(() => {
    gsap.to('.logo-g', {
      scale: 1,
      y: 0,
      color: isDarkMode ? '#FFFFFF' : '#1F2937',
      duration: 0.4,
    });
    gsap.to('.logo-text', {
      letterSpacing: '0px',
      color: isDarkMode ? '#D1D5DB' : '#4B5563',
      duration: 0.4,
    });
  }, [isDarkMode]);

  // -----------------------------------------------------------------
  // 4. Logo click navigation to home
  // -----------------------------------------------------------------
  const handleLogoClick = useCallback(
    (e) => {
      e.preventDefault();
      navigate('/');
    },
    [navigate]
  );

  // -----------------------------------------------------------------
  // 5. Logout animation
  // -----------------------------------------------------------------
  const handleLogout = useCallback(() => {
    gsap.to('.logout-icon', {
      scale: 0,
      rotate: 360,
      duration: 0.6,
      ease: 'back.in',
      onComplete: () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
      },
    });
  }, [navigate]);

  // -----------------------------------------------------------------
  // 6. macOS-style frosted header component
  // -----------------------------------------------------------------
  const FrostedHeader = ({ children }) => (
    <header
      className={`
        sticky top-0 z-50 h-20 py-4 px-6
        bg-opacity-60 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}
        backdrop-blur-xl
        ${isDarkMode 
          ? 'bg-gradient-to-b from-gray-800/30 to-gray-900/10' 
          : 'bg-gradient-to-b from-blue-50/30 to-gray-50/10'}
        border-b ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'}
        shadow-lg
      `}
    >
      <div className="container mx-auto flex justify-between items-center h-full">
        {children}
      </div>
    </header>
  );

  // -----------------------------------------------------------------
  // 7. Auth pages: minimal header
  // -----------------------------------------------------------------
  if (isAuthPage) {
    return (
      <FrostedHeader>
        <div
          ref={logoRef}
          onMouseEnter={handleLogoHover}
          onMouseLeave={handleLogoLeave}
          onClick={handleLogoClick}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <a href="/" className="flex items-center">
            <span className={`logo-g text-5xl font-black ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              G
            </span>
            <span className={`logo-text text-2xl font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} ml-1`}>
              rotify Careers
            </span>
          </a>
        </div>

        <a
          href={location.pathname === '/login' ? '/register' : '/login'}
          className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          {location.pathname === '/login' ? 'Register' : 'Login'}
        </a>
      </FrostedHeader>
    );
  }

  // -----------------------------------------------------------------
  // 8. Normal header
  // -----------------------------------------------------------------
  return (
    <FrostedHeader>
      <div
        ref={logoRef}
        onMouseEnter={handleLogoHover}
        onMouseLeave={handleLogoLeave}
        onClick={handleLogoClick}
        className="flex items-center space-x-2 cursor-pointer"
      >
        <a href="/" className="flex items-center">
          <span className={`logo-g text-5xl font-black ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            G
          </span>
          <span className={`logo-text text-2xl font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} ml-1`}>
            rotify Careers
          </span>
        </a>
      </div>

      <div className="flex items-center">
        {loading ? (
          <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse" />
        ) : user ? (
          <ProfileDropdown user={user} onLogout={handleLogout} />
        ) : (
          <a
            href="/login"
            className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            Login
          </a>
        )}
      </div>
    </FrostedHeader>
  );
};

export default Header;