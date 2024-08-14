import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MyCarousel.css'; // Import your custom CSS file

function Slider({ slides }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    console.log('selected index: ', selectedIndex);
    setIndex(selectedIndex);
  };

  if (!slides || slides.length === 0) {
    return <div>No slides available</div>;
  }

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {slides.map((slide, idx) => (
        <Carousel.Item key={idx} interval={slide.interval}>
          <img
            className="d-block img-fluid mx-auto carousel-img" // Apply the CSS class
            src={slide.image}
            alt={`Slide ${idx}`}
          />
          <Carousel.Caption>
            <h3>{slide.title}</h3>
            <p>{slide.subTitle}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Slider;
