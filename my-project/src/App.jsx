import React from 'react'
import {createRoot} from "react-dom/client"
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import Button from './components/shared/Button'

 function App() {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      
    </div>
  )
}

export default App