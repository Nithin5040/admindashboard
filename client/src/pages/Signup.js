import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (existingUsers.some(user => user.email === email)) {
      setError('❌ Email already registered. Please log in.');
      return;
    }

    existingUsers.push({ email, password });
    localStorage.setItem('users', JSON.stringify(existingUsers));

    alert('✅ Signup successful! Please login.');
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <img src="/vishvin.avif" alt="Vishvin Logo" className="logo" />

      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Join Us!</h2>
        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Create a strong password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="btn btn-signup">Sign Up</button>

        <div className="auth-links">
          <p>Already have an account?</p>
          <button type="button" className="btn btn-login" onClick={() => navigate('/login')}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;