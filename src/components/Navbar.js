import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm py-3 px-4">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link to="/" className="navbar-brand fw-bold fs-4">
          🔗 SnapLink
        </Link>
        <div>
          {token ? (
            <button onClick={handleLogout} className="btn btn-danger fw-medium px-4">
              Logout
            </button>
          ) : (
            <div className="d-flex gap-3">
              <Link to="/login" className="btn btn-outline-light fw-medium">Login</Link>
              <Link to="/signup" className="btn btn-light text-primary fw-medium px-4">Signup</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;