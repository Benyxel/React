import React from 'react'
import Slider from "react-slick";
import Button from './shared/Button';


const HeroData =[
  { id: 1, src: '/src/assets/HeroS1.png', alt: 'Slide 1',
    subtile:"Logisctic Services",
    title:"Fofoofo Imports",
    description:"Ship goods from China to Ghana",
   },


  { id: 2, src: '/src/assets/heros2.png', alt: 'Slide 2',
    subtile:"Buy for me",
    title:"Fofoofo Imports",
    description:"let's buy for you FROM CHINA",
  },
  { id: 3, src: '/src/assets/rmbi.png', alt: 'Slide 3',
    subtile:"Paying Suppliers",
    title:"Fofoofo Imports",
    description:"RMB Trading MADE EASY",
   },
  { id: 4, src: '/src/assets/store.png', alt: 'Slide 4' ,
    subtile:"Wholesale-Products",
    title:"Buy&Sell",
    description:"Buy Goods at cheaper prices",
  },
  
 
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
        pauseOnHover: false,
        autoplay: true,
        arrows: false,

      };
      return (
        <div className='container'>
          {/* Hero Sec */}
          <div className='overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color flex justify-center items-center flex-row '>
            <div className='container pb-8 sm:pb-0'>
              <Slider {...settings}>
                {HeroData.map((data) => (
                  <div key={data.id}>
                    <div className='grid grid-cols-1 md:grid-cols-2'>
                      <div className='flex flex-col justify-center gap-4 sm:pl-3 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10'>
                        <h1 className='text-2xl sm:text-6xl lg:text-2xl font-bold'>{data.subtile}</h1>
                        <h1 className=' text-5xl sm:text-6xl lg:text-7xl font-bold'>{data.title}</h1>
                        <h1 className='text-5xl uppercase text-[#d6247a] dark:text-white/5 sm:text-[80px] md:text-[100px]xl:text-[150px] font-bold'>{data.description}</h1>
                        <div>
                          
                          <Button
                              
                              text='Shop Now'
                              bgColor='bg-primary'
                              textColor='text-white'
                          />
                          
                        </div>
                  
                      </div>
                      <div className='order-1 sm:order-2' >
                      <div className='flex justify-center'>
                        <img
                          src={data.src}
                          alt={data.alt}
                          className='w-[300px] h-[300px] sm:h-[550px] sm:w-[400px] sm:scale-105 lg:scale-110 object-contain mx-auto drop-shadow-[-8px_4px_6px_rgba(0,0,0,.4)] relative z-40'
                        />
                      </div> 
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      );
    }

export default HeroSection