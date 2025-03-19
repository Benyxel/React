import React from 'react'

import HeroSection from '../components/HeroSection'
import Category from '../components/Category'
import Category2 from '../components/Category2'
import NewArrivals from '../components/NewArrivals'
import LastestProducts from '../components/LastestProducts'
import ServicesC from '../components/ServicesC'





const Home = () => {
  return (
    <div>
      
      <HeroSection/>
      <Category/>
      <Category2/>
      <ServicesC/>
      <NewArrivals/>
      <LastestProducts/>
      
    </div>
  )
}

export default Home
