import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

const BookListing = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/bookstore/books/list`);
        setBooks(response.data);
      } catch (err) {
        setError(err.message);
      } 
    };

    fetchBooks();
  }, []);

  const handleBookClick = (id) => {
    navigate(`/books/${id}`);
  };

  if (error) return <p>Error loading books: {error}</p>;

  return (
    <div className="container">
    {[...Array(Math.ceil(books.length / 6))].map((_, rowIndex) => (
      <Row key={rowIndex} className="mb-3">
        {[...Array(6)].map((_, colIndex) => {
          const bookIndex = rowIndex * 6 + colIndex;
          const book = books[bookIndex];
          return (
            book ? (
              <Col key={book.id} md={2}>
                <Card onClick={() => handleBookClick(book.id)} style={{ cursor: 'pointer' }}>
                  <Card.Img variant="top" src={"/images/book5.jpg"} />
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text>₹{book.price}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ) : null
          );
        })}
      </Row>
    ))}
  </div>
  
  );
};

export default BookListing;
