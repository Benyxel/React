import React from 'react'
import Button from './Button'
import image1 from '../../assets/bm4.png'
const Category = () => {
  return (
    <div className='py-8'>
      <div className='container'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>

          <div className='py-10 pl-5 bg-gradient-to-br from-black/90 to-black/70 text-white rounded-3xl relative h-[320px] flex items-end'> 
            <div>
              <div className='mb-4'>
                <p>tile1</p>
                <p>title2</p>
                <p>title3</p>
                <Button 
                text='Buy4me'
                bgColor={"bg-primary"}
                textColor={"text-white"}
                />
              </div>
            </div>
            <img src={image1}
            className='w-320px absolute bottom-0'
            />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Category
