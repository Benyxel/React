import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { IoMdArrowDropdown } from "react-icons/io";
import Title from '../components/Title';
import ProductItem from '../components/productItem';

const Shop = () => {

  const { products, search, showSearch } = useContext(ShopContext);

  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [sortType, setSortType] = useState('relavent');
  const [showTrending, setShowTrending] = useState(false); // State for trending products

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    if (subCategory.includes(value)) {
      setSubCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setSubCategory((prev) => [...prev, value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.type));
    }

    if (showTrending) {
      productsCopy = productsCopy.filter(item => item.trending); // Filter trending products
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = async () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, showTrending]); // Add showTrending to dependencies

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className='container flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          FILTERS
          <IoMdArrowDropdown className={`h-5 sm:hidden  ${showFilter ? 'rotate-180' : ''}`} />
        </p>

        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700 dark:text-white'>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Gadget'} onChange={toggleCategory} />Gadget
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Kitchen'} onChange={toggleCategory} />Kitchen
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Wear'} onChange={toggleCategory} />Wear
            </p>
          </div>
        </div>

        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700 dark:text-white'>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Mouse'} onChange={toggleSubCategory} />Mouse
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Droin'} onChange={toggleSubCategory} />Droin
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Phone'} onChange={toggleSubCategory} />Phone
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Footwear'} onChange={toggleSubCategory} />Footwear
            </p>
          </div>
        </div>
      </div>

      <div className='flex-1'>
        <button
              className={`px-4 py-2 mb-4 border rounded ${showTrending ? 'bg-primary text-white' : 'bg-gray-200 text-black'}`}
              onClick={() => {
                setShowTrending(!showTrending); // Toggle trending products
                applyFilter(); // Reapply the filter
              }}
            >
              {showTrending ? 'Show All Products' : 'Show Trending Products'}
        </button>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'PRODUCTS'} />


          <div className='flex gap-4'>
           
            <select
              className='border-2 border-gray-300 text-sm px-2 dark:text-black'
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value='relevant'>Sort by: Relevant</option>
              <option value='low-high'>Sort by: Low to High</option>
              <option value='high-low'>Sort by: High to Low</option>
            </select>
          </div>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.length > 0 ? (
            filterProducts.map((item, index) => (
              <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))
          ) : (
            <p className='text-center text-gray-500 col-span-4'>
              No products match your search or filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
