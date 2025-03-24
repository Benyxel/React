import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const LastestProducts = () => {
    const { products } = useContext(ShopContext)
    const [LatestGoods,setlatestGoods]= useState([]);

    useEffect(()=> {
        setlatestGoods(products.slice(0,5))
    },[])

    return (
        <div className='my-10'>
           <div className='text-center py-8 text-3xl'>
            <Title text1={"LASTEST"} text2={"PRODUCTS"}/>
            <p className=' w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Explore our best porducts now check out more from the shop page </p>
           </div>

           
        </div>
    )
}

export default LastestProducts
