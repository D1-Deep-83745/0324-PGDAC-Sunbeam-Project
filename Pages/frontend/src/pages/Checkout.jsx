import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Table, Modal } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/header';
import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../config';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems: initialCartItems } = location.state || {};

  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem('token');

  const [cartItems, setCartItems] = useState(initialCartItems || []);
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
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`${config.url}/address/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAddresses(response.data);
      } catch (err) {
        console.error('Error fetching addresses', err);
        toast.error('Failed to fetch addresses');
      }
    };
    
    if (userId) {
      fetchAddresses();
    }
  }, [userId, token]);

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
          Authorization: `Bearer ${token}`
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

  const handleShowConfirmModal = () => setShowConfirmModal(true);
  const handleCloseConfirmModal = () => setShowConfirmModal(false);
  const handleShowOtpModal = () => setShowOtpModal(true);
  const handleCloseOtpModal = () => setShowOtpModal(false);

  const handleConfirmOrder = async () => {
    try {
      setGeneratedOtp(); 
      handleShowOtpModal();
    } catch (err) {
      console.error('Error generating OTP', err);
      toast.error('Failed to generate OTP');
    } finally {
      handleCloseConfirmModal();
    }
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleVerifyOtp = async () => {
    try {
      if (otp) {
        const orderRequest = {
          amount: getTotalPrice().toFixed(2),
          cartItems,
          selectedAddressId: selectedAddress,
          paymentMethod: selectedPaymentMethod
        };
        const response = await axios.post(`${config.url}/orders/placeOrder/${userId}`, orderRequest, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.status === 200) {
          toast.success("Order Successfully Placed...");
          localStorage.clear()
          navigate("/");
        } else {
          toast.error('Invalid OTP');
        }
      } else {
        toast.error('Invalid OTP');
      }
    } catch (err) {
      console.error('Error placing order', err);
      toast.error('Failed to place order');
    } finally {
      handleCloseOtpModal();
    }
  };

  return (
    <Container>
      <Header />
      <div style={{ marginTop: '80px' }}></div>
      <Row>
        <Col>
          <h1>Checkout Details</h1>
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
            {addresses.map((address) => (
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
              <Form.Control
                as="select"
                value={selectedPaymentMethod}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                required
              >
                <option value="">Choose...</option>
                <option value="CREDIT_CARD">CREDIT_CARD</option>
                <option value="DEBIT_CARD">DEBIT_CARD</option>
                <option value="PAYPAL">PAYPAL</option>
                <option value="CASH">CASH</option>
                <option value="BANK_TRANSFER">BANK_TRANSFER</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
      
      <Button variant="primary" onClick={handleShowConfirmModal} disabled={!selectedAddress || !selectedPaymentMethod}>
        Confirm Order
      </Button>

      <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to place this order?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmOrder}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showOtpModal} onHide={handleCloseOtpModal}>
        <Modal.Header closeButton>
          <Modal.Title>Enter OTP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="otp">
            <Form.Label>OTP</Form.Label>
            <Form.Control
              type="text"
              value={otp}
              onChange={handleOtpChange}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseOtpModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleVerifyOtp}>
            Verify and Place Order
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CheckoutPage;
