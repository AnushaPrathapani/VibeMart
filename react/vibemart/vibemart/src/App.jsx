import React from 'react'
import './App.css'
import NavBar from './component1/NavBar/NavBar'
import HeroSection from './component1/HeroSection/HeroSection'
import FeaturedProducts from './component1/FeaturedProducts/FeaturedProducts'

function App() {
  return (
    <div className='app'>
    <NavBar/>
    <HeroSection/>
    <FeaturedProducts/>
    </div>
  )
}

export default App
