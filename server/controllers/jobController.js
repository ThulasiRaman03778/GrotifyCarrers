const JobApplication = require('../models/JobApplication');

const createJob = async (req, res) => {
  try {
    const { companyName, jobTitle, applicationDate, status } = req.body;
    const job = new JobApplication({
      user: req.user._id,
      companyName,
      jobTitle,
      applicationDate,
      status,
    });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    console.error('Error creating job:', error.message);
    res.status(400).json({ message: error.message });
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await JobApplication.find({ user: req.user._id });
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const getJobById = async (req, res) => {
  try {
    console.log('Fetching job with ID:', req.params.id, 'for user:', req.user._id);
    const job = await JobApplication.findOne({ _id: req.params.id, user: req.user._id });
    if (!job) {
      console.log('Job not found for ID:', req.params.id);
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    console.error('Error fetching job:', error.message);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid job ID format' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

const updateJob = async (req, res) => {
  try {
    const { companyName, jobTitle, applicationDate, status } = req.body;
    const job = await JobApplication.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { companyName, jobTitle, applicationDate, status },
      { new: true, runValidators: true }
    );
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    console.error('Error updating job:', error.message);
    res.status(400).json({ message: error.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await JobApplication.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
};