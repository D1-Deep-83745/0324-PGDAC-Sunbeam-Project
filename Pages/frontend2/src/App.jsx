import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Wishlist from './pages/wishlist';
import Cart from './pages/cart';
import Bookdetail from './pages/bookdetails';
import Checkout from './pages/Checkout';
import Register from './pages/register';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify'; // Correct import
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import ScrollToTop from './components/ScrollTop';
import CategoryPage from './pages/CategoryPage';
import ProfilePage from './pages/Profile';


function App() {
  return (
    <div className='container-fluid'>
       <ScrollToTop/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/Category/:categoryName' element={<CategoryPage/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/wishlist' element={<Wishlist/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/books/:bookId' element={<Bookdetail/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='user/profile' element={<ProfilePage/>}/>
      </Routes>
      <ToastContainer /> {/* Correct placement */}
    </div>
  );
}

export default App;
