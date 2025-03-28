import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { IoMdSearch } from 'react-icons/io'

const SearchBar = () => {

    const{ search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
  return showSearch ? (
    
      <div className='relative group hidden sm:block'>
                    <input type='text' placeholder='Search' className='search-bar' />
                    <IoMdSearch className='text-3xl group-hover:text-primary cursor-pointer text-gray-600 dark:text-gray-400 absolute top-1/2 -translate-y-1/2 right-3 duration-200' />
                  </div>
    
  ) : null
}

export default SearchBar
