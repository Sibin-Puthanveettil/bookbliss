import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookCarousel from './components/BookCarousel';
import ProductGallery from './components/ProductGallery';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import About from './pages/About/About';
import Cart from './pages/Cart/Cart';
import Addbook from './pages/Dashbord/Addbook/Addbook';
import Checkout from './pages/Checkout/Checkout';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <BookCarousel />
        <ProductGallery/>
        <Footer/>
      </div>
    ),
  },
  {
    path: "/login", 
    element:(
      <div>
    <Login/>
    </div>
    )
  },
  {
    path: "/register", 
    element:(
      <div>
    <Register/>
    </div>
    )
  },
  {
    path: "/about",
    element: <div><About/></div>,
  },
  
  {
    path: "/cart",
    element: <div><Cart/></div>,
  },
  {
    path: "/addbook",
    element: <div><Addbook/></div>,
  },
  {
    path: "/checkout",
    element: <div><Checkout/></div>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router}>
      <App />
     </RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


