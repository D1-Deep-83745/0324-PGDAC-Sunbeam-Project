import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

const BookListing = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSortOrder, setSelectedSortOrder] = useState('default');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooksAndCategories = async () => {
      try {
        // Fetch all books
        const booksResponse = await axios.get(`${config.url}/books/list`);
        setBooks(booksResponse.data);

        // Fetch categories
        const categoriesResponse = await axios.get(`${config.url}/categories/listAll`);
        setCategories(['All', ...categoriesResponse.data.map(cat => cat.categoryName)]);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBooksAndCategories();
  }, []);

  // Filter books based on selected category
  const filteredBooks = selectedCategory === 'All'
    ? books
    : books.filter(book => book.categoryName === selectedCategory);

  // Sort books based on selected sort order
  const sortedBooks = (() => {
    switch (selectedSortOrder) {
      case 'price-asc':
        return [...filteredBooks].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...filteredBooks].sort((a, b) => b.price - a.price);
      default:
        return filteredBooks;
    }
  })();

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSelectedSortOrder(event.target.value);
  };

  const handleBookClick = (id) => {
    navigate(`/Books/${id}`);
  };

  if (error) return <p>Error loading books: {error}</p>;

  return (
    <div className="container">
      <div className="mb-4 d-flex">
        <div className="w-25">
          <label htmlFor="categoryFilter" className="form-label">Filter by Category:</label>
          <select
            id="categoryFilter"
            className="form-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="ms-4 w-25">
          <label htmlFor="sortFilter" className="form-label">Sort by Price:</label>
          <select
            id="sortFilter"
            className="form-select"
            value={selectedSortOrder}
            onChange={handleSortOrderChange}
          >
            <option value="default">Select...</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <Row className="mb-3">
        {sortedBooks.length > 0 ? (
          sortedBooks.map((book) => (
            <Col key={book.id} xs={6} sm={4} md={4} lg={2} className="mb-3">
              <Card onClick={() => handleBookClick(book.id)} style={{ cursor: 'pointer' }}>
                <Card.Img
                  variant="top"
                  src={`data:image/jpeg;base64,${book.image}`}
                  alt={book.title}
                />
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text>₹{book.price}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No books available in this category.</p>
        )}
      </Row>
    </div>
  );
};

export default BookListing;


