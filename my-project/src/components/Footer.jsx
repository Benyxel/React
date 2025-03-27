import React from 'react'

const Footer = () => {
  return (
    <div className=' mt-4 sm:bg-black md:bg-black  bg-black p-8'>
      <div className=' container grid grid-cols-4 gap-8'>
        <div>
            <h1 className='text-white font-semibold '>Buy&sell</h1>
        </div>

    {/* Quick links */}
        <div className='text-white'>
            <h1 className=' font-semibold '>QuickLinks</h1>
            <div className='flex gap-8'>
            <ul className='mt-4 font-thin '>
                <li><a href=""></a>Home</li>
                <li><a href=""></a>Shop</li>
                <li><a href=""></a>Services</li>
                <li><a href=""></a>About us</li>
                <li><a href=""></a>Contact</li>
            </ul>

            <ul className='mt-4 font-thin '>
                <li><a href=""></a>Buy4me</li>
                <li><a href=""></a>Shipping</li>
                <li><a href=""></a>TrandingProducts</li>
                <li><a href=""></a>Training</li>
                <li><a href=""></a>Alipay</li>
                <li><a href=""></a>Suppliers</li>
                <li><a href=""></a>Wholesale</li>
                
            </ul>
            </div>
        </div>

    {/* Contact us */}
        <div>
            <h1 className='text-white font-semibold '>
                Contact
            </h1>
            <div className='text-white  mt-4'>
                <p>+233 554881200</p>     
                <p>+233 540266839</p>
                <p className='mt-4'>Email: buysellculb@gmail.com</p>
                
                
            </div>
        </div>
    

    </div>
    </div>
  )
}

export default Footer
