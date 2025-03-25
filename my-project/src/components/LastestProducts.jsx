import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './productItem';

const LastestProducts = () => {
  const { products } = useContext(ShopContext);
  const [LatestGoods, setLatestGoods] = useState([]);

  useEffect(() => {
    setLatestGoods(products.slice(0, 5));
  }, [products]);

  return (
    <div  className='container my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={"LASTEST"} text2={"PRODUCTS"} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Explore our best products now check out more from the shop page
        </p>
      </div>

      {/* Rendering products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {LatestGoods.map((item, index) => (
          <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
        ))}
      </div>
    </div>
  );
};

export default LastestProducts;
