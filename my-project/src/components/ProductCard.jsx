import React from 'react';

const ProductCard = ({ data }) => {
  return (
    <div className='mb-10 mt-[35px] flex flex-col items-center '>
      <div>
        <img src={data.img} alt={data.title} className='[h-230px] w-[260px] object-cover rounded-md' />
      </div>
      <div className='mt-4 text-center'>
        <h2 className='text-lg font-bold'>{data.title}</h2>
        <p className='text-gray-500'>₵{data.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
