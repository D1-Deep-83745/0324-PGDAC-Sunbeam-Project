import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from '../components/MyCarousel';
import Header from '../components/Header';
import BookListing from '../components/Booklisting';
import Footer from '../components/Footer';
import HeaderCategory from '../components/HeaderCategory';


const slides = [
  { image: '/images/carousel_1.jpg', interval: 2000 },
  { image: '/images/carousel_2.jpg', interval: 2000 },
  { image: '/images/carousel_3.jpg', interval: 2000 },
  { image: '/images/carousel_4.jpg', interval: 2000 }
];

export function Home() {
 

  return (
   <div>
    <Header />
    <HeaderCategory/>
    <br />
    <Slider slides={slides} />
    <br />
    <BookListing /> 
    <Footer/>
    </div>
  );
}

export default Home;
