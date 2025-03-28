import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { IoMdArrowDropdown } from "react-icons/io";
import Title from '../components/Title';
import ProductItem from '../components/productItem';

const Shop = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  const [filterProducts, setShowFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [SubCategory, setSubCategory] = useState([]);
  const [sortOption, setSortOption] = useState('relevant'); // State for sorting

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    if (SubCategory.includes(value)) {
      setSubCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setSubCategory((prev) => [...prev, value]);
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value); // Update the selected sorting option
  };

  const showTrendingProducts = () => {
    if (filterProducts.length > 0 && filterProducts.every(product => product.trending)) {
      // If currently showing trending products, reset to all products
      setShowFilterProducts(products);
    } else {
      // Otherwise, filter for trending products
      setShowFilterProducts(products.filter(product => product.trending));
    }
  };

  useEffect(() => {
    let filtered = products.filter((product) => {
      const matchesCategory = category.length === 0 || category.includes(product.category);
      const matchesSubCategory = SubCategory.length === 0 || SubCategory.includes(product.type);
      return matchesCategory && matchesSubCategory;
    });

    // Apply sorting logic
    if (sortOption === 'low-high') {
      filtered = filtered.sort((a, b) => a.price - b.price); // Sort by price (low to high)
    } else if (sortOption === 'high-low') {
      filtered = filtered.sort((a, b) => b.price - a.price); // Sort by price (high to low)
    }

    setShowFilterProducts(filtered);
  }, [category, SubCategory, products, sortOption]); // Re-run when sorting option changes

  useEffect(() => {
    setShowFilterProducts(products);
  }, [products]);

  useEffect(() => {
    setShowFilterProducts(products);
  }, []);

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
              <input className='w-3' type='checkbox' value={'Footr'} onChange={toggleSubCategory} />Footwear
            </p>
          </div>
        </div>
      </div>

      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'PRODUCTS'} />
          <select
            className='border-2 border-gray-300 text-sm px-2 dark:text-black'
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value='relevant'>Sort by: Relevant</option>
            <option value='low-high'>Sort by: Low to High</option>
            <option value='high-low'>Sort by: High to Low</option>
          </select>
        </div>

        <button onClick={showTrendingProducts} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
          {filterProducts.length > 0 && filterProducts.every(product => product.trending)
            ? 'Show All Products'
            : 'Show Trending Products'}
        </button>

        {filterProducts.length === 0 ? (
          <p className='text-center text-gray-500'>No products found</p>
        ) : (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {filterProducts.map((item, index) => (
              <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
