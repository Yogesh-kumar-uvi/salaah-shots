// src/components/MentorFilter.js
import React, { useState, useEffect } from 'react';

const MentorFilter = ({ filter, onFilterChange }) => {
  const [localFilter, setLocalFilter] = useState(filter);

  // Keep local filter in sync with parent
  useEffect(() => {
    setLocalFilter(filter);
  }, [filter]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilter = { ...localFilter, [name]: value };
    setLocalFilter(newFilter);
    onFilterChange(newFilter);
  };

  return (
    <div className="mentor-filter">
      <input
        type="text"
        name="specialization"
        placeholder="Specialization"
        value={localFilter.specialization}
        onChange={handleChange}
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={localFilter.location}
        onChange={handleChange}
      />
      <input
        type="number"
        name="experience"
        placeholder="Years of Experience"
        value={localFilter.experience}
        onChange={handleChange}
        min="0"
      />
      <select
        name="available"
        value={localFilter.available}
        onChange={handleChange}
      >
        <option value="">Availability</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </div>
  );
};

export default MentorFilter;
