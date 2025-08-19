// models/Mentor.js
const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, required: true },
    location: { type: String, required: true },
    available: { type: Boolean, required: true }
});

module.exports = mongoose.model('Mentor', mentorSchema);
