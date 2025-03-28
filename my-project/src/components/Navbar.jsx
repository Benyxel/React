import React, { useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { IoMdArrowDropdown } from 'react-icons/io'
import DarkMode from './DarkMode'
import { Link, NavLink } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import SearchBar from './Searchbar'

const MenuLinks = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/Shop' },
  { name: 'Services', href: '/Services' },
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
  const [visible, setVisible] = useState(false)

  return (
    <div className='bg-white shadow-md dark:bg-gray-900 dark:text-white duration-200 relative z-40'>
      <div className='py-4'>
        <div className='container flex justify-between'>
          <div className='flex items-center gap-12'>
            <Link
              className='text-primary font-bold -tracking-widest text-[40px] uppercase sm:text-3xl hover:text-brandGreen'
              to='/'
            >
              Buy&Sell
            </Link>

            <div className='hidden lg:block'>
              <ul className='flex items-start gap-3 text-[18px]'>
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
                    <ul className='space-y-1'>
                      {DropdownLinks.map((data, index) => (
                        <li key={index}>
                          <Link
                            to={data.href}
                            className='text-gray-500 hover:text-black dark:hover:text-white p-1 duration-200 inline-block w-full hover:bg-brandGreen/20 rounded-md '
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
          <div className='flex justify-between items-center gap-3 p-3'>
            <SearchBar/>
            {/* CART */}
            <div className='btn relative p-2'>
              <Link to='/Cart' className='relative group'>
                <FaShoppingCart className='text-2xl text-gray-600 dark:text-gray-400 hover:text-brandGreen' />
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
            <div className='hidden sm:block'>
                <ul>
                <li className='relative cursor-pointer group'>
                  <a
                    href='/MyProfile'
                    className='flex items-center gap-[2px] font-semibold text-gray-500 dark:hover:text-white hover:text-black'
                  >
                    <FaUser className='text-2xl' />
                    <span>
                      <IoMdArrowDropdown className='group-hover:rotate-180 duration-300' />
                    </span>
                  </a>

                  {/* Dropdown list */}
                  <div className='absolute z-[9999] hidden group-hover:block w-[180px] rounded-md bg-white shadow-md dark:bg-gray-900 p-2 dark:text-white'>
                    <ul className='space-y-1'>
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

 {/* 
 ?: side Menu Icon for small screen */}


            <div className='flex' >
              {/*  Menu Icon */}
              <IoMdMenu onClick={() => setVisible(true)} className='text-3xl text-gray-500 hover:text-black dark:hover:text-white cursor-pointer sm:hidden' />
              <div className={`fixed top-0 right-0 bottom-0 bg-white/95 transition-transform transform ${visible ? 'translate-x-0' : 'translate-x-full'} w-1/2 sm:w-64 z-50 dark:bg-black/90 sm:hidden `}>
                <div className='flex flex-col text-gray-600 h-full '>
                  <div className='flex items-center p-2 border-b'>
                     <div className='flex items-center gap-2' >
                    <IoClose onClick={() => setVisible(false)} className='h-8 cursor-pointer ml-3 text-[30px] duration-300 dark:text-white hover:text-primary' />
                    <p className='text-lg font-semibold dark:text-white'>Close</p>

{/* user profile on small screen */}
                 
                  <ul>
                <li className='relative cursor-pointer group'>
                  <div
                    
                    className='flex items-center gap-[2px] font-semibold text-gray-500 dark:hover:text-white hover:text-black'
                  >
                    <FaUser className='text-2xl ' />
                    <span>
                      <IoMdArrowDropdown className='group-hover:rotate-180 duration-300' />
                    </span>
                  </div>

                  {/* Dropdown list */}
                  <div className='absolute z-[9999] hidden group-hover:block w-[180px] rounded-md bg-white shadow-md dark:bg-gray-900 p-2 dark:text-white '>
                    <ul className='space-y-0  '>
                      {DropdownUser.map((data, index) => (
                        <li key={index}>
                          <NavLink onClick={() => setVisible(false)}>
                          <Link
                            to={data.href}
                            className='text-gray-500 hover:text-black dark:hover:text-white p-1 duration-200 inline-block w-full hover:bg-brandGreen/20 rounded-md font-semibold'
                          >
                            {data.name}
                          </Link>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
                </ul>

                  </div>

                  </div>
                  <ul className='py-2 pl-6'>
                    {MenuLinks.map((data, index) => (
                      <li key={index} className='py-1'>
                        <NavLink
                          to={data.href}
                          className={({ isActive }) =>
                            isActive
                              ? 'inline-block px-2 font-semibold text-black dark:text-white duration-200'
                              : 'inline-block px-2 font-semibold text-gray-500 hover:text-black dark:hover:text-white duration-200'
                          }
                          onClick={() => setVisible(false)} // Close the menu when a link is clicked
                        >
                          {data.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>

                  {/* quick link */}
                  <ul className='py-2 pl-6 '>
                    <li className='relative cursor-pointer group '>
                      <a
                        href='#'
                        className='flex items-center gap-[0] font-semibold text-gray-500 dark:hover:text-white hover:text-black'
                      >
                        Quick links
                        <span>
                          <IoMdArrowDropdown className='group-hover:rotate-180 duration-300' />
                        </span>
                      </a>
                      {/* Dropdown list */}
                      <div className='absolute z-[9999] hidden group-hover:block w-[180px] rounded-md bg-white shadow-md dark:bg-gray-900 p-2 dark:text-white '>
                        <ul className='space-y-1'>
                          {DropdownLinks.map((data, index) => (
                            <li key={index}>
                              <NavLink onClick={() => setVisible(false)}>
                                <Link
                                  to={data.href}
                                  className='text-gray-500 hover:text-black dark:hover:text-white p-0 duration-200 inline-block w-full hover:bg-brandGreen/20 font-small'
                                >
                                  {data.name}
                                </Link>
                              </NavLink>
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
      </div>
    </div>
  )
}
