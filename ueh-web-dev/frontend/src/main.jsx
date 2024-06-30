import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
// import 'swiper/swiper-bundle.min.css';
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from './client/context/AuthContext.jsx';
import Clientpage from './client/Clientpage.jsx';
import Adminpage from './admin/AdminPage.jsx'
import CartProvider from './client/utils/cartContext.jsx';
import { AuthLoginProvider } from './client/context/AuthLoginContext.jsx';
import {NextUIProvider} from '@nextui-org/react'

// import Clientpage from './client/Clientpage.jsx';

const url = window.location.pathname;




if (url.startsWith('/admin')) {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    <Router>
      <AuthProvider>
        <NextUIProvider>

            <Adminpage />
        </NextUIProvider>

      </AuthProvider>

    </Router>
    </React.StrictMode>
    );
} else {
  // ReactDOM.render(<Appclientpage />, document.getElementById('root'));
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Router>
          <AuthProvider>
            <CartProvider>
                <AuthLoginProvider>
                  <NextUIProvider>

                    <Clientpage />
                  </NextUIProvider>

                
                </AuthLoginProvider>
  
            </CartProvider>
          
  
          </AuthProvider>
  
      </Router>

  
    </React.StrictMode>,
  )
}

