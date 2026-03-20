const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  role: { type: String, enum: ['Founder', 'Management', 'Staff'], default: 'Staff' },
  email: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Team', TeamSchema);