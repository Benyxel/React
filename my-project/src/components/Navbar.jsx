import React from 'react'
import { IoMdSearch } from 'react-icons/io'
import { FaShoppingCart } from 'react-icons/fa'
import { IoMdArrowDropdown } from 'react-icons/io'
import DarkMode from './DarkMode'
import { Link, NavLink } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'

const MenuLinks = [
    
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/Shop' },
  { name: 'Service', href: '/Service' },
  { name: 'About', href: '/About' },
  { name: 'Contact', href: '/Contact' },
  
]

const DropdownLinks = [
  { name: 'Buy4me', href: '/Buy4me' },
  { name: 'Shipping', href: '/Shipping' },
  { name: 'Suppliers', href: '/Suppliers' },
  { name: 'TrendingProducts', href: '/Trending' },
  { name: 'Wholesale', href: '/Wholesale' },
  { name: 'Training', href: '/Training' },
  { name: 'AlipayPayment', href: '/AlipayPayment' },
]

const DropdownUser = [
  { name: 'My Profile', href: '/MyProfile' },
  { name: 'Orders', href: '/Orders' },
  { name: 'Login', href: '/Login' },
]

export default function Navbar() {
  return (
    <div className='bg-white shadow-md dark:bg-gray-900 dark:text-white duration-200 relative z-40'>
      <div className='py-4'>
        <div className='container flex justify-between'>
          <div className='flex items-center gap-12'>
            <Link
              className='text-primary font-bold -tracking-widest text-[30px] uppercase sm:text-3xl hover:text-brandGreen'
              to='/'
            >
              Buy&Sell
            </Link>

            <div className='hidden lg:block'>
              <ul className='flex items-start gap-5'>
                {MenuLinks.map((data, index) => (
                  <li key={index}>
                    <NavLink
                      to={data.href}
                      className={({ isActive }) =>
                        isActive
                          ? 'inline-block px-2 font-semibold text-black dark:text-white duration-200'
                          : 'inline-block px-2 font-semibold text-gray-500 hover:text-black dark:hover:text-white duration-200'
                      }
                    >
                      {data.name}
                    </NavLink>
                  </li>
                ))}
                {/* Dropdown */}
                <li className='relative cursor-pointer group'>
                  <a
                    href='#'
                    className='flex items-center gap-[2px] font-semibold text-gray-500 dark:hover:text-white hover:text-black'
                  >
                    Quick links
                    <span>
                      <IoMdArrowDropdown className='group-hover:rotate-180 duration-300' />
                    </span>
                  </a>

                  {/* Dropdown list */}
                  <div className='absolute z-[9999] hidden group-hover:block w-[180px] rounded-md bg-white shadow-md dark:bg-gray-900 p-2 dark:text-white'>
                    <ul className='space-y-2'>
                      {DropdownLinks.map((data, index) => (
                        <li key={index}>
                          <Link
                            to={data.href}
                            className='text-gray-500 hover:text-black dark:hover:text-white p-1 duration-200 inline-block w-full hover:bg-brandGreen/20 rounded-md font-semibold'
                          >
                            {data.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>

              
            </div>
          </div>

          {/* navbar right */}
          <div className='flex justify-between items-center gap-5'>
            <div className='relative group hidden sm:block'>
              <input type='text' placeholder='Search' className='search-bar' />
              <IoMdSearch className='text-2xl group-hover:text-primary cursor-pointer text-gray-600 dark:text-gray-400 absolute top-1/2 -translate-y-1/2 right-3 duration-200' />
            </div>
            {/* CART */}
            <div className='btn relative p-5'>
              <Link to='/Cart' className='relative group'>
                <FaShoppingCart className='text-xl text-gray-600 dark:text-gray-400 hover:text-brandGreen' />
                <div className='w-4 h-4 bg-red-500 text-white rounded-full absolute -top-1 right-4 transform translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-xs'>
                  <span>4</span>
                </div>
              </Link>
            </div>
            {/* dark mode sec */}
            <div>
              <DarkMode />
            </div>
             
             {/* userIcon */}
            <div>
                <ul>
                <li className='relative cursor-pointer group'>
                  <a
                    href='/MyProfile'
                    className='flex items-center gap-[2px] font-semibold text-gray-500 dark:hover:text-white hover:text-black'
                  >
                    <FaUser />
                    <span>
                      <IoMdArrowDropdown className='group-hover:rotate-180 duration-300' />
                    </span>
                  </a>

                  {/* Dropdown list */}
                  <div className='absolute z-[9999] hidden group-hover:block w-[180px] rounded-md bg-white shadow-md dark:bg-gray-900 p-2 dark:text-white'>
                    <ul className='space-y-2'>
                      {DropdownUser.map((data, index) => (
                        <li key={index}>
                          <Link
                            to={data.href}
                            className='text-gray-500 hover:text-black dark:hover:text-white p-1 duration-200 inline-block w-full hover:bg-brandGreen/20 rounded-md font-semibold'
                          >
                            {data.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
                </ul>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}
