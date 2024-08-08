import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Category6 from './pages/Category6';
import Wishlist from './pages/wishlist';
import Cart from './pages/cart';
import Bookdetail from './components/bookdetails';
import Checkout from './pages/Checkout';
import Register from './pages/register';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify'; // Correct import
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

function App() {
  return (
    <div className='container-fluid'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/Category6' element={<Category6/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/wishlist' element={<Wishlist/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/books/:bookId' element={<Bookdetail/>}/>
        <Route path='/cart/Checkout' element={<Checkout/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      <ToastContainer /> {/* Correct placement */}
    </div>
  );
}

export default App;
