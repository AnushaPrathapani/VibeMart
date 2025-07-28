import React, { useState } from 'react';
import './navBar.css';
import logo from './assets/VibeMart.png';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false); 

  const handleLogout = () => {
    localStorage.removeItem('vibemart-loggedin');
    localStorage.removeItem('vibemart-cart');
    navigate('/');
    window.location.reload();
  };

  const toggleLogout = () => {
    setShowLogout((prev) => !prev);
  };

  return (
    <div className='navbar'>
      <div
        className="nav-logo"
        onClick={toggleLogout}
        style={{ position: 'relative', cursor: 'pointer' }}
      >
        <img src={logo} alt="VibeMart logo" />
        {showLogout && (
          <div className="logout-dropdown">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>

      <ul className="nav-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/checkout">Checkout</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </div>
  );
};

export default NavBar;
