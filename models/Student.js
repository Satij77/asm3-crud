const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  studentCode: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Student', StudentSchema);
