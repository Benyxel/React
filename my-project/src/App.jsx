import React from 'react'
import {createRoot} from "react-dom/client"
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import Button from './components/shared/TrackB'
import Category from './components/Category'
import Category2 from './components/Category2'

 function App() {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <Category/>
      <Category2/>
    </div>
  )
}

export default App