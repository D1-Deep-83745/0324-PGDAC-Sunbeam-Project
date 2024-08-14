import React, { useState } from 'react';
import { Container, Form, Button, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast} from 'react-toastify'; // Correct import
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import config from '../config';

const Login = () => {
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
  });

  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setValidated(true);
      setError('');

      try {
        const response = await fetch(`${config.url}/user/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formValues.username,
            password: formValues.password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          sessionStorage.setItem('token', data.jwt);
          sessionStorage.setItem('firstname', data.firstName);
          sessionStorage.setItem('userId', data.id);
          toast.success(`Welcome ${data.firstName} to Grantha-Verse`);
          sessionStorage.setItem('isLoggedIn', true);
          navigate(`/`);
        } else {
          toast.error(`Login failed , please retry`);
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
        <h1 style={{ fontFamily: 'Georgia, serif', textAlign: 'center', marginBottom: '20px', color: '#343a40' }}>User Login</h1>
        <Form noValidate validated={validated} >
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>User Id</Form.Label>
            <Form.Control
              type="text"
              name="username"
              required
              value={formValues.username}
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">Please provide a valid username.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3 position-relative" controlId="password">
            <Form.Label>Password:</Form.Label>
            <InputGroup>
              <Form.Control
                type="password"
                name="password"
                required
                value={formValues.password}
                onChange={handleInputChange}
              />
              <Button variant="outline-secondary" className="show-password" onClick={() => togglePasswordVisibility('password')}>
                <i className="bi bi-eye"></i>
              </Button>
            </InputGroup>
            <Form.Control.Feedback type="invalid">Password is required.</Form.Control.Feedback>
          </Form.Group>
          
          {error && <div className="alert alert-danger">{error}</div>}

          <Button onClick={handleSubmit} type="submit" className="btn-primary" style={{ width: '100%', padding: '10px' }}>Login</Button>
          <Link to="/register"><p>Not registered yet? Register</p></Link>   
        </Form>
      </Container>
    </div>
  );
};

export default Login;
