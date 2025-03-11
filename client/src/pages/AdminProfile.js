import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const AdminProfile = () => {
  const navigate = useNavigate();
  const [loggedUsers, setLoggedUsers] = useState([]);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    if (!isAdmin) {
      alert('❌ Access Denied! Admins only.');
      navigate('/login');
    } else {
      // ✅ Fetch logged-in users when the page loads
      fetchLoggedUsers();
    }
  }, [navigate]);

  // ✅ Function to fetch the latest logged-in users
  const fetchLoggedUsers = () => {
    const loggedInUsers = JSON.parse(localStorage.getItem('loggedUsers')) || [];
    setLoggedUsers(loggedInUsers);
  };

  // ✅ Function to clear only user data but keep admin logged in
  const handleClearData = () => {
    localStorage.removeItem('loggedUsers');
    setLoggedUsers([]);
    alert('✅ All user data has been cleared!');
  };

  // ✅ Function to log out admin
  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  return (
    <div className="auth-container">
      <h2>Admin Dashboard</h2>
      <h3>All Logged-in Users</h3>

      {loggedUsers.length > 0 ? (
        <ul className="user-list">
          {loggedUsers.map((user, index) => (
            <li key={index}>{user.email} - {user.timestamp}</li>
          ))}
        </ul>
      ) : (
        <p>No users logged in yet.</p>
      )}

      <div className="button-group">
        <button className="btn-refresh" onClick={fetchLoggedUsers}>🔄 Refresh Data</button>
        <button className="btn-clear" onClick={handleClearData}>🗑 Clear User Data</button>
        <button className="btn-logout" onClick={handleLogout}>🚪 Logout</button>
      </div>
    </div>
  );
};

export default AdminProfile; 