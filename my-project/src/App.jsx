import React from 'react'
import {createRoot} from "react-dom/client"
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import Button from './components/shared/TrackB'
import Category from './components/Category'

 function App() {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <Category
       
      />
    </div>
  )
}

export default App