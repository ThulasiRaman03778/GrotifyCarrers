// models/JobApplication.js
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyName: { type: String, required: true, minlength: 3 },
  jobTitle: { type: String, required: true },
  applicationDate: { type: Date, required: true }, // Changed to Date
  status: {
    type: String,
    enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
    default: 'Applied',
  },
}, { timestamps: true });

jobSchema.pre('save', function (next) {
  if (this.applicationDate > new Date()) {
    return next(new Error('Application date cannot be in the future'));
  }
  next();
});

module.exports = mongoose.model('JobApplication', jobSchema);