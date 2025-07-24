import React from 'react'
import './SignupPage.css'

function SignupPage() {
  return (
    <div className='main-container'>
      <form className='signup-form'>
        <h1>Create an Account</h1>
        <label>First Name:</label>
        <input type="text" placeholder="Enter First Name" required/>
        <label>Last Name:</label>
        <input type="text" placeholder="Enter Last Name" required/>
        <label>Email Id:</label>
        <input type="email" placeholder="Enter Email" required/>
        <label>Password:</label>
        <input type="password" placeholder="Enter Password" required/>
        <label>Repeat Password:</label>
        <input type="password" placeholder="Repeat Password" required/>
        <button className='signup-text' type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default SignupPage