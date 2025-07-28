import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './component0/pages/loginPage';
import SignupPage from './component0/pages/signupPage';
import HeroSection from './component1/HeroSection/HeroSection';
import NavBar from './component1/NavBar/NavBar';
import FeaturedProducts from './component1/FeaturedProducts/FeaturedProducts';
import ProductGallery from './component2/productGallery/productGallery';
import AboutPage from './component5/AboutPage';
import CartPage from './component3/CartPage/CartPage';
import CheckoutPage from './component4/CheckoutPage/CheckoutPage';

function HomePage({ handleAddToCart }) {
  return (
    <>
      <NavBar />
      <HeroSection />
      <FeaturedProducts onAddToCart={handleAddToCart} />
    </>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(() => {
    const saved = localStorage.getItem('vibemart-loggedin');
    return saved === 'true';
  });

  const [showSignup, setShowSignup] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('vibemart-cart');
    return saved ? JSON.parse(saved) : [];
  });

  const handleAddToCart = (product) => {
    const existingIndex = cartItems.findIndex(item => item.id === product.id);
    let updatedCart;

    if (existingIndex !== -1) {
      updatedCart = [...cartItems];
      updatedCart[existingIndex].quantity += 1;
    } else {
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
    }

    setCartItems(updatedCart);
    localStorage.setItem('vibemart-cart', JSON.stringify(updatedCart));
  };

  const handleRemoveFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem('vibemart-cart', JSON.stringify(updatedCart));
  };

  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem('vibemart-loggedin', 'true');
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('vibemart-loggedin');
    localStorage.removeItem('vibemart-cart');
    setCartItems([]);
  };

  const handleShowSignup = () => setShowSignup(true);
  const handleBackToLogin = () => setShowSignup(false);

  if (!loggedIn) {
    return showSignup ? (
      <SignupPage onBackToLogin={handleBackToLogin} />
    ) : (
      <LoginPage onLogin={handleLogin} onSignupClick={handleShowSignup} />
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage handleAddToCart={handleAddToCart} />} />
        <Route path="/about" element={<><NavBar/><AboutPage /></>} />
        <Route
          path="/products"
          element={
            <>
              <NavBar />
              <ProductGallery onAddToCart={handleAddToCart} />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cartItems={cartItems}
              onRemoveFromCart={handleRemoveFromCart}
            />
          }
        />
        <Route
          path="/checkout"
          element={<CheckoutPage cartItems={cartItems} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App