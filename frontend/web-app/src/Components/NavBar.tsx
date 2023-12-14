import React from "react";
import { Link } from "react-router-dom";

/**
 * 
 * TODO: Navbar should change on these cases
 * 1. on Logged in -> set logout button
 * 2. on register screen
 */
export const NavBar = () => {
  return (
    <div className="w-100">
      <nav className="navbar">
        <Link to="/" className="navbar-home-link">CONSENSUS</Link>
        <div className="navbar-links">
          <Link to="/how-it-works" className="navbar-link">How it works</Link>
          <Link to="/about" className="navbar-link">About</Link>
          <Link to="/services" className="navbar-link">Services</Link>
        </div>
        <div className="navbar-actions">
          <Link to="/login">
            <button className="btn-login">Login</button>
          </Link>
          <Link to="/signup">
            <button className="btn-get-started">Get Started</button>
          </Link>
        </div>
      </nav>
    </div>
  );
}