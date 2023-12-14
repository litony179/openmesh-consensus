import React from "react";

export const NavBar = () => {
  return (
    <div className="w-100">
      <nav className="navbar">
        <div className="navbar-logo">CONSENSUS</div>
        <div className="navbar-links">
          <a href="/how-it-works" className="navbar-link">How it works</a>
          <a href="/about" className="navbar-link">About</a>
          <a href="/services" className="navbar-link">Services</a>
        </div>
        <div className="navbar-actions">
          <button className="btn-login">Login</button>
          <button className="btn-get-started">Get Started</button>
        </div>
      </nav>
    </div>
  );
}