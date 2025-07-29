import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            loggedIn ? (
              <HomePage handleAddToCart={handleAddToCart} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/about"
          element={
            loggedIn ? (
              <>
                <NavBar />
                <AboutPage />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/products"
          element={
            loggedIn ? (
              <>
                <NavBar />
                <ProductGallery onAddToCart={handleAddToCart} />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/cart"
          element={
            loggedIn ? (
              <CartPage
                cartItems={cartItems}
                onRemoveFromCart={handleRemoveFromCart}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/checkout"
          element={
            loggedIn ? (
              <CheckoutPage cartItems={cartItems} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            loggedIn ? (
              <Navigate to="/" />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            loggedIn ? (
              <Navigate to="/" />
            ) : (
              <SignupPage />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
