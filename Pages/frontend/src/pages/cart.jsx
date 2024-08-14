import React, { useState, useEffect } from 'react';
import { Container, Card, Button, InputGroup, FormControl, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Header from "../components/header";
import { toast } from 'react-toastify';
import HeaderCategory from '../components/HeaderCategory';

// Function to convert base64 string to data URL
const getImageSrc = (base64String) => {
  return `data:image/jpeg;base64,${base64String}`;
};

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart items from local storage
    const fetchCartItems = () => {
      const savedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      setCartItems(savedItems);
    };

    fetchCartItems();
  }, []);

  const handleQuantityChange = (id, quantity) => {
    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: Number(quantity) } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems)); // Save updated cart to local storage
  };

  const handleDelete = (id) => {
    toast.error("Item deleted from cart");
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems)); // Save updated cart to local storage
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    const loginStatus = sessionStorage.getItem('isLoggedIn');
    if (loginStatus === "true") {
      navigate('/checkout', { state: { cartItems } });
    } else {
      toast.error("For checkout, you need to login");
    }
  };

  return (
    <div>
      <Header />
      <HeaderCategory />
      <Container className="mt-5">
        <h1 className="mb-4">Shopping Cart</h1>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <Card key={item.id} className="mt-4 flex-row flex-md-row">
              <Card.Img  
                src={item.image ? getImageSrc(item.image) : "/images/default-book.jpg"} 
                style={{ 
                  maxHeight: '300px', // Adjusted for smaller screens
                  width: '100%', // Full width of the container
                  maxWidth: '200px', // Limit width to 200px
                  objectFit: 'cover' 
                }} 
                className="img-fluid" // Bootstrap class for responsive images
              />
              <Card.Body className="d-flex flex-column">
                <div>
                  <Card.Title><h2>{item.name}</h2></Card.Title>
                </div>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
                  <InputGroup style={{ width: '80px' }}>
                    <InputGroup.Text>Quantity</InputGroup.Text>
                    <FormControl
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    />
                  </InputGroup>
                  <div className="mt-2 mt-md-0">
                    <h4>{item.title}</h4>
                    <h4>Price: ₹{item.price.toFixed(2)}</h4>
                    <h4>Total: ₹{(item.price * item.quantity).toFixed(2)}</h4>
                  </div>
                  <Button variant="danger" onClick={() => handleDelete(item.id)} className="mt-2 mt-md-0 ms-3">
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <h4 className="page-title">There are no items in your cart</h4>
        )}
        <center>
          <Col className="mt-4">
            <div>
              <h2 className="mt-4 me-3">Total: ₹{getTotalPrice().toFixed(2)}</h2>
            </div>
            <div className='mb-4'>
              <Button onClick={handleCheckout} variant="success" className="mt-3 mt-md-0">
                Proceed to Checkout
              </Button>
            </div>
          </Col>
        </center>
      </Container>
      <Footer />
    </div>
  );
};

export default Cart;
