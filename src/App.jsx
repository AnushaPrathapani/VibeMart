import React, { useState } from 'react';
import './App.css';
import LoginPage from './component0/pages/loginPage';
import SignupPage from './component0/pages/signupPage';
import NavBar from './component1/NavBar/NavBar';
import HeroSection from './component1/HeroSection/HeroSection';
import FeaturedProducts from './component1/FeaturedProducts/FeaturedProducts';
import ProductGallery from './component2/productGallery/productGallery';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true)
  }
  const handleShowSignup = () => {
    setShowSignup(true)
  }
  const handleBackToLogin = () => {
    setShowSignup(false)
  };
  return (
    <div className="app">
      {!loggedIn ? (
        showSignup ? (
          <SignupPage onBackToLogin={handleBackToLogin} />
        ) : (
          <LoginPage onLogin={handleLogin} onSignupClick={handleShowSignup} />
        )
      ) : (
        <>
          <NavBar />
          <HeroSection />
          <FeaturedProducts />
          <ProductGallery />
        </>
      )}
    </div>
  );
}

export default App;
