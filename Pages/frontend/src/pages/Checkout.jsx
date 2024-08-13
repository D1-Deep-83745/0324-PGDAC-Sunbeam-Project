import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form , Table} from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../config';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = location.state || {};

  const userId = sessionStorage.getItem("userId");

  if (!cartItems) {
    return <div>Your order is confirmed</div>;
  }

  // State for addresses and address handling
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`${config.url}/address/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          }
        });
        setAddresses(response.data);
      } catch (err) {
        console.error('Error fetching addresses', err);
      }
    };
    fetchAddresses();
  }, [userId]);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  const handleAddressFormChange = (event) => {
    const { name, value } = event.target;
    setAddressForm({ ...addressForm, [name]: value });
  };

  const handleAddAddress = async () => {
    try {
      await axios.post(`${config.url}/address/user/${userId}`, addressForm, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      setAddresses([...addresses, addressForm]);
      setAddressForm({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
      });
      setIsAddingAddress(false);
      toast.success('Address added successfully');
    } catch (err) {
      console.error('Error adding address', err);
      toast.error('Failed to add address');
    }
  };

  const notify = () => {
    toast.success("Order Successfully Placed...");
    navigate("/");
  };

  return (
    <Container>
      <Header />
      <div style={{ marginTop: '80px' }}></div>
      <Row>
        <Col>
          <h1>Checkout Details</h1>
        </Col>
        <Col className="text-end">
          <Button variant="success" onClick={() => navigate('/user/profile')}>Edit Profile</Button>
        </Col>
      </Row>
      <br />
      <Card className="mb-4">
        <Card.Header as="h5">Order Summary</Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Book Title</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.title || 'N/A'}</td>
                  <td>{item.quantity || 'N/A'}</td>
                  <td>₹{item.price ? item.price.toFixed(2) : 'N/A'}</td>
                  <td>₹{item.quantity && item.price ? (item.quantity * item.price).toFixed(2) : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h4>Total: ₹{getTotalPrice().toFixed(2)}</h4>
        </Card.Body>
      </Card>

      <Form>
        <Form.Group controlId="shippingAddress">
          <Form.Label>Select Shipping Address</Form.Label>
          <Form.Control
            as="select"
            value={selectedAddress}
            onChange={handleAddressChange}
            required
          >
            <option value="">Choose...</option>
            {addresses.map((address, index) => (
              <option key={address.id} value={address.id}>
                {address.street}, {address.city}, {address.state}, {address.zipCode}, {address.country}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button
          onClick={() => setIsAddingAddress(!isAddingAddress)}
          variant="primary"
          className="mt-3"
        >
          {isAddingAddress ? 'Cancel' : 'Add Address'}
        </Button>
        {isAddingAddress && (
          <div className="mt-3">
            <Form.Group controlId="addressStreet">
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                name="street"
                placeholder="Enter street"
                value={addressForm.street}
                onChange={handleAddressFormChange}
              />
            </Form.Group>
            <Form.Group controlId="addressCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                placeholder="Enter city"
                value={addressForm.city}
                onChange={handleAddressFormChange}
              />
            </Form.Group>
            <Form.Group controlId="addressState">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                name="state"
                placeholder="Enter state"
                value={addressForm.state}
                onChange={handleAddressFormChange}
              />
            </Form.Group>
            <Form.Group controlId="addressZipCode">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                name="zipCode"
                placeholder="Enter zip code"
                value={addressForm.zipCode}
                onChange={handleAddressFormChange}
              />
            </Form.Group>
            <Form.Group controlId="addressCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                placeholder="Enter country"
                value={addressForm.country}
                onChange={handleAddressFormChange}
              />
            </Form.Group>
            <Button
              onClick={handleAddAddress}
              variant="primary"
              className="mt-3"
            >
              Save Address
            </Button>
          </div>
        )}
      </Form>
      <br/>

      <Card className="mb-4">
        <Card.Header as="h5">Payment Details</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group controlId="paymentMethod">
              <Form.Label>Select Payment Method</Form.Label>
              <Form.Control as="select" required>
                <option value="">Choose...</option>
                <option value="CREDIT_CARD">CREDIT_CARD</option>
                <option value="DEBIT_CARD">DEBIT_CARD</option>
                <option value="PAYPAL">PAYPAL</option>
                <option value="CASH">CASH</option>
                <option value="BANK_TRANSFER">BANK_TRANSFER</option>
                <option value="UPI">UPI</option>
                <option value="COD">COD</option>
              </Form.Control>
            </Form.Group>
            <Button onClick={notify} variant="primary" className="mt-3">
              Place Order
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CheckoutPage;
