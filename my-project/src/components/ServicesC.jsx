import React from 'react';
import { FaCarSide } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";
import { FaHeadphonesAlt } from "react-icons/fa";


const ServiceData = [
  {
    id: 1,
    icon: <FaCarSide className='text-4xl md:text-5xl text-primary' />,
    title: 'Fast Shipping',
    description: 'Free cost on consolidated Goods',
  },
  {
    id: 2,
    icon: <FaCheckCircle className='text-4xl md:text-5xl text-primary' />,
    title: 'Fast Suppliers Payments',
    description: 'Get your suppliers paid instantly',
  },
  {
    id: 3,
    icon: <FaWallet className='text-4xl md:text-5xl text-primary' />,
    title: 'Load Your Alipay',
    description: 'Load your Alipay wallet at a good rate',
  },
  {
    id: 4,
    icon: <FaHeadphonesAlt className='text-4xl md:text-5xl text-primary' />,
    title: 'Affordable Wholesale Goods',
    description: 'Buy directly China goods at goods cost',
  },
];

const ServicesC = () => {
  return (
    <div>
      <div className='container my-14 md:my-20'>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 gap-y-8'>
          {ServiceData.map((data) => (
            <div key={data.id} className='flex flex-col items-start sm:flex-row gap-4 gap-y-4'>
              {data.icon}
              <div>
              <h1 className='lg:text-xl font-bold'>{data.title}</h1>
              <h1 className='text-gray-400 text-sm'>{data.description}</h1>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesC;
