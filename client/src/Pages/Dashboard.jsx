import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import JobList from '../Components/Jobs/JobList';
import JobForm from '../Components/Jobs/JobForm';
import { ThemeContext } from '../ThemeContext';

const DeletedJobs = () => {
  const [deletedJobs, setDeletedJobs] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem('deletedJobs') || '[]');
    setDeletedJobs(jobs);

    gsap.fromTo(
      tableRef.current?.querySelectorAll('tr'),
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
    );
  }, []);

  const handleClearHistory = () => {
    gsap.to(tableRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        localStorage.setItem('deletedJobs', '[]');
        setDeletedJobs([]);
      },
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Deleted Job Applications</h1>
      {deletedJobs.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No deleted jobs found.</p>
      ) : (
        <>
          <button
            onClick={handleClearHistory}
            className="mb-4 px-6 py-2 rounded-lg font-medium bg-red-600 hover:bg-red-700 text-white transition-all duration-200 focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
            aria-label="Clear delete history"
          >
            Clear History
          </button>
          <table
            ref={tableRef}
            className="min-w-full border dark:border-gray-700 rounded-xl overflow-hidden shadow-lg"
          >
            <thead
              className={`${
                document.documentElement.classList.contains('dark')
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <tr>
                <th className="p-4 text-left font-semibold">Company</th>
                <th className="p-4 text-left font-semibold">Title</th>
                <th className="p-4 text-left font-semibold">Deleted At</th>
              </tr>
            </thead>
            <tbody
              className={document.documentElement.classList.contains('dark') ? 'bg-gray-900' : 'bg-white'}
            >
              {deletedJobs.map((job, index) => (
                <tr
                  key={index}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                >
                  <td className="p-4">{job.companyName}</td>
                  <td className="p-4">{job.jobTitle}</td>
                  <td className="p-4">{new Date(job.deletedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

const Dashboard = () => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const [showForm, setShowForm] = useState(false);
  const [editJob, setEditJob] = useState(null);
  const navigate = useNavigate();
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, []);

  const handleAddJobClick = () => {
    setEditJob(null);
    setShowForm(true);
    navigate('/dashboard/add');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} p-6`}>
      <nav className="mb-6">
        <ul className="flex gap-4 border-b dark:border-gray-700 pb-2">
          <li>
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`
              }
              aria-label="View job list"
            >
              Job List
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/add"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`
              }
              onClick={handleAddJobClick}
              aria-label="Add new job"
            >
              Add Job
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/deleted"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`
              }
              aria-label="View deleted jobs"
            >
              Delete History
            </NavLink>
          </li>
        </ul>
      </nav>

      <div ref={contentRef}>
        <Routes>
          <Route
            path="/"
            element={<JobList onEdit={(job) => { setEditJob(job); setShowForm(true); navigate('/dashboard/edit'); }} />}
          />
          <Route
            path="/add"
            element={
              <div className="mb-6 p-6 rounded-xl border dark:border-gray-700 shadow-lg bg-white dark:bg-gray-800">
                <JobForm
                  jobToEdit={editJob}
                  onSuccess={() => {
                    setShowForm(false);
                    navigate('/dashboard');
                  }}
                />
                <button
                  onClick={() => {
                    setShowForm(false);
                    navigate('/dashboard');
                  }}
                  className="mt-4 text-red-600 hover:text-red-800 font-medium transition-all duration-200"
                  aria-label="Cancel job form"
                >
                  Cancel
                </button>
              </div>
            }
          />
          <Route
            path="/edit"
            element={
              showForm && (
                <div className="mb-6 p-6 rounded-xl border dark:border-gray-700 shadow-lg bg-white dark:bg-gray-800">
                  <JobForm
                    jobToEdit={editJob}
                    onSuccess={() => {
                      setShowForm(false);
                      navigate('/dashboard');
                    }}
                  />
                  <button
                    onClick={() => {
                      setShowForm(false);
                      navigate('/dashboard');
                    }}
                    className="mt-4 text-red-600 hover:text-red-800 font-medium transition-all duration-200"
                    aria-label="Cancel job form"
                  >
                    Cancel
                  </button>
                </div>
              )
            }
          />
          <Route path="/deleted" element={<DeletedJobs />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;