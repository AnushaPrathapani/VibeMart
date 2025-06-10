import React from 'react'
import './NavBar.css'
import logo from '../assets/VibeMart.png'
export const NavBar = () => {
  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt="VibeMart logo" />
        </div>
        <ul className="nav-menu">
            <li>Home</li>
            <li>Products</li>
            <li>Cart</li>
            <li>Checkout</li>
            <li>About</li>
        </ul>
    </div>
  )
}
