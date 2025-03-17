import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Home from './pages/home'
import Shop from './pages/shop'
import Service from './pages/Service'
import About from './pages/About'
import Checkout from './pages/checkout'
import Login from './pages/Login'
import Cart from './pages/cart'
import Buy4me from './pages/Quicklinks/Buy4me'
import Orders from './pages/Orders'
import Shipping from './pages/Quicklinks/Shipping'
import Tranding from './pages/Quicklinks/Tranding'
import Whole from './pages/Quicklinks/Whole'
import Suppliers from './pages/Quicklinks/Suppliers'

 function App() {
  return (
    <div>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path = '/' element={<Shop/>}/>
          <Route path = '/' element={<Service/>}/>
          <Route path = '/' element={<About/>}/>
          <Route path = '/' element={<Checkout/>}/>
          <Route path = '/' element={<Login/>}/>
          <Route path = '/' element={<Cart/>}/>
          <Route path = '/' element={<Buy4me/>}/>
          <Route path = '/' element={<Orders/>}/>
          <Route path = '/' element={<Shipping/>}/>
          <Route path = '/' element={<Tranding/>}/>
          <Route path = '/' element={<Whole/>}/>
          <Route path = '/' element={<Suppliers/>}/>
      </Routes>
    
    </div>
  )
}

export default App