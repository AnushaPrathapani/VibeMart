import React, { useState } from 'react';
import './SignupPage.css';

function SignupPage({ onBackToLogin }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('vibemart-users') || '[]');

    const userExists = users.some((user) => user.email === email);
    if (userExists) {
      setError('User already exists!');
      return;
    }
    if (password !== repeatPassword) {
      setError("Passwords don't match!");
      return;
    }

    const newUser = { firstName, lastName, email, password };
    users.push(newUser);
    localStorage.setItem('vibemart-users', JSON.stringify(users));
    alert('Account created successfully!');
    onBackToLogin(); 
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignup}>
        <h1>Create an Account</h1>
        <label>First Name:</label>
        <input
          type="text"
          placeholder="Enter First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <label>Last Name:</label>
        <input
          type="text"
          placeholder="Enter Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <label>Email Id:</label>
        <input
          type="email"
          placeholder="Enter Email"
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
        <label>Repeat Password:</label>
        <input
          type="password"
          placeholder="Repeat Password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          required
        />
        <button className="signup-text" type="submit">
          Sign Up
        </button>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </form>
    </div>
  );
}

export default SignupPage;
