import React from 'react'
import Button from './shared/Button'
import TrackB from './shared/TrackB'
import Buy4meB from './shared/Buy4meB'
import image1 from './../assets/bm4.png'
import image2 from './../assets/sh1.png'



const Category = () => {

  return (
    <div className='py-10'>
      <div className='container'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>

          <div className=' py-10 pl-5 bg-gradient-to-br from-black/90 to-black/70 text-white rounded-3xl relative h-[320px] flex items-end'> 
            <div>
              {/* Buy for me card */}
              <div className='mb-4'>
                <p className='mb-[0px] font-bold  text-gray-400'>Need help to order from</p>
                <p className='text-2xl font-semibold mb-[30px]'>China?</p>
                <p className='text-4xl xl:text-5xl font-bold opacity-20 mb-10'>Buy for me Service</p>
                <Buy4meB 
                text='Buy4me'
                bgColor={"bg-green-700"}
                textColor={"text-white"} 
                />
              </div>
            </div>
          
            <img  src={image1}
            className='w-320px absolute bottom-0   '
            />
          </div>

          {/* shipping card */}
          <div className=' py-10 pl-5 bg-gradient-to-br from-[#210202] to-[#9e0e2b] text-white rounded-3xl relative h-[320px] flex items-end'> 
            <div>
              {/* Buy for me card */}
              <div className='mb-4'>
                <p className='mb-[0px] font-bold  text-gray-400'>Shipping to ship from china to</p>
                <p className='text-2xl font-semibold mb-[30px]'>Ghana</p>
                <p className='text-4xl xl:text-5xl font-bold opacity-20 mb-10'>Shipping to GH</p>
                <TrackB 
                text='Track your Order' 
                bgColor={"bg-primary"}
                textColor={"text-white"}
                />
              </div>
            </div>
            <img  src={image2}
            className='w-320px absolute bottom-0 mx-10'
            />
          </div>

          {/* sourcing card */}
          <div className='py-10 pl-5 bg-gradient-to-br from-[#f39c45] to-[#ff7e15] text-white rounded-3xl relative h-[320px] flex items-end'> 
            <div>
              <div className='mb-4'>
                <p className='mb-[0px] font-bold  text-white'>Need help to order from</p>
                <p className='text-2xl font-semibold mb-[30px]'>China?</p>
                <p className='text-4xl xl:text-5xl font-bold opacity-20 mb-10'>Sourcing</p>
                <Buy4meB 
                text='Buy4me'
                bgColor={"bg-green-700"}
                textColor={"text-white"} 
                />
              </div>
            </div>
            <img  src={image1}
            className='w-320px absolute bottom-0'
            />

        </div>
      </div>
    </div>
    </div>
  )
}

export default Category
