import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button, Container, Row, Col } from 'react-bootstrap';
import { text } from '@fortawesome/fontawesome-svg-core';

function Header() {
  return (
    <>
    
      {/* First Navbar */}
      <Navbar className="navbar navbar-expand-lg navbar-light bg-light w-100 fixed-top">
        <div className="container-fluid py-2">
          <a className="navbar-brand" href="#"><b>MyBookStore</b></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <form className="d-flex mx-auto my-2 my-lg-0 w-50">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn test-white bg-success" type="submit"><bsss>Search</bsss></button>
            </form>
            <div className="d-flex">
              <a className="btn btn-outline-primary me-2" href="#">Login</a>
              <a className="btn btn-outline-secondary me-2" href="#">Wishlist</a>
              <a className="btn btn-outline-danger" href="#">Cart</a>
            </div>
          </div>
        </div>
      </Navbar>

      <br />
      <br />
      <br />
      
      {/* Second Navbar */}
      <Navbar className="navbar navbar-expand-lg navbar-light bg-info w-100 ">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="w-100 justify-content-around">
          <Nav.Link href="#category1"><b>Category 1</b></Nav.Link>
          <Nav.Link href="#category2"><b>Category 2</b></Nav.Link>
          <Nav.Link href="#category3"><b>Category 3</b></Nav.Link>
          <Nav.Link href="#category4"><b>Category 4</b></Nav.Link>
          <Nav.Link href="#category5"><b>Category 5</b></Nav.Link>
          <Nav.Link href="#category5"><b>Category 6</b></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

 
    </>
  );
}

export default Header;
