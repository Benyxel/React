import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { RxDropdownMenu } from "react-icons/rx";

const Shop = () => {

  const { products}= useContext (ShopContext)
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className=' container flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      <div className=' min-w-60'>
        <p  className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img src={<RxDropdownMenu />} alt="" />
        </p>

        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" :"hidden"} sm:block` }>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>

          {/* all categories */}

          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className=' w-3' type="checkbox" value={'Men'}/>Men
            </p>

            <p className='flex gap-2'>
              <input className=' w-3' type="checkbox" value={'Women'}/>Women
            </p>

            <p className='flex gap-2'>
              <input className=' w-3' type="checkbox" value={'Kids'}/>Kids
            </p>
          </div>
        </div>

      {/* sub categories */}

        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" :"hidden"} sm:block` }>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className=' w-3' type="checkbox" value={'Mouse'}/>Mouse
            </p>

            <p className='flex gap-2'>
              <input className=' w-3' type="checkbox" value={'Droin'}/>Droin
            </p>

            <p className='flex gap-2'>
              <input className=' w-3' type="checkbox" value={'Phone'}/>Phone
            </p>
          </div>
        </div>
      </div>

      
      
    </div>
  )
}

export default Shop
