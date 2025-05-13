// src/components/NavBar.js
import React from 'react';
import './NavBar.css';
import { Link } from "react-router-dom";

const NavBar = ({ totalItems }) => { // Changed 'cartCount' to 'totalItems'
  return (
    <nav className="navbar">
      <h1>StreamList</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/subscriptions">Subscriptions</Link>
        <Link to="/accessories">Accessories</Link>
        <Link to="/cart">Cart ({totalItems})</Link> {/* Now using the correct prop name */}
      </div>
    </nav>
  );
};

export default NavBar;