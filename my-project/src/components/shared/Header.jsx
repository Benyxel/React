import React from 'react'

const Header = ({title, subtitle}) => {
  return (
    <div className='text-center mb-10w-[600px] mx-auto space-y-1 '>
     <h1 className='text-3xl font-bold lg:text '>{title}</h1>
     <p className=' text-sm text-gray-400'>{subtitle}</p>
    </div>
  )
}

export default Header
