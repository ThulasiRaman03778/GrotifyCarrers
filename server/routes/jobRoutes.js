// routes/jobRoutes.js
const express = require('express');
const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require('../controllers/jobController');
const auth = require('../middleware/auth'); // Fixed typo

const router = express.Router();

// Protect all routes with auth middleware
router.use(auth);

// Job routes
router.post('/', createJob); // Create a new job
router.get('/', getJobs); // Get all jobs for the user
router.get('/:id', getJobById); // Get a job by ID
router.put('/:id', updateJob); // Update a job
router.delete('/:id', deleteJob); // Delete a job

module.exports = router;