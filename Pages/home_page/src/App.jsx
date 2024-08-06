import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Slider from './components/MyCarousel';
import Header from './components/Header';



function App() {
  return (
    <div className='container-fluid'>
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
