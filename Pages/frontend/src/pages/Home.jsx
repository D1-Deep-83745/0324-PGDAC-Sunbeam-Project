import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from '../components/MyCarousel';
import Header from '../components/Header';
import BookListing from '../components/Booklisting';
import Footer from '../components/footer';
import Bookdetail from '../components/bookdetails';


const slides = [
  { image: '/images/carousel_1.jpg', interval: 2000 },
  { image: '/images/carousel_2.jpg', interval: 4000 },
  { image: '/images/carousel_3.jpg', interval: 6000 },
  { image: '/images/carousel_4.jpg', interval: 8000 }
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
    <Footer/>
    </div>
  );
}

export default Home;
