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
    <nav className="navbar navbar-expand-lg sticky-top border-bottom position-relative overflow-hidden" style={{ 
      background: '#ffffff', 
      borderColor: '#e2e8f0',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      minHeight: '76px'
    }}>
      
      {/* ================= NAVBAR GEOMETRIC ACCENT SYSTEM ================= */}
      {/* Left Side Accent: Angled Pill Object */}
      <div className="position-absolute" style={{
        width: '100px', height: '25px',
        background: 'linear-gradient(135deg, rgba(13, 110, 253, 0.18) 0%, rgba(0, 210, 255, 0.12) 100%)',
        borderRadius: '12px', transform: 'rotate(-15deg)', left: '-20px', top: '10px', pointerEvents: 'none'
      }}></div>
      
      {/* Right Side Accent: Layered Tiny Square & Dashed Arc */}
      <div className="position-absolute" style={{
        width: '20px', height: '20px',
        background: 'rgba(13, 110, 253, 0.15)',
        borderRadius: '5px', transform: 'rotate(45deg)', right: '40px', bottom: '8px', pointerEvents: 'none'
      }}></div>
      <div className="position-absolute" style={{
        width: '60px', height: '60px',
        border: '2px dashed rgba(0, 210, 255, 0.3)',
        borderRadius: '50%', right: '-25px', top: '-20px', pointerEvents: 'none'
      }}></div>
      {/* ================================================================== */}

      {/* INTERFACE CONTENT CONTAINER */}
      <div className="container d-flex justify-content-between align-items-center px-4 position-relative">
        <Link to="/" className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2" style={{ 
          background: 'linear-gradient(135deg, #0d6efd 0%, #00d2ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.75px'
        }}>
          <span>🔗</span> URL Shortener
        </Link>
        
        <div>
          {token ? (
            <button onClick={handleLogout} className="btn fw-bold px-4 shadow-sm" style={{
              background: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
              color: 'white',
              borderRadius: '10px',
              border: 'none',
              fontSize: '0.9rem'
            }}>
              Logout
            </button>
          ) : (
            <div className="d-flex gap-3 align-items-center">
              <Link to="/login" className="btn fw-bold text-secondary px-3" style={{ border: 'none', fontSize: '0.9rem' }}>
                Login
              </Link>
              <Link to="/signup" className="btn fw-bold px-4 text-white shadow-sm" style={{
                background: 'linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%)',
                borderRadius: '10px',
                border: 'none',
                fontSize: '0.9rem'
              }}>
                Signup free
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;