import React, { useState, useEffect} from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import config from '../config';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeaderCategory from '../components/HeaderCategory';

const CategoryPage = () => {
  const { categoryName } = useParams(); // Get categoryName from URL
  console.log("Category Name:", categoryName); // Debugging line
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${config.url}/books/list`);
        const allBooks = response.data;

        // Check if categoryName is defined before using it
        if (categoryName) {
          // Filter books by category, ensuring book.categoryName is defined
          const filteredBooks = allBooks.filter(book =>
            book.categoryName && book.categoryName.toUpperCase() === categoryName.toUpperCase()
          );
          setBooks(filteredBooks);
        } else {
          setBooks([]);
          setError('Category name is not defined');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBooks();
  }, [categoryName]);

  const handleBookClick = (id) => {
    navigate(`/books/${id}`);
  }; 

  if (error) return <p>Error loading books: {error}</p>;

  return (
    <>
      <Header />
      <HeaderCategory/>
      <div className="container mt-5">
  <h1 className="mb-4">Category : {categoryName ? categoryName.toUpperCase() : 'N/A'}</h1>
  {books.length > 0 ? (
    <Row className="mb-3">
      {books.map((book) => (
        <Col onClick={() => handleBookClick(book.id)} key={book.id} xs={6} sm={4} md={3} lg={2} className="mb-3">
          <Card className="h-100">
            <div className="book-img-wrapper">
              <Card.Img variant="top" src={`data:image/jpeg;base64,${book.image}`} className="book-img" />
            </div>
            <Card.Body className="d-flex flex-column">
              <Card.Title className="book-title">{book.title}</Card.Title>
              <Card.Text className="mt-auto">₹{book.price}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  ) : (
    <p>No books found in this category.</p>
  )}
</div>

      <Footer />
    </>
  );
};

export default CategoryPage;
