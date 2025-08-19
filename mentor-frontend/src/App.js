import React, { useEffect, useState } from 'react';
import MentorList from './components/MentorList';
import MentorFilter from './components/MentorFilter';
import AddMentor from './components/AddMentor';
import './styles.css';

const App = () => {
  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [filter, setFilter] = useState({ 
    specialization: '', 
    location: '', 
    experience: '', 
    available: '' 
  });
  const [showAddForm, setShowAddForm] = useState(false);

  // 👇 API ka base URL env file se aayega
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      const response = await fetch(`${API_URL}/mentors`);
      const data = await response.json();
      setMentors(data);
      setFilteredMentors(data);
    } catch (error) {
      console.error('Error fetching mentors:', error);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    const filtered = mentors.filter(mentor => {
      return (
        (newFilter.specialization ? mentor.specialization.toLowerCase().includes(newFilter.specialization.toLowerCase()) : true) &&
        (newFilter.location ? mentor.location.toLowerCase().includes(newFilter.location.toLowerCase()) : true) &&
        (newFilter.experience ? mentor.experience >= newFilter.experience : true) &&
        (newFilter.available ? mentor.available === (newFilter.available === 'Yes') : true)
      );
    });
    setFilteredMentors(filtered);
  };

  const handleMentorAdded = (newMentor) => {
    setMentors([...mentors, newMentor]);
    setFilteredMentors([...mentors, newMentor]);
    setShowAddForm(false);
  };

  return (
    <div className="app">
      <h1>Mentor Management System</h1>

      {/* Filter sabse upar */}
      <MentorFilter filter={filter} onFilterChange={handleFilterChange} />

      {/* Button centre me */}
      <div className="button-container">
        <button 
          onClick={() => setShowAddForm(!showAddForm)} 
          className="toggle-form-btn"
        >
          {showAddForm ? 'Hide Form' : 'Add New Mentor'}
        </button>
      </div>

      {showAddForm && <AddMentor onMentorAdded={handleMentorAdded} />}

      {/* Mentor List sabse niche */}
      <MentorList mentors={filteredMentors} />
    </div>
  );
};

export default App;
