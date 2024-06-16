import React from 'react';
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import Footer from './footer';
import BookListing from './Booklisting';
import { useNavigate } from 'react-router-dom';


const Bookdetail = () => {
  const book = {
    id: 1,
    title: 'This is Book Title',
    price: 299,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nulla convallis libero et orci fringilla,Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nulla convallis libero et orci fringilla at pharetra nisi tincidunt.Lorem ipsum dolor sit amet,consectetur adipiscing elit. Nulla convallis libero et orci fringilla, at pharetra nisi tincidunt.',
    image: '/images/Book1.jpg',
  };
  const navigate=useNavigate();
  const handleAddToCart = () => {
    // Implement add to cart functionality here
    navigate(`/cart`)
  };

  const handleAddToWishlist = () => {
    // Implement add to wishlist functionality here
    navigate(`/wishlist`)
  };

  return (
    <div>
      
    <div>
    <Header/>
    </div>
    <Container className="mt-4">
      <Row>
        <Col md={6} className="text-center">
          <Image src={book.image} alt={book.title} fluid />
        </Col>
        <Col md={6}>
          <h2>{book.title}</h2>
          <br />
          <p>{book.description}</p>
          <Form.Group className="mb-3">
            <Form.Label>Quantity:</Form.Label>
            <Form.Control type="number" defaultValue={1} min={1} />
          </Form.Group>
          <br />
          <h4 className="text-muted">Price: ₹{book.price.toFixed(2)}</h4>
          <br />
          <Button variant="primary" className="me-3" onClick={handleAddToCart}>Add to Cart</Button>
          <Button variant="outline-secondary" onClick={handleAddToWishlist}>Add to Wishlist</Button>
        </Col>
      </Row>
      <br/>
      <h4>You may also like (recommended)</h4>
      <BookListing/>
    </Container>
    <br/>
    <div>
    <Footer/>
    </div>

     </div>
  );
}

export default Bookdetail;
