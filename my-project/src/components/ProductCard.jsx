import React from 'react'

const ProductCard = ({data}) => {
  return (
    <div>
      <div> 
        <div>
            <div>
                <div>
                    <img src={data.img} alt="" />
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
