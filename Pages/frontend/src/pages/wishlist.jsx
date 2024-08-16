import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import HeaderCategory from '../components/HeaderCategory';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch wishlist items from local storage
    const fetchWishlistItems = () => {
      const savedItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
      setWishlistItems(savedItems);
    };

    fetchWishlistItems();
  }, []);

  const handleDelete = (id) => {
    const updatedItems = wishlistItems.filter(item => item.id !== id);
    setWishlistItems(updatedItems);
    localStorage.setItem('wishlistItems', JSON.stringify(updatedItems)); // Save updated wishlist to local storage
  };

  const handleAddToCart = (item) => {
    // Retrieve existing cart items from local storage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Check if the item is already in the cart
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      // Update quantity if item already exists
      existingItem.quantity += item.quantity;
    } else {
      // Add new item to the cart
      cartItems.push(item);
    }

    // Save updated cart items to local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Remove item from wishlist
    handleDelete(item.id);

    // Navigate to the cart page
    navigate('/cart');
  };

  return (
    <div>
      <Header />
      <HeaderCategory/>
      <Container className="mt-5">
        <h1 className="mb-4">Wishlist</h1>
        <Row>
          {wishlistItems.length > 0 ? (
            wishlistItems.map((item) => (
              <Col key={item.id} xs={6} md={4} lg={2} className="mb-4">
                <Card>
                  <Card.Img variant="top"src={`data:image/jpeg;base64,${item.image}`}/>
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      <h4>Price: ₹{item.price.toFixed(2)}</h4>
                      <Button style={{ marginRight: '20px' }} variant="primary" onClick={() => handleAddToCart(item)}>
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
            ))
          ) : (
            <h4 className="page-title">Your wishlist is empty</h4>
          )}
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Wishlist;
