import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { FaStar, FaHeart } from 'react-icons/fa';

const ProductItem = ({ id, image, name, price, rating = 4.5 }) => {
  const { currency, toggleFavorite, isFavorite } = useContext(ShopContext);

  const handleFavorite = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the favorite button
    toggleFavorite(id);
  };

  return (
    <Link className='group relative bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden' to={`/product/${id}`}>
      <div className='relative overflow-hidden aspect-square'>
        <img 
          className='w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300' 
          src={image[0]} 
          alt={name} 
        />
        <button
          onClick={handleFavorite}
          className={`absolute top-4 right-4 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 
            ${isFavorite(id)
              ? 'bg-red-500 text-white scale-110' 
              : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
            }`}
        >
          <FaHeart className={`w-5 h-5 transition-transform duration-300 ${isFavorite(id) ? 'animate-pulse' : ''}`} />
        </button>
      </div>
      
      <div className='p-4'>
        <h3 className='text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2'>{name}</h3>
        
        <div className='flex items-center mb-2'>
          <div className='flex items-center'>
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`w-4 h-4 ${
                  index < Math.floor(rating)
                    ? 'text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className='ml-2 text-sm text-gray-600 dark:text-gray-400'>({rating})</span>
        </div>

        <p className='text-xl font-bold text-primary dark:text-primary-light'>
          {currency}{price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}

export default ProductItem;