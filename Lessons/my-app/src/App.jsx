import React, { useState } from 'react'
import './App.css'
import Home from './components/Home'

import ProductsCard from './ProductsCard'
import Product2 from "./assets/men-brown-flat-sneakers.jpg"
import Product from "./assets/bathroom-mat.jpg"
import Product3 from "./assets/non-stick-cooking-set-4-pieces.jpg"
import LoginCard from './components/LoginCard'

function App() {
  const [num, setNum] = useState(0)

  return (
     
      
       <>
       {/* <div className='cards'>
        <ProductsCard  title={"Product1"} price={"GHC 23"} img={Product}/>
      <ProductsCard  title={"Product2"} price={"GHS 56"} img={Product2}/>
      <ProductsCard title={"Product3"} price={"GHC 34"} img={Product3}/>
      </div>  */}
      <p>{ num}</p>
      <button className='Cardbtn' onClick={() => setNum(num + 1)}> Increase</button>
      <button className='Cardbtn' onClick={()=>setNum (num -1)}> Increase</button>
       </>

      
      

    
  )
}

export default App
