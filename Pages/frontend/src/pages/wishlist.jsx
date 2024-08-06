import React, { useState } from 'react';
import { Container, Card, Button,Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';

const Wishlist= () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Book 1', price: 320, quantity: 1, imageUrl: '/images/book4.jpg' },
    { id: 2, name: 'Book 2', price: 150, quantity: 2, imageUrl: '/images/book5.jpg' },
    { id: 3, name: 'Book 3', price: 200, quantity: 1, imageUrl: '/images/book4.jpg' },
    { id: 4, name: 'Book 3', price: 200, quantity: 1, imageUrl: '/images/book4.jpg' },
    { id: 5, name: 'Book 3', price: 200, quantity: 1, imageUrl: '/images/book4.jpg' },
    { id: 6, name: 'Book 2', price: 150, quantity: 2, imageUrl: '/images/book5.jpg' },
    { id: 7, name: 'Book 2', price: 150, quantity: 2, imageUrl: '/images/book5.jpg' },
    { id: 8, name: 'Book 3', price: 200, quantity: 1, imageUrl: '/images/book4.jpg' },
    { id: 9, name: 'Book 3', price: 200, quantity: 1, imageUrl: '/images/book4.jpg' },
  ]);
  const handleDelete = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };
  const nav=useNavigate();
  const handleaddToCart=() =>{
    nav(`/cart`);
  }
  return (
    <div>
    <Header/>
    <Container className="mt-5">
      <h1 className="mb-4">Wishlist</h1>
      <Row>
        {cartItems.map((item) => (
          <Col key={item.id} xs={12} md={6} lg={2} className="mb-4">
            <Card>
              <Card.Img variant="top" src={item.imageUrl} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                  <h4>Price: ₹{item.price.toFixed(2)}</h4>
                  <Button style={{ marginRight: '20px' }} variant="primary" onClick={handleaddToCart}>
                    Add to Cart
                  </Button>
                  <Button className="mt-3" variant="danger" onClick={() => handleDelete(item.id)}>
                    Delete
                  </Button>
                </Card.Text>
              </Card.Body>
            </Card>
            <br />
          </Col>
         
        ))}
      </Row> 
    </Container>
    <Footer/>
    </div>
  );
};

export default Wishlist;
