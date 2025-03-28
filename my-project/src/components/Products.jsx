import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';





const Products = () => {

  const {productsId} =useParams();
  const {products} = useContext(ShopContext);
  const [productsData,setProductsData]= useState(false)
  const [image,setImage] = useState('')
  const fetchProductData = async() =>{
    products.map((item)=>{
      if(item._id===productsId){
        setProductsData(item)
        setImage(item.image[0])
        return null;
      }
    })
  }

useEffect(()=>{
  fetchProductData();
},[productsId])

  return productsData ?(
    <div className=''>
      
      
    </div>
  ) : <div className='opacity-0'>

      </div>
};

export default Products;
