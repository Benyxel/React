import React from 'react'
import Button from './Button'
import image1 from '../../assets/bm4.png'
import image2 from '../../assets/sh1.png'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Category = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  

  return (
    <div className='py-8'>
      <div className='container'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>

          <div className='py-10 pl-5 bg-gradient-to-br from-black/90 to-black/70 text-white rounded-3xl relative h-[320px] flex items-end'> 
            <div>
              {/* Buy for me card */}
              <div className='mb-4'>
                <p className='mb-[0px] font-bold  text-gray-400'>Need help to order from</p>
                <p className='text-2xl font-semibold mb-[0px]'>China</p>
                <p className='text-4xl xl:text-5xl font-bold opacity-20 mb-8'>Buy for me</p>
                <Button 
                text='Buy4me'
                bgColor={"bg-primary"}
                textColor={"text-white"}
                />
              </div>
            </div>
          
            <img  src={image1}
            className='w-320px absolute bottom-0 '
            />
          </div>

          {/* sourcing card */}
          <div className='py-10 pl-5 bg-gradient-to-br from-[green]/90 to-[red] text-white rounded-3xl relative h-[320px] flex items-end'> 
            <div>
              {/* Buy for me card */}
              <div className='mb-4'>
                <p className='mb-[0px] font-bold  text-gray-400'>Need help to order from</p>
                <p className='text-2xl font-semibold mb-[0px]'>China</p>
                <p className='text-4xl xl:text-5xl font-bold opacity-20 mb-8'>Buy for me</p>
                <Button 
                text='Buy4me'
                bgColor={"bg-primary"}
                textColor={"text-white"}
                />
              </div>
            </div>
          
            <img  src={image2}
            className='w-320px absolute bottom-0'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category
