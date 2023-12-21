import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";

export const NavBar = () => {
  const { isAuthenticated, logoutUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = async (e: any) => {
    e.preventDefault();

    await logoutUser();
    navigate('/home');
  };

  return (
    <div className="w-100">
      <nav className="navbar">
        <Link to="/" className="navbar-home-link">CONSENSUS</Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link" >How it works</Link>
          <Link to="/about" className="navbar-link">About</Link>
          <Link to="/services" className="navbar-link">Services</Link>
        </div>
        <div className="navbar-actions">
          {isAuthenticated ? (
            <>
              <button className="btn-login" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="btn-login">Login</button>
              </Link>
              <Link to="/signup">
                <button className="btn-get-started">Get Started</button>
              </Link>
            </>
          )}

        </div>
      </nav>
    </div>
  );
}
