import React from 'react'

import Home from './components/Home'
import Botton from './components/Botton'
import ProductsCard from './ProductsCard'
import Product2 from "./assets/men-brown-flat-sneakers.jpg"
import Product from "./assets/bathroom-mat.jpg"
import Product3 from "./assets/non-stick-cooking-set-4-pieces.jpg"

function App() {
  

  return (
    <div> 
      <Botton btnName="Login" />

      <div className='cards'>
        <ProductsCard  title={"Product1"} price={"GHC 23"} img={Product}/>
      <ProductsCard  title={"Product2"} price={"GHS 56"} img={Product2}/>
      <ProductsCard title={"Product3"} price={"GHC 34"} img={Product3}/>
      </div>
      

    </div> 
  )
}

export default App
