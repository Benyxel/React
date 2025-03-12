import React from 'react'
import Slider from "react-slick";

const HeroSlide =[
    {
      id:1,
      img: bm2
    }

]

function HeroSection() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 4000,
        cssEase: "ease-in-out",
        pauseOnFocus: true,
        pauseOnHocus: false,

      };
  return (
    <div >
        {/* Hero Sec */}
        <div className='w-full'>
       <Slider {...settings}>
       <div className='w-full'>
        <h3>1</h3>
      </div  >
      <div className='w-full'>
        <h3>2</h3>
      </div>
      <div className='w-full'>
        <h3>3</h3>
      </div>
      <div className='w-full'>
        <h3>4</h3>
      </div>
      <div className='w-full'>
        <h3>5</h3>
      </div>
      <div className='w-full'>
        <h3>6</h3>
      </div>
       </Slider>
        </div>
    </div>
  )
}

export default HeroSection