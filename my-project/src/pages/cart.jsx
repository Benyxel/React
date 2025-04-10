import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { ImBin } from "react-icons/im";
import CartTotal from '../components/CartTotal';

const cart = () => {
  const { products, currency, cartItems, updateQuantity} = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className='container order-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {cartData.length > 0 ? (
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === Number(item._id));
            return (
              <div
                key={index}
                className='py-4 border-t text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'
              >
                <div className='flex items-start gap'>
                  <img className='w-16 sm:w-20' src={productData?.image[0]} alt="" />
                  <div>
                    <p className='mt-2 mx-6 text-xs sm:text-lg font-medium'>{productData?.name || 'Product not found'}</p>
                    <div className='flex items-center gap-5 mx-6 mt-2'>
                      <p>{currency} {productData?.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                    </div>
                  </div>
                </div>

                <input
                  className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py'
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || value === '0') {
                      return;
                    }
                    updateQuantity(item._id, item.size, Number(value));
                  }}
                />
                <ImBin
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className='w-4 mr-4 text-2xl sm:w-5 cursor-pointer hover:text-primary'
                />
              </div>
            );
          })
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal/>
        </div>
      </div>
    </div>
  );
};

export default cart;
