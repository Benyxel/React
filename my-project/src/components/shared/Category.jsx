import React from 'react'
import Button from './Button'
import image1 from '../../assets/bm4.png'
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
              <div className='mb-4'>
                <p>tile1</p>
                <p>title2</p>
                <p>title3</p>
                <Button 
                text='Buy4me'
                bgColor={"bg-primary"}
                textColor={"text-white"}
                />
              </div>
            </div>
            
            <img src={image1}
            className='w-320px absolute bottom-0'
            />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Category
