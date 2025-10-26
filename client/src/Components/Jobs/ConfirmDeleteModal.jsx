import React, { useContext, useEffect, useRef } from 'react';
import { ThemeContext } from '../../ThemeContext';
import { gsap } from 'gsap';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const modalRef = useRef(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Backdrop fade-in and slight scale animation
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 0.7, scale: 1, duration: 0.5, ease: 'power3.out' }
      );
      // Modal slide-in from bottom with bounce effect
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'bounce.out' }
      );
    }
  }, [isOpen]);

  const handleClose = () => {
    // Modal slide-out to bottom
    gsap.to(modalRef.current, {
      opacity: 0,
      y: 100,
      duration: 0.4,
      ease: 'power3.in',
    });
    // Backdrop fade-out
    gsap.to(backdropRef.current, {
      opacity: 0,
      scale: 1.1,
      duration: 0.4,
      ease: 'power3.in',
      onComplete: onClose,
    });
  };

  // Button hover animations
  const handleButtonHover = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      boxShadow: isDarkMode
        ? '0 8px 24px rgba(255, 255, 255, 0.3)'
        : '0 8px 24px rgba(0, 0, 0, 0.3)',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleButtonLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  if (!isOpen) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div
        ref={modalRef}
        className={`w-full max-w-md p-8 rounded-2xl shadow-2xl backdrop-blur-lg transition-all duration-300 ${
          isDarkMode
            ? 'bg-gray-900/80 text-white border border-gray-700/50'
            : 'bg-white/80 text-gray-900 border border-gray-200/50'
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          <svg
            className={`w-8 h-8 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h3
            className={`text-2xl font-bold ${
              isDarkMode ? 'text-red-400' : 'text-red-600'
            }`}
          >
            Confirm Deletion
          </h3>
        </div>
        <p
          className={`text-base mb-6 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          Are you sure you want to delete this application? This action is permanent.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={handleClose}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
            className={`flex items-center px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
              isDarkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            } shadow-md hover:shadow-lg focus:ring-4 focus:ring-gray-400/50`}
            aria-label="Cancel deletion"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Cancel
          </button>
          <button
            onClick={onConfirm}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
            className={`flex items-center px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
              isDarkMode
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-red-500 hover:bg-red-600 text-white'
            } shadow-md hover:shadow-lg focus:ring-4 focus:ring-red-400/50`}
            aria-label="Confirm deletion"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-1 5v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V11m4-1h6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;