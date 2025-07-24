import React, { useState } from 'react';
import './loginPage.css'

const LoginPage = ({ onLogin, onSignupClick }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (email && password) {
      onLogin()
    } else {
      alert('Please enter valid credentials')
    }
  }

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

        <button type="submit">Login</button>

        <h3 className="signup-text">
          Don't have an account?{' '}
          <button type="button" onClick={onSignupClick}>
            Sign Up!
          </button>
        </h3>
      </form>
    </div>
  )
}

export default LoginPage
