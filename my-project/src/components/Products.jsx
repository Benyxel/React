import React from 'react';
import Header from './shared/Header';
import img from '../assets/products/pro1.jpg';
import ProductCard from './ProductCard';

const ProductData = [
  {
    id: 1,
    img: img,
    title: "Mouse",
    price: "120",
    aosDelay: "0"
  },

  {
    id: 2,
    img: img,
    title: "Mouse",
    price: "120",
    aosDelay: "0"
  },
];

const Products = () => {
  return (
    <div>
      <div className='container'>
        <Header title="Our Products" subtitle="Explore Our Products" />
        {ProductData.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
