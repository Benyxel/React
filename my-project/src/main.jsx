import { StrictMode } from 'react'
import ReactDom from 'react-dom/client'
import './index.css'
import App from './App'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter } from 'react-router-dom'


ReactDom.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
