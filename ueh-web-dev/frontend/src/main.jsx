import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
// import 'swiper/swiper-bundle.min.css';
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import CartProvider from './utils/cartContext.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
        <AuthProvider>
          <CartProvider>
            <App />

          </CartProvider>
        

        </AuthProvider>

    </Router>

  </React.StrictMode>,
)
