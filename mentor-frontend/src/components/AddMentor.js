// src/components/AddMentor.js
import React, { useState } from 'react';
import axios from 'axios';

const AddMentor = ({ onMentorAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        specialization: '',
        experience: 0,
        location: '',
        available: true,
    });

    // 👇 API base URL env se
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]:
                type === 'checkbox'
                    ? checked
                    : name === 'experience'
                        ? Number(value) // ✅ always number for experience
                        : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/mentors`, formData);
            onMentorAdded(response.data);

            // Reset form
            setFormData({
                name: '',
                specialization: '',
                experience: 0,
                location: '',
                available: true,
            });

            alert('Mentor added successfully!');
        } catch (error) {
            console.error('Error adding mentor:', error);
            alert('Error adding mentor. Please try again.');
        }
    };

    return (
        <div className="add-mentor-form">
            <h2>Add New Mentor</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Specialization:</label>
                    <input
                        type="text"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Years of Experience:</label>
                    <input
                        type="number"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        required
                        min="0"
                    />
                </div>

                <div className="form-group">
                    <label>Location:</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group checkbox">
                    <label>
                        <input
                            type="checkbox"
                            name="available"
                            checked={formData.available}
                            onChange={handleChange}
                        />
                        Currently Available
                    </label>
                </div>

                <button type="submit" className="submit-btn">Add Mentor</button>
            </form>
        </div>
    );
};

export default AddMentor;
