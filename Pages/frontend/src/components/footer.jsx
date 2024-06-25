import { Container, Row, Col } from 'react-bootstrap';

function Footer(){
    return (
        
        <footer className="bg-dark text-white pt-4 pb-4 w-100">
          <Container>
            <Row>
              <Col md={4} sm={12} className="mb-3">
                <h5>Contact Us</h5>
                <p>Email: granthaverse@gmail.com</p>
                <p>Phone: +123 456 7890</p>
                <p>Address: 123 Main Street, City, Country</p>
              </Col>
              <Col md={4} sm={12} className="mb-3">
                <h5>Quick Links</h5>
                <ul className="list-unstyled">
                  <li><a href="#" className="text-white">Home</a></li>
                  <li><a href="#" className="text-white">About Us</a></li>
                  <li><a href="#" className="text-white">Services</a></li>
                  <li><a href="#" className="text-white">Contact</a></li>
                </ul>
              </Col>
              <Col md={4} sm={12} className="mb-3">
                <h5>Quick Links</h5>
                <ul className="list-unstyled">
                  <li><a href="#" className="text-white">Home</a></li>
                  <li><a href="#" className="text-white">About Us</a></li>
                  <li><a href="#" className="text-white">Services</a></li>
                  <li><a href="#" className="text-white">Contact</a></li>
                </ul>
              </Col>
            </Row>
            <Row>
              <Col className="text-center mt-3">
                <p className="mb-0">&copy; {new Date().getFullYear()} Grantha-Verse. All Rights Reserved.</p>
              </Col>
            </Row>
          </Container>
        </footer>
       
      );
}

export default Footer;