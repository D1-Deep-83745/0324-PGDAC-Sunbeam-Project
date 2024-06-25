import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
//import { text } from '@fortawesome/fontawesome-svg-core';

function Header() {
  

  return (
    <div>
    
     
      <Navbar className="navbar navbar-expand-lg navbar-light bg-light w-100 fixed-top">
        <div className="container-fluid py-2">
          <a className="navbar-brand" href="/"><img height={30} width={200} src="/images/MyLogo.png" alt="" /></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <form className="d-flex mx-auto my-2 my-lg-0 w-50">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn test-white bg-success" type="submit"><bsss>Search</bsss></button>
            </form>
            <div className="d-flex">
             <Link to="/login" className="btn btn-outline-primary me-2"><FontAwesomeIcon icon={faUser} /> Login</Link>
            <Link to="/wishlist" className="btn btn-outline-secondary me-2"><FontAwesomeIcon icon={faHeart} /></Link>
            <Link to="/cart" className="btn btn-outline-danger"><FontAwesomeIcon icon={faShoppingCart} /> </Link>
            </div>
          </div>
        </div>
      </Navbar>

      <div style={{ marginTop: '80px' }}></div>
      
      {/* Second Navbar */}
      <Navbar className="mt navbar navbar-expand-lg navbar-light bg-info w-100 ">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="w-100 justify-content-around">
          <Nav.Link href="/category1"><b>Category 1</b></Nav.Link>
          <Nav.Link href="/category2"><b>Category 2</b></Nav.Link>
          <Nav.Link href="/category3"><b>Category 3</b></Nav.Link>
          <Nav.Link href="/category4"><b>Category 4</b></Nav.Link>
          <Nav.Link href="/category5"><b>Category 5</b></Nav.Link>
          <Nav.Link href="/category6"><b>Category 6</b></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

    </div>

    
  );
}

export default Header;
