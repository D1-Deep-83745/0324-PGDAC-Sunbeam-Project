import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Image, Button, Form, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import BookListing from '../components/Booklisting';
import HeaderCategory from '../components/HeaderCategory';
import config from '../config';

const Bookdetail = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const quantityRef = useRef(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookResponse = await fetch(`${config.url}/books/${bookId}`);
        if (!bookResponse.ok) {
          throw new Error('Failed to fetch book');
        }
        const bookData = await bookResponse.json();
        setBook(bookData);

        const reviewsResponse = await fetch(`${config.url}/reviews/book/${bookId}`);
        if (!reviewsResponse.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const reviewsData = await reviewsResponse.json();

        // Handle case where reviewsData is not an array
        if (!Array.isArray(reviewsData)) {
          throw new Error('Invalid reviews data');
        }
        setReviews(reviewsData);

        const token = sessionStorage.getItem('token');
        if(token){
          setIsLoggedIn(true);
        }
        else{
          setIsLoggedIn(false);
        }
      } catch (err) {
      }
    };

    fetchData();
  }, [bookId]);

  const handleAddToCart = () => {
    console.log("isLoggedIn:", isLoggedIn);
    console.log("book:", book);
    if (isLoggedIn) {
      const quantity = parseInt(quantityRef.current.value, 10);
      console.log("Selected quantity:", quantity);
      if (book) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existingBook = cartItems.find(item => item.id === book.id);
  
        if (existingBook) {
          existingBook.quantity += quantity;
        } else {
          cartItems.push({ ...book, quantity });
        }
  
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        toast.success(`Item added to Cart`);
        navigate('/cart');
      } else {
        console.log("Book object is not available");
      }
    } else {
      toast.info("Please, Login First");
      navigate("/login");
    }
  };
  

  const handleAddToWishlist = () => {
    if (isLoggedIn) {
      const quantity = parseInt(quantityRef.current.value, 10);
      if (book) {
        const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
        const existingBook = wishlistItems.find(item => item.id === book.id);

        if (existingBook) {
          existingBook.quantity += quantity;
        } else {
          wishlistItems.push({ ...book, quantity });
        }

        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
        toast.success(`Item added to Wishlist`);
        navigate('/wishlist');
      }
    } else {
      toast.info("Please, Login First");
      navigate("/login");
    }
  };

  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!book) return <Alert variant="warning">Book not found</Alert>;

  return (
    <div>
      <Header />
      <HeaderCategory/>
      <Container className="mt-4">
        <Row>
          <Col md={6} className="text-center">
            <Image src={"/images/book6.jpg"} alt={book.title} className="img-fluid" style={{ maxHeight: '400px', objectFit: 'cover' }} />
          </Col>
          <Col md={6}>
            <h2>{book.title}</h2>
            <br />
            <Form.Group className="mb-3">
              <Form.Label>Quantity:</Form.Label>
              <Form.Control type="number" defaultValue={1} min={1} ref={quantityRef} />
            </Form.Group>
            <br />
            <h4 className="text-muted">Price: ₹{book.price.toFixed(2)}</h4>
            <br />
            <Button variant="primary" className="me-3" onClick={handleAddToCart}>Add to Cart</Button>
            <Button variant="outline-secondary" onClick={handleAddToWishlist}>Add to Wishlist</Button>
            <p className='mt-4'>{book.description}</p>
          </Col>
        </Row>
        <br />
        <Row>
          <Col></Col>
          <Col md={4}>
  <ul>
    {reviews.length > 0 ? (
      reviews.map((review, index) => (
        <li key={review.id || index}>
          <p><strong>Rating :</strong> {review.rating !== null && review.rating !== undefined ? review.rating : 'N/A'}</p>
          <p><strong>Review :</strong> {review.comment && review.comment.trim() !== '' ? review.comment : 'N/A'}</p>
        </li>
      ))
    ) : (
      <p>No reviews available.</p>
    )}
  </ul>
</Col>


          <Col md={6}>
            <p><strong>Written by : </strong> {book.authorName || 'N/A'}</p>
            <p><strong>Published by : </strong> {book.publisherName || 'N/A'}</p>
          </Col>
        </Row>
        <hr />
        <br />
        <h4>You may also like (recommended)</h4>
        <br />
        <BookListing/>
      </Container>
      <br />
      <Footer />
    </div>
  );
};

export default Bookdetail;
