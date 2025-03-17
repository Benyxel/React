import React from 'react'

const NewArrivals = () => {
  return (
    <div className=' flex flex-col sm:flwx-row border border-primary m-10'>
        {/* hero left side */}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
            <div className='text-primary'>
                <div className='flex items-center gap-2'>
                    <p className='w-8 md:w-11 h-[3px] bg-primary'></p>
                    <p className='font-medium text-sm md:text-base '>Our Best Products</p>
                </div>
                    <h1 className='text-3xl sm:py-3 lg:text-5xl leading-relaxed'>New Arrivals</h1>
                <div className='flex items-center gap-2'>
                    <p className='font-sembold text-sm md:text-base'> SHOP NOW</p>
                    <p className='w-8 md:w-11 h-[2px] bg-primary mb-2'></p>
                </div>
                
            </div>
        </div>
 {/* hero rightside */}
        <div>
            <img className='w-full sm:1/2' src=''alt="" />
        </div>
    </div>
  )
}

export default NewArrivals
