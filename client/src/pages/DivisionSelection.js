import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import tempDatabase from './tempDatabase'; // Import the temporary database

const DivisionSelection = () => {
  const [division, setDivision] = useState('');
  const [subDivision, setSubDivision] = useState('');
  const [error, setError] = useState('');
  const [userDetails, setUserDetails] = useState(null); // State to store user details
  const navigate = useNavigate();

  // Debug: Log the entire database
  console.log('Temporary Database:', tempDatabase);

  // Get unique divisions from the database
  const divisions = [...new Set(tempDatabase.map(user => user.division))];
  console.log('Divisions:', divisions); // Debug: Check if divisions are populated

  // Get sub-divisions based on the selected division
  const subDivisions = division
    ? [...new Set(tempDatabase.filter(user => user.division === division).map(user => user.subDivision))]
    : [];
  console.log('Sub-Divisions:', subDivisions); // Debug: Check if sub-divisions are populated

  // Fetch user details when division and sub-division are selected
  useEffect(() => {
    if (division && subDivision) {
      const selectedUser = tempDatabase.find(
        user => user.division === division && user.subDivision === subDivision
      );
      setUserDetails(selectedUser || null);
    }
  }, [division, subDivision]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!division || !subDivision) {
      setError('❌ Please select both division and sub-division.');
      return;
    }

    // Save selected division and sub-division to localStorage or state management
    localStorage.setItem('selectedDivision', division);
    localStorage.setItem('selectedSubDivision', subDivision);

    alert('✅ Division and Sub-Division selected successfully!');
    navigate('/user-details', { state: { userDetails } }); // Pass user details to the new page
  };

  return (
    <div className="auth-container">
      <img src="/vishvin.avif" alt="Vishvin Logo" className="logo" />
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Select Division and Sub-Division</h2>

        <div className="form-group">
          <select
            value={division}
            onChange={(e) => setDivision(e.target.value)}
            required
            className="auth-form-input"
          >
            <option value="">Select Division</option>
            {divisions.map((div, index) => (
              <option key={index} value={div}>
                {div}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <select
            value={subDivision}
            onChange={(e) => setSubDivision(e.target.value)}
            required
            className="auth-form-input"
          >
            <option value="">Select Sub-Division</option>
            {subDivisions.map((subDiv, index) => (
              <option key={index} value={subDiv}>
                {subDiv}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="error-message">{error}</p>}

        {/* Changed button text from "Submit" to "Proceed" */}
        <button type="submit" className="btn btn-login">
          Proceed
        </button>
      </form>

      {userDetails && (
        <div className="user-details">
          <h3>User Details</h3>
          <p>User ID: {userDetails.userid}</p> {/* Update to use userid instead of id */}
          <p>Name: {userDetails.name}</p>
          <p>Location: {userDetails.location}</p>
        </div>
      )}
    </div>
  );
};

export default DivisionSelection;
