import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import Category from '../components/Category'
import Category2 from '../components/Category2'


const home = () => {
  return (
    <div>
      <HeroSection/>
      <Category/>
      <Category2/>
    </div>
  )
}

export default home
