const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {  })
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

const mentorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, required: true },
    location: { type: String, required: true },
    available: { type: Boolean, required: true }
});

const Mentor = mongoose.model('Mentor', mentorSchema);

// GET all mentors or filtered mentors
app.get('/mentors', async (req, res) => {
    try {
        const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
        const mentors = await Mentor.find(filter);
        
        if(mentors.length === 0) {
            return res.status(404).json({ message: "No mentors found matching your criteria" });
        }
        
        res.status(200).json(mentors);
    } catch (error) {
        if(error instanceof SyntaxError) {
            return res.status(400).json({ message: "Invalid filter format" });
        }
        res.status(500).json({ message: "Server error while fetching mentors", error });
    }
});

// POST a new mentor
app.post('/mentors', async (req, res) => {
    try {
        const { name, specialization, experience, location, available } = req.body;
        
        if(!name || !specialization || !experience || !location || available === undefined) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        const mentor = new Mentor(req.body);
        await mentor.save();
        res.status(201).json(mentor);
    } catch (error) {
        if(error.name === 'ValidationError') {
            return res.status(400).json({ message: "Validation error", details: error.errors });
        }
        res.status(500).json({ message: "Server error while adding mentor", error });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
