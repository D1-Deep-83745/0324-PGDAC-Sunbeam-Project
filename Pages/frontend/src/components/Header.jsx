import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import config from '../config'; // Ensure this is the correct path to your config file
import { toast } from 'react-toastify';

function Header() {
  const [query, setQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in on component mount
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setIsLoggedIn(!!token); // Update isLoggedIn based on token presence
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault(); // Prevent form submission and page refresh
  
    try {
      const response = await axios.get(`${config.url}/books/searchByTitle`, {
        params: { title: query }
      });
  
      // Assuming the response contains an array or object for the book data
      const book = response.data;
  
      if (book && book.id) {
        navigate(`/books/${book.id}`); // Navigate to the book detail page using the ID
      } else {
        // Handle case where book is not found
        toast.error('Book not found');
      }
    } catch (err) {
      // Provide more descriptive error handling
      if (err.response) {
        // Server responded with a status other than 200 range
        console.error('Server Error:', err.response.status);
        toast.error('Server error occurred. Please try again later.');
      } else if (err.request) {
        // Request was made, but no response was received
        console.error('Network Error:', err.request);
        toast.error('Network error. Please check your internet connection.');
      } else {
        // Other errors, such as setting up the request
        console.error('Error:', err.message);
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };
  

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('firstname');
    sessionStorage.removeItem('lastname');
    sessionStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false); // Update state to reflect logout
    toast.success('Logged out successfully');
    navigate('/'); // Redirect to the home page or login page
  };

  const onCart = () => {
    if (isLoggedIn) {
      navigate("/cart");
    } else {
      toast.info("Please login first");
      navigate("/login");
    }
  };

  const onWishlist = () => {
    if (isLoggedIn) {
      navigate("/wishlist");
    } else {
      toast.info("Please login first");
      navigate("/login");
    }
  };

  const handleProfile=()=>{
    navigate("/user/profile");
  }

  return (
    <div>
      <Navbar bg="light" expand="lg" fixed="top">
        <Navbar.Brand as={Link} to="/">
          <img
            src="/images/MyLogo.png"
            alt="Logo"
            style={{ maxHeight: '30px', width: 'auto' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Form className="d-flex mx-auto my-2 my-lg-0 w-50" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search by Title..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button type="submit" variant="success" className="ms-1">
              Search
            </Button>
          </Form>
          <div className="d-flex align-items-center">
            {isLoggedIn ? (
              <>
                <Button onClick={handleProfile} variant="outline-secondary" className="me-2">
                  <FontAwesomeIcon icon={faUser} /> Edit Profile
                </Button>
                <Button onClick={handleLogout} variant="outline-primary" className="me-2">
                  <FontAwesomeIcon icon={faUser} /> Logout
                </Button>
              </>
            ) : (
              <Button as={Link} to="/login" variant="outline-primary" className="me-2">
                <FontAwesomeIcon icon={faUser} /> Login
              </Button>
            )}
            <Button onClick={onWishlist} variant="outline-secondary" className="me-2">
              <FontAwesomeIcon icon={faHeart} />
            </Button>
            <Button onClick={onCart} variant="outline-danger">
              <FontAwesomeIcon icon={faShoppingCart} />
            </Button>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
