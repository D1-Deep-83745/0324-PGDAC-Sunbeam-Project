
import Footer from "../components/footer";
import Header from "../components/Header";
import React, { useState } from 'react';
import { Container, Card, Button, InputGroup, FormControl,Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";




export const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Book Title 1', price: 200, quantity: 1, imageUrl: '/images/book4.jpg' },
    { id: 2, name: 'Book Title 2', price: 315, quantity: 2, imageUrl: '/images/book5.jpg' },
    { id: 3, name: 'Book Title 3', price: 420, quantity: 1, imageUrl: '/images/Book1.jpg' },
  ]);

  const handleQuantityChange = (id, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Number(quantity) } : item
      )
    );
  };

  const handleDelete = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };
 
  const navigate=useNavigate();
  const handlecheckout=()=>{
    navigate(`checkout`)
  }
  return (
    <div>
    <Header />
    <Container className="mt-5">
      <h1 className="mb-4">Shopping Cart</h1>
      {cartItems.map((item) => (
        <Card key={item.id} className="mt-4 flex-row">
          {/* Changed layout to horizontal using flex-row */}
          <Card.Img src={item.imageUrl} style={{ width: '130px', height: '100' }} />
          <Card.Body className="d-flex flex-column">
            {/* Added d-flex and justify-content-between for horizontal layout */}
            <div>
                <Card.Title><h2>{item.name}</h2></Card.Title>
                </div>
            <div className="d-flex justify-content-between align-items-center mb-3 ">
              <InputGroup style={{ width: '80px' }}>
              <br />
                <InputGroup.Text>Quantity</InputGroup.Text>
                <FormControl
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                />
              </InputGroup>
              
                <div>
                <div>
                  <h4>Price: ₹{item.price.toFixed(2)}</h4>
                </div>
                <div>
                  <h4>Total: ₹{(item.price * item.quantity).toFixed(2)}</h4>
                </div>
              </div>
              <Button variant="danger" onClick={() => handleDelete(item.id)} className="ms-3">
                Delete
              </Button>
            </div>
          </Card.Body>
        </Card>
     ))}
     
        <Col className="mt-4 d-flex justify-content-end">
        <h2 className="mt-4 me-3">Total: ₹{getTotalPrice().toFixed(2)}</h2>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button onClick={handlecheckout} variant="success" className="mt-3 mb-4">Proceed to Checkout</Button>
        </Col>

    </Container>

    <Footer />
  </div>
  );
};

export default Cart;



// function Cart(){
//     return (
//         <div>
//             <Header/>
//             <h1>this is the cart page</h1>
//             <Footer/>
//         </div>
//     )
// }

// export default Cart;