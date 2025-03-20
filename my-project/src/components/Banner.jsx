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
      <div className=' container' style={{backgroudColor: data.bgColor}}>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-white rounded-2xl'>

        <div>
           <p>{data.rate}</p>
           <h1>{data.title}</h1>
        </div>
        <div>
            <p>{data.date}</p>
            <h1>{data.title2}</h1>
          </div>
          <div>
            <img src={data.image} alt={data.title3} />
            <h1>{data.title3}</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
