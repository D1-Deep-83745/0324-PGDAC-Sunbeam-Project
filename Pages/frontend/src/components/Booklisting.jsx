import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const books = [
  { id: 1, title: 'Book 1', price: '$10', image: '/images/Book1.jpg'  },
  { id: 2, title: 'Book 2', price: '$15', image: '/images/Book1.jpg'  },
  { id: 3, title: 'Book 3', price: '$20', image: '/images/Book1.jpg' },
  { id: 4, title: 'Book 4', price: '$25', image: '/images/Book1.jpg'  },
  { id: 5, title: 'Book 5', price: '$30', image: '/images/Book1.jpg' },
  { id: 6, title: 'Book 6', price: '$35', image: '/images/Book1.jpg'  },
  // Add more books here if needed
];

const BookListing = () => {
 
  const navigate = useNavigate();

  const handleBookClick = () => {
    // Navigate to BookDetail component with the specific book id
    navigate(`/book`);
  };
  return (
    <div onClick={() => handleBookClick()} className="container">
      {[...Array(3)].map((_, rowIndex) => (
        <Row key={rowIndex} className="mb-3 justify-content-around">
          {[...Array(6)].map((_, colIndex) => {
            const bookIndex = rowIndex * 6 + colIndex;
            const book = books[bookIndex];
            return (
              <Col key={colIndex} md={2}>
                {book && (
                  <Card>
                    <Card.Img variant="top" src={book.image} />
                    <Card.Body>
                      <Card.Title>{book.title}</Card.Title>
                      <Card.Text>{book.price}</Card.Text>
                    </Card.Body>
                  </Card>
                )}
              </Col>
            );
          })}
        </Row>
      ))}
    </div>
  );
};

export default BookListing;
