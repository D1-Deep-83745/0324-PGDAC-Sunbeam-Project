import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import config from '../config'; // Ensure this is the correct path to your config file
import { toast } from 'react-toastify';

function HeaderCategory() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  return (
    <div>
      <div style={{ marginTop: '80px' }}></div>
      {/* Second Navbar */}
      <Navbar className="mt navbar navbar-expand-lg navbar-light bg-info w-100">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100 justify-content-around">
            <Link to="/category/new_release" className="nav-link"><b>New Releases</b></Link>
            <Link to="/category/fiction" className="nav-link"><b>Fiction</b></Link>
            <Link to="/category/non_fiction" className="nav-link"><b>Non-Fiction</b></Link>
            <Link to="/category/childrens" className="nav-link"><b>Children's</b></Link>
            <Link to="/category/novels" className="nav-link"><b>Novels</b></Link>
            <Link to="/category/travel" className="nav-link"><b>Travel</b></Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default HeaderCategory;
