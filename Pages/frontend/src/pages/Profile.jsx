import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import Header from '../components/header';
import Footer from '../components/footer';
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get(`${config.url}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
      } catch (err) {
        console.error(err); // Log the error for debugging
        setError('Failed to fetch user details.');
      }
    };

    fetchUserDetails();
  }, [navigate]);

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

  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <Header />
      <br/>
      <br/>
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
      </Container>
      <Footer />
    </div>
  );
};

export default ProfilePage;
