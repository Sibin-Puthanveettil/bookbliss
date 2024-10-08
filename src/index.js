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
import Profile from './components/profile';
import ProductFeeds from './components/ProductFeeds';
import Banner from './components/Banner';
import Orders from './pages/Orders/Orders';
import OrdersTracking from './pages/Orders/OrdersTracking'
import Admin from './pages/Admin/Admin';
import LanguagePage from './pages/Admin/LanguagePage';
import Categories from './pages/Admin/Categories';
import Info from './components/Info';
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
        {/* <Info /> */}
        <Banner />
        {/* <ProductGallery/> */}
        {/* <BookCarousel /> */}

        <ProductFeeds />
        <Footer />
      </div>
    ),
  },
  {
    path: "/login",
    element: (
      <div>
        <Login />
      </div>
    )
  },
  {
    path: "/register",
    element: (
      <div>
        <Register />
      </div>
    )
  },
  {
    path: "/about",
    element: <div><About /></div>,
  },

  {
    path: "/cart",
    element: <div><Navbar />
      <Cart />
      <Footer /></div>,
  },
  {
    path: "/addbook",
    element: <div><Navbar />
      <Addbook />
      <Footer /></div>,
  },
  {
    path: "/checkout",
    element: <div><Checkout /></div>,
  },

  {
    path: "/profile",
    element: <div><Navbar />
      <Profile />
      <Footer /></div>,
  },
  {
    path: "/Orders",
    element: <div><Navbar />
      <Orders />
      <Footer /></div>,
  },

  {
    path: "/OrdersTracking",
    element: <div><Navbar />
      <OrdersTracking />
      <Footer /></div>,
  },

  {
    path: "/Admin",
    element: <div><Navbar />
      <Admin />
      <Footer /></div>,
  },

  {
    path: "/LanguagePage",
    element: <div><Navbar />
      <LanguagePage />
      <Footer /></div>,
  },

  {
    path: "/Categories",
    element: <div><Navbar />
      <Categories />
      <Footer /></div>,
  },

  {
    path: "/ProductFeeds",
    element: <div><Navbar />
     <Banner />
      <ProductFeeds />
      <Footer /></div>,
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


