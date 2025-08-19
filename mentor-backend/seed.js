const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

const Mentor = mongoose.model('Mentor', new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, required: true },
    location: { type: String, required: true },
    available: { type: Boolean, required: true }
}));

const mentors = [
    { id: "1", name: "Dr. A Sharma", specialization: "Physician", experience: 8, location: "Delhi", available: true },
    { id: "2", name: "Ms. B Patel", specialization: "Gynecologist", experience: 5, location: "Mumbai", available: false },
    { id: "3", name: "Mr. C Verma", specialization: "Dermatologist", experience: 3, location: "Bangalore", available: true },
    { id: "4", name: "Dr. D Singh", specialization: "Cardiologist", experience: 10, location: "Chennai", available: true },
    { id: "5", name: "Ms. E Gupta", specialization: "Anesthesiologist", experience: 4, location: "Pune", available: false },
    { id: "6", name: "Mr. F Rao", specialization: "Anesthesiologist", experience: 6, location: "Hyderabad", available: true },
    { id: "7", name: "Dr. G Mehta", specialization: "Orthopedic", experience: 12, location: "Ahmedabad", available: true },
    { id: "8", name: "Ms. H Joshi", specialization: "Neurologist", experience: 7, location: "Kolkata", available: false },
    { id: "9", name: "Mr. I Nair", specialization: "Product Manager", experience: 5, location: "Noida", available: true },
    { id: "10", name: "Dr. J Kumar", specialization: "Pediatrician", experience: 9, location: "Jaipur", available: true },
    { id: "11", name: "Ms. K Sharma", specialization: "Orthopedic", experience: 3, location: "Gurgaon", available: false },
    { id: "12", name: "Mr. L Singh", specialization: "Neuro Surgeon", experience: 4, location: "Lucknow", available: true },
    { id: "13", name: "Dr. M Patel", specialization: "Surgeon", experience: 15, location: "Surat", available: true },
    { id: "14", name: "Ms. N Verma", specialization: "Cardiologist", experience: 2, location: "Indore", available: true },
    { id: "15", name: "Mr. O Rao", specialization: "Cardiothoracic Surgeon", experience: 6, location: "Nagpur", available: false }
];

const seedDB = async () => {
    await Mentor.deleteMany({});
    await Mentor.insertMany(mentors);
    console.log("Database seeded with dummy mentors!");
    mongoose.connection.close();
};

seedDB();
