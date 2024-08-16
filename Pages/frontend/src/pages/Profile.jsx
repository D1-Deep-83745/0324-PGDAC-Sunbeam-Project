import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Table, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import Header from '../components/header';
import Footer from '../components/footer';
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [previousOrders, setPreviousOrders] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const navigate = useNavigate();
  const id = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const userResponse = await axios.get(`${config.url}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const ordersResponse = await axios.get(`${config.url}/orders/orderDetails/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUser(userResponse.data);
        setPreviousOrders(ordersResponse.data);
      } catch (err) {
        console.error(err); 
        setError('Failed to fetch user details.');
      }
    };

    fetchUserDetails();
  }, [navigate, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      await axios.put(`${config.url}/user/profile`, user, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSuccess('Profile updated successfully.');
      toast.success('Profile updated successfully.');
    } catch (err) {
      console.error(err); // Log the error for debugging
      setError('Failed to update profile.');
      toast.error('Failed to update profile.');
    }
  };

  const handleReviewClick = (item) => {
    setCurrentItem(item);
    setShowModal(true);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      
        const response = await axios.post(`${config.url}/reviews/add`, {
        itemId: currentItem.id,
        rating,
        comment
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      

      if(response.status===200){
      setShowModal(false);
      setSuccess('Review submitted successfully.');
      toast.success('Review submitted successfully.');
      }
    } catch (err) {
      console.error(err); // Log the error for debugging
      setError('Failed to submit review.');
      toast.error('Failed to submit review.');
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setRating('');
    setComment('');
  };

  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <Header />
      <br />
      <br />
      <Container className="mt-4 mb-5">
        <h1>Profile</h1>
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFirstName" className='mt-4'>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={user.firstName || ''}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={user.lastName || ''}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPhoneNo">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="phoneNo"
              value={user.phoneNo || ''}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formGender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              name="gender"
              value={user.gender ? user.gender.toUpperCase() : ''}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formDOB">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dob"
              value={user.dob || ''}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-5">
            Update Profile
          </Button>
        </Form>

        <h2 className="mt-5">Previous Orders</h2>
        {previousOrders.length > 0 ? (
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Items</th>
                <th>Review</th> {/* New column for review buttons */}
              </tr>
            </thead>
            <tbody>
              {previousOrders.map((order, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{order.amount}</td>
                  <td>{order.paymentMethod}</td>
                  <td>
                    {order.cartItems.length > 0 ? (
                      <ul>
                        {order.cartItems.map((item, idx) => (
                          <li key={idx}>
                            {item.title} - {item.quantity} x ${item.price}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span>No items in this order</span>
                    )}
                  </td>
                  <td>
                    {order.cartItems.length > 0 && (
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        onClick={() => handleReviewClick(order.cartItems[0])} // Pass the specific item
                      >
                        Add Review
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No previous orders found.</p>
        )}
      </Container>

      {/* Review Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Submit Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleReviewSubmit}>
            <Form.Group controlId="formRating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                name="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                min="1"  // Minimum value set to 1
                max="5"  // Maximum value set to 5
                required
              />
            </Form.Group>
            <Form.Group controlId="formComment">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit Review
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Footer />
    </div>
  );
};

export default ProfilePage;
