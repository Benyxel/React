import React from 'react';

const Footer = () => {
  return (
    <div className='mt-4 bg-black p-8'>
      <div className='container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-items-center'>
        {/* Brand Name */}
        <div>
          <h1 className='text-white font-semibold text-center md:text-left'>Buy&sell</h1>
        </div>

        {/* Quick Links */}
        <div className='text-white'>
          <h1 className='font-semibold text-center md:text-left'>Quick Links</h1>
          <div className='flex flex-col sm:flex-row gap-8 justify-center md:justify-start'>
            <ul className='mt-4 font-thin text-center sm:text-left'>
              <li><a href="">Home</a></li>
              <li><a href="">Shop</a></li>
              <li><a href="">Services</a></li>
              <li><a href="">About us</a></li>
              <li><a href="">Contact</a></li>
              <li><a href="">Cart</a></li>
              <li><a href="">Profile</a></li>
            </ul>

            <ul className='mt-4 font-thin text-center sm:text-left'>
              <li><a href="">Buy4me</a></li>
              <li><a href="">Shipping</a></li>
              <li><a href="">Trending Products</a></li>
              <li><a href="">Training</a></li>
              <li><a href="">Alipay</a></li>
              <li><a href="">Suppliers</a></li>
              <li><a href="">Wholesale</a></li>
            </ul>
          </div>
        </div>

        {/* Contact Us */}
        <div className='px-4 text-center md:text-left'>
          <h1 className='text-white font-semibold'>Contact</h1>
          <div className='text-white mt-4'>
            <p>+233 554881200</p>
            <p>+233 540266839</p>
            <p className='mt-4'>Email: buysellculb@gmail.com</p>
          </div>
        </div>

        {/* Verified Platforms */}
        <div className='px-4 text-center md:text-left'>
          <h1 className='text-white font-semibold'>Verified Platforms</h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
