import React from 'react';

import HeroSection from '../components/HeroSection';
import Category from '../components/Category';
import Category2 from '../components/Category2';
import NewArrivals from '../components/NewArrivals';
import LastestProducts from '../components/LastestProducts';
import ServicesC from '../components/ServicesC';
import Banner from '../components/Banner';
import bimg1 from '../assets/bimg1.png';

const BannerData = {
  rate: "200$",
  title: "Fine Smile",
  date: "10 jan to jan",
  image: bimg1,
  title2: "Air Solo Bass",
  title3: "Winter Sale",
  bgColor: "#f42c37" ,// Add a background color if needed
};

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Category />
      <Category2 />
      <ServicesC />
      <Banner data={BannerData} />
      <NewArrivals />
      <LastestProducts />
    </div>
  );
};

export default Home;

