import React from 'react'
import './index.css'


const ProductsCard = ({title, price, img}) => {
    return (
    
    <div className='products-card'>
        <div className='product-image'>
            <img src={img} alt=''/>
        </div>

        <div className='product-content'>
            <h3>{title}</h3>
            <p className='price'>{price}</p>


        </div>
        </div>
    
)
}

export default ProductsCard