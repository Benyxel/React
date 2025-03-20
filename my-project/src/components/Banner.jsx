import React from 'react'
import bimg1 from '../assets/bimg1.png'

const BannerData = {
    rate: "200$",
    title: "Fine Smile",
    date: "10 jan to jan",
    image: bimg1,
    title2: "Air Solo Bass",
    title3: "Winter Sale",

}


const Banner = ({data}) => {
  return (
    <div className='min-h-[550px] flex justify-center items-center py-12'>
      <div className=' container'>
        <div style={{backgroundColor: data.bgColor}} className='grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-white rounded-2xl'>

        <div className='p-6 sm:p-8'>
           <p className='text-sm'>{data.rate}</p>
           <h1 className='uppercase text-4xl lg:text-7xl font-bold'>{data.title}</h1>
           <p className='text-sm'>{data.date}</p>
        </div>
         
         <div>
            <img src={data.image} alt={"hsd"}/>
         </div>
          
           
        </div>
      </div>
    </div>
  )
}

export default Banner
