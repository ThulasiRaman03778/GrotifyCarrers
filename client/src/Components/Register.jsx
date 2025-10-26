// src/components/Register.jsx
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext';
import axios from 'axios';

const Register = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true); // Disable button during API call

    // Client-side validation
    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
        confirmPassword,
      });
      localStorage.setItem('token', res.data.token); // Store JWT token
      setSuccess(res.data.message || 'Registration successful! Redirecting...');
      setTimeout(() => {
        navigate('/login'); // Redirect to login page
      }, 2000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false); // Re-enable button
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`w-full max-w-md p-8 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} text-center mb-6`}>
          Register for Grotify Careers
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className={`block ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`} htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-2 rounded-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} focus:outline-none focus:border-green-500`}
              required
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <label className={`block ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`} htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 rounded-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} focus:outline-none focus:border-green-500`}
              required
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <label className={`block ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`} htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 rounded-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} focus:outline-none focus:border-green-500`}
              required
              disabled={isLoading}
            />
          </div>
          <div className="mb-6">
            <label className={`block ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`} htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full px-4 py-2 rounded-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} focus:outline-none focus:border-green-500`}
              required
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            className={`w-full ${isDarkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white px-6 py-3 rounded-md font-semibold transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className={`text-center mt-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Already have an account? <Link to="/login" className="text-green-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;