import { useState } from 'react'
import './App.css'
import { NavBar } from './component1/NavBar/NavBar'
import HeroSection from './component2/HeroSection/HeroSection'
import FeaturedProducts from './component3/FeaturedProducts/FeaturedProducts'

function App() {
  return (
    <>
    <NavBar/>
    <HeroSection/>
    <FeaturedProducts/>
    </>
  )
}

export default App
