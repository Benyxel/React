import React from 'react'
import Slider from "react-slick";
const HeroData =[
  { id: 1, src: '/src/assets/bm2.jpg', alt: 'Slide 1',
    subtile:"subtitle of the slide 1",
    title:"title of the slide 1",
    description:"Description of the slide 1",
   },


  { id: 2, src: '/src/assets/bm3.jpg', alt: 'Slide 2',
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
        pauseOnHocus: false,

      };
      return (
        <div>
          {/* Hero Sec */}
          <div className='w-full'>
            <Slider {...settings}>
              {HeroData.map((data) => (
                <div key={data.id}>
                  <div className='grid grid-cols-1 md:grid-cols-2'>
                    <div>
                      <h1>{data.subtile}</h1>
                      <h1>{data.title}</h1>
                      <p>{data.description}</p>

                      <button >
                        Shop Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      );
    }
    

export default HeroSection