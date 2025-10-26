// eslint-disable-next-line
import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../ThemeContext';
import { gsap } from 'gsap';
import api from '../../api';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const { isDarkMode } = useContext(ThemeContext);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const cardRef = useRef(null);

  useEffect(() => {
    // GSAP animation for card entrance
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.95, rotation: 2 },
      { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.7)' }
    );

    api
      .get(`/jobs/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((res) => {
        setJob(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching job:', error.response?.data, error.message);
        if (error.response?.status === 401) {
          alert('Session expired. Please log in again.');
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          alert('Failed to load job: ' + (error.response?.data?.message || error.message));
          navigate('/dashboard');
        }
      });
  }, [id, navigate]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <svg className="w-10 h-10 animate-spin text-teal-500" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      </div>
    );
  if (!job)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-red-500 text-lg font-medium animate-pulse">Job not found</p>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-md mx-auto">
        <div
          ref={cardRef}
          className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="9 22 9 12 15 12 15 22"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {job.companyName} – {job.jobTitle}
          </h1>
          <div className="space-y-4 text-gray-700 dark:text-gray-200">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17 3v4M7 3v4M3 9h18"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>
                <strong>Applied on:</strong> {new Date(job.applicationDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M9 12l2 2 4-4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>
                <strong>Status:</strong>{' '}
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    job.status === 'Applied'
                      ? 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200'
                      : job.status === 'Interview'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : job.status === 'Offer'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}
                >
                  {job.status}
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d={
                        job.status === 'Applied'
                          ? 'M5 13l4 4L19 7'
                          : job.status === 'Interview'
                          ? 'M12 20h9'
                          : job.status === 'Offer'
                          ? 'M9 12l2 2 4-4'
                          : 'M6 18L18 6M6 6l12 12'
                      }
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </span>
            </div>
          </div>
          <div className="mt-8 flex gap-4">
            <Link
              to={`/jobs/edit/${job._id}`}
              className="flex items-center justify-center px-6 py-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-all duration-300 focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 shadow-lg"
              aria-label="Edit job application"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Edit
            </Link>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center justify-center px-6 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold transition-all duration-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 shadow-lg"
              aria-label="Back to dashboard"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M15 19l-7-7 7-7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;