import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Category1 from './pages/Category1';
import Category2 from './pages/Category2';
import Category3 from './pages/Category3';
import Category4 from './pages/Category4';
import Category5 from './pages/Category5';
import Category6 from './pages/Category6';
import Wishlist from './pages/wishlist';
import Cart from './pages/cart';
import Bookdetail from './components/bookdetails';
import Checkout from './pages/Checkout';
import Register from './pages/register';
import Login from './pages/Login';




function App() {
  return (
    <div className='container-fluid'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/Category1' element={<Category1/>}/>
        <Route path='/Category2' element={<Category2/>}/>
        <Route path='/Category3' element={<Category3/>}/>
        <Route path='/Category4' element={<Category4/>}/>
        <Route path='/Category5' element={<Category5/>}/>
        <Route path='/Category6' element={<Category6/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/wishlist' element={<Wishlist/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/book' element={<Bookdetail/>}/>
        <Route path='/cart/Checkout' element={<Checkout/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
