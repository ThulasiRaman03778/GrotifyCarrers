import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import api from '../../api';

const JobForm = ({ jobToEdit, onSuccess }) => {
  const { id } = useParams();
  const [form, setForm] = useState({
    companyName: '',
    jobTitle: '',
    applicationDate: '',
    status: 'Applied',
  });
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef(null);
  const curlRef = useRef(null);
  const selectRef = useRef(null);

  useEffect(() => {
    // Page curl animation with GSAP
    gsap.fromTo(
      formRef.current,
      { opacity: 0, scale: 0.95, rotation: 2 },
      { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.7)' }
    );

    gsap.fromTo(
      curlRef.current,
      { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' },
      {
        clipPath: 'polygon(100% 0, 80% 0, 90% 100%, 100% 100%)',
        duration: 1,
        ease: 'power2.out',
        delay: 0.3,
      }
    );

    if (jobToEdit) {
      setForm({
        companyName: jobToEdit.companyName,
        jobTitle: jobToEdit.jobTitle,
        applicationDate: jobToEdit.applicationDate.split('T')[0],
        status: jobToEdit.status,
      });
    } else if (id) {
      api
        .get(`/jobs/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        .then((res) => {
          setForm({
            companyName: res.data.companyName,
            jobTitle: res.data.jobTitle,
            applicationDate: res.data.applicationDate.split('T')[0],
            status: res.data.status,
          });
        })
        .catch((err) => {
          console.error('Error fetching job:', err);
          setErrors({ general: 'Failed to load job data' });
        });
    }
  }, [jobToEdit, id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const err = {};
    if (!form.companyName || form.companyName.length < 3)
      err.companyName = 'Minimum 3 characters';
    if (!form.jobTitle) err.jobTitle = 'Job title is required';
    if (!form.applicationDate) err.applicationDate = 'Application date is required';
    if (new Date(form.applicationDate) > new Date())
      err.applicationDate = 'Date cannot be in the future';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    gsap.to(formRef.current, {
      opacity: 0.7,
      scale: 0.98,
      duration: 0.3,
      onComplete: async () => {
        try {
          if (jobToEdit || id) {
            await api.put(`/jobs/${jobToEdit?._id || id}`, form);
          } else {
            await api.post('/jobs', form);
          }
          gsap.to(formRef.current, {
            opacity: 0,
            scale: 0.95,
            rotation: -2,
            duration: 0.5,
            ease: 'power2.in',
            onComplete: onSuccess,
          });
        } catch (err) {
          gsap.to(formRef.current, { opacity: 1, scale: 1, duration: 0.3 });
          const msgs = err.response?.data?.errors || ['Server error'];
          const errObj = {};
          msgs.forEach((m) => {
            const field = m.includes('company')
              ? 'companyName'
              : m.includes('date')
              ? 'applicationDate'
              : 'jobTitle';
            errObj[field] = m;
          });
          setErrors(errObj);
        }
      },
    });
  };

  const handleSelect = (value) => {
    setForm({ ...form, status: value });
    setIsOpen(false);
    gsap.to(selectRef.current, {
      height: 0,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
    });
  };

  const toggleSelect = () => {
    setIsOpen(!isOpen);
    gsap.to(selectRef.current, {
      height: isOpen ? 0 : 'auto',
      opacity: isOpen ? 0 : 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const statusOptions = ['Applied', 'Interview', 'Offer', 'Rejected'];

  return (
    <div className="relative max-w-md mx-auto mt-10">
      <div
        ref={curlRef}
        className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 z-10"
      />
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="relative bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        {errors.general && (
          <p className="text-red-500 text-sm mb-4 animate-pulse">{errors.general}</p>
        )}
        <div className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="9 22 9 12 15 12 15 22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <input
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              placeholder="Company Name"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
              aria-label="Company name"
            />
            {errors.companyName && (
              <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>
            )}
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="7" r="4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <input
              name="jobTitle"
              value={form.jobTitle}
              onChange={handleChange}
              placeholder="Job Title"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
              aria-label="Job title"
            />
            {errors.jobTitle && (
              <p className="text-red-500 text-xs mt-1">{errors.jobTitle}</p>
            )}
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17 3v4M7 3v4M3 9h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <input
              type="date"
              name="applicationDate"
              value={form.applicationDate}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
              aria-label="Application date"
            />
            {errors.applicationDate && (
              <p className="text-red-500 text-xs mt-1">{errors.applicationDate}</p>
            )}
          </div>
          <div className="relative">
            <div
              className="flex items-center justify-between w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 cursor-pointer"
              onClick={toggleSelect}
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-gray-900 dark:text-white">{form.status}</span>
              </div>
              <svg
                className={`w-4 h-4 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div
              ref={selectRef}
              className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 overflow-hidden"
              style={{ height: 0, opacity: 0 }}
            >
              {statusOptions.map((option) => (
                <div
                  key={option}
                  className="px-4 py-2 hover:bg-teal-100 dark:hover:bg-teal-900 cursor-pointer text-gray-900 dark:text-white"
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center py-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-all duration-300 focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 shadow-lg"
            aria-label={jobToEdit || id ? 'Update job application' : 'Add job application'}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {jobToEdit || id ? 'Update' : 'Add'} Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;