import React, { useState } from 'react';
import { Container, Form, Button, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS

const Register = () => {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [validated, setValidated] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleRegister = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    if (formValues.password !== formValues.confirmPassword) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
      setValidated(true);

      try {
        const response = await fetch('http://localhost:8080/bookstore/user/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            email: formValues.email,
            password: formValues.password,
            role: "", // Assuming this is optional or handled in backend
          }),
        });

        if (response.ok) {
          toast.success('Registration successful! You can now log in.');
          navigate('/login');
        } else {
          const errorText = await response.text();
          toast.error(`Registration failed: ${errorText}`);
        }
      } catch (error) {
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  const togglePasswordVisibility = (id) => {
    const input = document.getElementById(id);
    input.type = input.type === 'password' ? 'text' : 'password';
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div
      style={{
        backgroundImage: 'url(/images/background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container className="mt-5 p-4" style={{ maxWidth: '500px', backgroundColor: 'rgba(255, 255, 255, 0.9)', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
        <h1 style={{ fontFamily: 'Georgia, serif', textAlign: 'center', marginBottom: '20px', color: '#343a40' }}>User Registration</h1>
        <Form noValidate validated={validated} onSubmit={handleRegister}>
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>First Name:</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              required
              pattern="[^0-9]+"
              title="First name should not contain numbers"
              value={formValues.firstName}
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">Please provide a valid first name without numbers.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label>Last Name:</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              required
              pattern="[^0-9]+"
              title="Last name should not contain numbers"
              value={formValues.lastName}
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">Please provide a valid last name without numbers.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              required
              value={formValues.email}
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">Please provide a valid email address.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3 position-relative" controlId="password">
            <Form.Label>Password:</Form.Label>
            <InputGroup>
              <Form.Control
                type="password"
                name="password"
                required
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Password must contain at least one number, one uppercase, one lowercase letter, and at least 8 or more characters"
                value={formValues.password}
                onChange={handleInputChange}
              />
              <Button variant="outline-secondary" className="show-password" onClick={() => togglePasswordVisibility('password')}>
                <i className="bi bi-eye"></i>
              </Button>
            </InputGroup>
            <Form.Control.Feedback type="invalid">Password must contain at least one number, one uppercase, one lowercase letter, and at least 8 characters.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3 position-relative" controlId="confirmPassword">
            <Form.Label>Confirm Password:</Form.Label>
            <InputGroup>
              <Form.Control
                type="password"
                name="confirmPassword"
                required
                value={formValues.confirmPassword}
                onChange={handleInputChange}
                isInvalid={!passwordMatch}
              />
              <Button variant="outline-secondary" className="show-password" onClick={() => togglePasswordVisibility('confirmPassword')}>
                <i className="bi bi-eye"></i>
              </Button>
              <Form.Control.Feedback type="invalid">Please confirm your password.</Form.Control.Feedback>
              {!passwordMatch && <div className="invalid-feedback" id="confirmPasswordFeedback">Passwords do not match.</div>}
            </InputGroup>
          </Form.Group>
          <Button type="submit" className="btn-primary" style={{ width: '100%', padding: '10px' }}>Register</Button>
          <Button onClick={goToLogin} variant="secondary" className="btn-secondary mt-2" style={{ width: '100%' }}>Already a user? Login</Button>
        </Form>
      </Container>
    </div>
  );
};

export default Register;
