import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';





const Products = () => {

  const {productsId} =useParams();
  const {products} = useContext(ShopContext);
  const [productsData,setProductsData]= useState(fales)
  
  const fetchProductData = async() =>{
    products.map((item)=>{
      if(item._id===productsId){
        setProductsData(item)
        return null;
      }
    
  })

useEffect(()=>{
  fetchProductData();
},[productsId])

  return (
    <div>
      
      
    </div>
  );
};

export default Products;
