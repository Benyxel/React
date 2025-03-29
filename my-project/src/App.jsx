import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Home from './pages/home'
import Shop from './pages/Shop'
import Services from './pages/Services'
import About from './pages/About'
import Checkout from './pages/checkout'
import Login from './pages/Login'
import Cart from './pages/cart'
import Buy4me from './pages/Quicklinks/Buy4me'
import Orders from './pages/Orders'
import Shipping from './pages/Quicklinks/Shipping'
import Trending from './pages/Quicklinks/Trending'
import Wholesale from './pages/Quicklinks/Wholesale'
import Suppliers from './pages/Quicklinks/Suppliers'
import Contact from './pages/Contact'
import PlaceOrder from './pages/PlaceOrder'
import Training from './pages/Quicklinks/Training'
import AlipayPayment from './pages/Quicklinks/AlipayPayment'
import Navbar from './components/Navbar'

import Footer from './components/Footer'
import SearchBar from './components/Searchbar'
import Product from './components/Product'


 function App() {
  return (
    <main>
      <Navbar/>
      <SearchBar/>
    <div className='bg-white dark:bg-gray-900 dark:text-white duration-200 '>
      
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path = '/Shop' element={<Shop/>}/>
          <Route path = '/Services' element={<Services/>}/>
          <Route path = '/Contact' element={<Contact/>}/>
          <Route path = '/About' element={<About/>}/>
          <Route path = '/Checkout' element={<Checkout/>}/>
          <Route path = '/Login' element={<Login/>}/>
          <Route path = '/Cart' element={<Cart/>}/>
          <Route path = '/Buy4me' element={<Buy4me/>}/>
          <Route path = '/Orders' element={<Orders/>}/>
          <Route path = '/Shipping' element={<Shipping/>}/>
          <Route path = '/Trending' element={<Trending/>}/>
          <Route path = '/Wholesale' element={<Wholesale/>}/>
          <Route path = '/Suppliers' element={<Suppliers/>}/>
          <Route path = '/product/:productId' element={<Product/>}/>
          <Route path = '/PlaceOrder' element={<PlaceOrder/>}/>
          <Route path = '/Training' element={<Training/>}/>
          <Route path = '/AlipayPayment' element={<AlipayPayment/>}/>
      </Routes>
      <Footer/>
    </div></main>
  )
}

export default App