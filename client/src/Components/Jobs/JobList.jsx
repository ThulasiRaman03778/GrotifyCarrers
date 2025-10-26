import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import api from '../../api';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const JobList = ({ onEdit }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });
  const [statusFilter, setStatusFilter] = useState('All');
  const listRef = useRef(null);

  const fetchJobs = async () => {
    try {
      const res = await api.get('/jobs');
      setJobs(res.data);
    } catch (err) {
      alert('Login to view jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    // GSAP animation for list items with rotational entrance
    gsap.fromTo(
      listRef.current?.querySelectorAll('.job-item'),
      { opacity: 0, rotationX: 90, y: 50 },
      { opacity: 1, rotationX: 0, y: 0, duration: 0.8, stagger: 0.2, ease: 'elastic.out(1, 0.5)' }
    );
  }, []);

  // GSAP hover animation for job items
  const handleMouseEnter = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.02,
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleDelete = async (id) => {
    try {
      const job = jobs.find((j) => j._id === id);
      await api.delete(`/jobs/${id}`);
      const deletedJobs = JSON.parse(localStorage.getItem('deletedJobs') || '[]');
      deletedJobs.push({ ...job, deletedAt: new Date().toISOString() });
      localStorage.setItem('deletedJobs', JSON.stringify(deletedJobs));
      setJobs(jobs.filter((j) => j._id !== id));
      setDeleteModal({ open: false, id: null });
    } catch (err) {
      alert('Failed to delete job');
    }
  };

  // Filter jobs based on status
  const filteredJobs = statusFilter === 'All' 
    ? jobs 
    : jobs.filter(job => job.status === statusFilter);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <svg className="w-12 h-12 animate-spin text-purple-500" fill="none" viewBox="0 0 24 24">
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Status Filter Dropdown */}
        <div className="mb-6 flex justify-end">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div ref={listRef} className="space-y-3">
          {filteredJobs.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 text-lg font-medium animate-pulse flex items-center justify-center">
              <svg
                className="w-6 h-6 mr-2 text-purple-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 5v4m6-4v4M5 9h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              No jobs found
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job._id}
                className="job-item bg-white dark:bg-gray-900 p-5 rounded-lg border border-gray-200 dark:border-gray-800 transition-all duration-300"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center text-gray-900 dark:text-white">
                      <svg
                        className="w-5 h-5 mr-2 text-purple-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
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
                      <span className="font-semibold">{job.companyName}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <svg
                        className="w-5 h-5 mr-2 text-purple-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="12"
                          cy="7"
                          r="4"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>{job.jobTitle}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <svg
                        className="w-5 h-5 mr-2 text-purple-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
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
                      <span>{new Date(job.applicationDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-purple-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
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
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          job.status === 'Applied'
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                            : job.status === 'Interview'
                            ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
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
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/job/${job._id}`}
                      className="p-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                      aria-label={`View details for ${job.jobTitle}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                    <button
                      onClick={() => onEdit(job)}
                      className="p-2 rounded-full bg-green-600 hover:bg-green-700 text-white transition-all duration-300 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                      aria-label={`Edit ${job.jobTitle}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    </button>
                    <button
                      onClick={() => setDeleteModal({ open: true, id: job._id })}
                      className="p-2 rounded-full bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-red-600 dark:text-red-300 transition-all duration-300 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                      aria-label={`Delete ${job.jobTitle}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-1 5v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V11m4-1h6"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <ConfirmDeleteModal
          isOpen={deleteModal.open}
          onClose={() => setDeleteModal({ open: false, id: null })}
          onConfirm={() => handleDelete(deleteModal.id)}
        />
      </div>
    </div>
  );
};

export default JobList;