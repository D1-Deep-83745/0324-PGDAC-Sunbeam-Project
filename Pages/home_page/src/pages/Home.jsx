import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from '../components/MyCarousel';
import { Link } from 'react-router-dom'; 
import Header from '../components/Header';
import BookListing from '../components/Booklisting';

const slides = [
  { image: '/images/carousel_1.jpg', interval: 2000 },
  { image: '/images/carousel_2.jpg', interval: 4000 },
  { image: '/images/carousel_3.jpg', interval: 6000 }
];

export function Home() {
  return (
   <div>
    <Header />
    <br />
    <Slider slides={slides} />
    <br />
    <BookListing /> 
    <BookListing /> 
    <BookListing /> 
    </div>
  );
}

export default Home;
