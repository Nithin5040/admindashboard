import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import AdminLogin from './pages/AdminLogin';
import AdminProfile from './pages/AdminProfile';
import DivisionSelection from './pages/DivisionSelection'; // Import the new page
import UserDetailsPage from './pages/UserDetailsPage'; // Import the user details page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
        <Route path="/division-selection" element={<DivisionSelection />} /> {/* New route */}
        <Route path="/user-details" element={<UserDetailsPage />} /> {/* Route for user details */}
      </Routes>
    </Router>
  );
}

export default App;
