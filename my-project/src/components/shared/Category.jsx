import React from 'react'
import Button from './Button'
import image1 from '../../assets/bm4.png'
import image2 from '../../assets/sh1.png'


const Category = () => {

  return (
    <div className='py-8'>
      <div className='container'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>

          <div className='py-10 pl-5 bg-gradient-to-br from-black/90 to-black/70 text-white rounded-3xl relative h-[320px] flex items-end'> 
            <div>
              {/* Buy for me card */}
              <div className='mb-4'>
                <p className='mb-[0px] font-bold  text-gray-400'>Need help to order from</p>
                <p className='text-2xl font-semibold mb-[0px]'>China?</p>
                <p className='text-4xl xl:text-5xl font-bold opacity-20 mb-8'>Buy for me Service</p>
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
          <div className='py-10 pl-5 bg-gradient-to-br from-[#210202] to-[#9e0e2b] text-white rounded-3xl relative h-[320px] flex items-end'> 
            <div>
              {/* Buy for me card */}
              <div className='mb-4'>
                <p className='mb-[0px] font-bold  text-gray-400'>Need a Shipping to ship from china to</p>
                <p className='text-2xl font-semibold mb-[0px]'>Ghana?</p>
                <p className='text-4xl xl:text-5xl font-bold opacity-20 mb-8'>Shipping to GH</p>
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
