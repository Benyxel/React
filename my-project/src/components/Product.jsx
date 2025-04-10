import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { FaStar } from "react-icons/fa6";
import RelatedProducts from './RelatedProducts';


const Product = () => {

  const {productId} = useParams();
 const {products,currency,addToCart} =useContext(ShopContext);
 const [productData,setProductData] = useState(false)
 const [image,setImage] = useState('')
 const [size,setSize] = useState('')

 const fetchProductData = async () => {
  products.forEach((item) => {
    if (item._id === Number(productId)) { // Convert productId to a number
      setProductData(item);
      setImage(item.image[0]);
    }
  });
 };

 useEffect(() => {
  fetchProductData();
}, [productId, products])

  return productData? (


    <div className='container pb-4 border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 '>
      {/* product data */}
      <div className=' flex gap-12 sm:gap-12 flex-col sm:flex-row'>

    {/* product images */}
    <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row p-5 rounded-md bg-brandWhite' >
      <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full '>
        {
          productData.image && productData.image.length > 0 ? (
            productData.image.map((item, index) => (
              <img
                onClick={()=>setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer rounded-md "
                alt=""
              />
            ))
          ) : (
            <p>No images available</p>
          )
        }
      </div>

      <div className='w-full sm:-[80%]'>
        <img className='w-full h-auto rounded-2xl' src={image} alt="" />
      </div>
    </div>
        {/* products info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2 '>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
          <FaStar className='text-[#ff5e00]' />
          <FaStar className='text-[#ff5e00]' />
          <FaStar className='text-[#ff5e00]' />
          <FaStar className='text-[#ff5e00]' />
          <FaStar className='text-[#f79d5ca2]' />
          <p className='pl-2'>(65)</p>
          </div>


          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-7'> {productData.description}</p>
          
            <div className='flex flex-col gap-4 my-8'>
              <p>Select Size/ Color</p>
              <div className='flex gap-2'>
              {productData.sizes.map((item,index)=>(
                  <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-brandBlue text-white rounded hover:bg-brandYellow ${item === size ? 'bg-brandYellow': ''}`} key={index}>{item}</button>
                ))}
              </div>
            </div>
                  {/* cart-btn */}
                <button onClick={()=>addToCart(productData._id,size)} className='bg-brandGreen text-white px-8 py-3 text-sm active:bg-gray-700' >ADD TO CART</button>
                <hr className='mt-8 sn:w-4/5' />
                <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                  <p>100% Original Product.</p>
                  <p>Fast Delivey within 24hrs. </p>
                  <p>Easy return and exchange policy within 2 days.</p>

                </div>
        </div>
      </div>

      {/* description AND review section*/}
      <div className='mt-20'>
          <div className='flex'>
            <b className='border px-5 py-3 text-sm' >Description</b>
            <p className='border px-5 py-3 text-sm'>Reviews(65)</p>
          </div>
          <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
                <p>jhvjxhvjvxhjxvhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
          </div>
      </div>

      {/* RELATED PRODUCTS */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>

    </div>
  ): <div className='opacity-0'></div>
}

export default Product
