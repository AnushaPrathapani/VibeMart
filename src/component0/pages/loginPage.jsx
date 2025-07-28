import React, { useState } from 'react';
import './loginPage.css';

const LoginPage = ({ onLogin, onSignupClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('vibemart-users') || '[]');
    const userMatch = users.find(
      (user) => user.email === email && user.password === password
    );

    if (userMatch) {
      onLogin(); 
    } else {
      setError('Invalid email or password!');
    }
  };

  return (
    <div className="container">
      <form className="login-form" onSubmit={handleLogin}>
        <h1>Login to your account</h1>

        <label>Email Id:</label>
        <input
          type="email"
          placeholder="Enter Username / Email Id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="login-btn" type="submit">
          Login
        </button>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        <p className="signup-text">
          Don't have an account?{' '}
          <span className="signup-link" onClick={onSignupClick}>
            Sign Up!
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
