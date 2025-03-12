import React from 'react'
import Slider from "react-slick";
const HeroData =[
  { id: 1, src: '/src/assets/HeroS1.png', alt: 'Slide 1',
    subtile:"subtitle of the slide 1",
    title:"title of the slide 1",
    description:"Description of the slide 1",
   },


  { id: 2, src: '/src/assets/heros2.jpg', alt: 'Slide 2',
    subtile:"subtitle of the slide 2",
    title:"title of the slide 2",
    description:"Description of the slide 2",
  },
  { id: 3, src: '/src/assets/bm4.jpg', alt: 'Slide 3',
    subtile:"subtitle of the slide 3",
    title:"title of the slide 3",
    description:"Description of the slide 3",
   },
  { id: 4, src: '/src/assets/bm5.jpg', alt: 'Slide 4' ,
    subtile:"subtitle of the slide 4",
    title:"title of the slide 4",
    description:"Description of the slide 4",
  },
  { id: 5, src: '/src/assets/bm6.jpg', alt: 'Slide 5',
    subtile:"subtitle of the slide 5",
    title:"title of the slide 5",
    description:"Description of the slide 5",
   },
  { id: 6, src: '/src/assets/bm7.jpg', alt: 'Slide 6', 
    subtile:"subtitle of the slide 6",
    title:"title of the slide 6",
    description:"Description of the slide 6",
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

      };
      return (
        <div className='container'>
          {/* Hero Sec */}
          <div className='overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color flex justify-center items-center'>
            <div className='container pb-8 sm:pb-0'>
              <Slider {...settings}>
                {HeroData.map((data) => (
                  <div key={data.id}>
                    <div className='grid grid-cols-1 md:grid-cols-2'>
                      <div className='flex flex-col justify-center gap-4 sm:pl-3 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10'>
                        <h1 className='text-2xl sm:text-6xl lg:text-2xl font-bold'>{data.subtile}</h1>
                        <h1 className=' text-5xl sm:text-6xl lg:text-7xl font-bold'>{data.title}</h1>
                        <h1 className='text-5xl uppercase text-[Green] dark:text-white/5 sm:text-[80px] md:text-[100px]xl:text-[150px] font-bold'>{data.description}</h1>
                        <div> <button >Shop Now</button></div>
                      </div>
                      <div className='order-1 sm:order-2' >
                      <div className='flex justify-center'>
                        <img
                          src={data.src}
                          alt={data.alt}
                          className='w-[900px] h-[300px] sm:h-[450px] sm:scale-105 lg:scale-110 object-contain mx-auto drop-shadow-[-8px_4px_6px_rgba(0,0,0,.4)] relative z-40'
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