import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const LastestProducts = () => {
    const { products } = useContext(ShopContext)
    console.log(products)

    return (
        <div>
            <h2>Latest Products</h2>
            <div className="products-list">
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <div key={index} className="product-item">
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>{product.price}</p>
                        </div>
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </div>
        </div>
    )
}

export default LastestProducts
