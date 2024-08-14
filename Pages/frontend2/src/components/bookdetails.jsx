import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Image, Button, Form, Spinner, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import { useNavigate, useParams } from 'react-router-dom';
import BookListing from './Booklisting';
import Footer from './footer';
import { toast } from 'react-toastify';

const Bookdetail = () => {
  const { bookId } = useParams();
  console.log("Book ID:", bookId);
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const quantityRef = useRef(1); // Ref to manage quantity input


  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/bookstore/books/${bookId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch book');
        }
        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);


  const handleAddToCart = () => {
    const quantity = parseInt(quantityRef.current.value, 10);
    if (book) {
      // Retrieve existing cart items from local storage
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      
      // Check if the item is already in the cart
      const existingBook = cartItems.find(item => item.id === book.id);
      
      if (existingBook) {
        // Update quantity if item already exists
        existingBook.quantity += quantity;
      } else {
        // Add new item to the cart
        cartItems.push({ ...book, quantity });
      }
      
      // Save updated cart items to local storage
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      
      // Navigate to the cart page
      toast.success("successfully added")
      navigate('/cart');
    }
  };


  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!book) return <Alert variant="warning">Book not found</Alert>;

  
  return (
    <div>
      <Header />
      <Container className="mt-4">
        <Row>
          <Col md={6} className="text-center">
            <Image src={book.image} alt={book.title} className="img-fluid" style={{ maxHeight: '400px', objectFit: 'cover' }} />
          </Col>
          <Col md={6}>
            <h2>{book.title}</h2>
            <br />
            <p>{book.description}</p>
            <Form.Group className="mb-3">
              <Form.Label>Quantity:</Form.Label>
              <Form.Control type="number" defaultValue={1} min={1} ref={quantityRef} />
            </Form.Group>
            <br />
            <h4 className="text-muted">Price: ₹{book.price.toFixed(2)}</h4>
            <br />
            <Button variant="primary" className="me-3" onClick={handleAddToCart}>Add to Cart</Button>
            <Button variant="outline-secondary">Add to Wishlist</Button>
          </Col>
        </Row>
        <br />
        <h4>You may also like (recommended)</h4>
        <BookListing />
      </Container>
      <br />
      <Footer />
    </div>
  );
};

export default Bookdetail;
