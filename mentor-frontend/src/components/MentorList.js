
import React from 'react';

const MentorList = ({ mentors }) => {
  if (!mentors || mentors.length === 0) {
    return <p>No mentors found.</p>;
  }

  return (
    <div className="mentor-list">
      {mentors.map((mentor, index) => (
        <div key={mentor.id || index} className="mentor-card">
          <h3>{mentor.name || 'Unnamed'}</h3>
          <p><strong>Specialization:</strong> {mentor.specialization || 'N/A'}</p>
          <p><strong>Experience:</strong> {mentor.experience ?? 'N/A'} years</p>
          <p><strong>Location:</strong> {mentor.location || 'N/A'}</p>
          <p><strong>Available:</strong> {mentor.available ? 'Yes' : 'No'}</p>
        </div>
      ))}
    </div>
  );
};

export default MentorList;
