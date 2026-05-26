import React, { useState } from 'react';
import { authAPI } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authAPI.signup(formData);
      alert('Account registered successfully! Redirecting to login page...');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center position-relative overflow-hidden" style={{ 
      minHeight: 'calc(100vh - 76px)', 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      padding: '20px'
    }}>
      {/* GLOBAL BACKGROUND DESIGN LAYER: Deep Organic Ambient Mesh Blurs */}
      <div className="position-absolute" style={{
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(13, 110, 253, 0.25) 0%, rgba(0, 212, 255, 0) 70%)',
        top: '-10%', left: '10%', filter: 'blur(60px)', pointerEvents: 'none'
      }}></div>
      <div className="position-absolute" style={{
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(0, 210, 255, 0.2) 0%, rgba(13, 110, 253, 0) 70%)',
        bottom: '-15%', right: '10%', filter: 'blur(60px)', pointerEvents: 'none'
      }}></div>

      {/* FOREGROUND DOCK INTERFACE: Solid Premium White Box Layout */}
      <div className="card border-0 p-5 shadow-lg position-relative overflow-hidden" style={{ 
        width: '100%', 
        maxWidth: '440px',
        borderRadius: '24px',
        background: '#ffffff',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}>
        
        {/* ================= HIGH-VISIBILITY GEOMETRIC SHAPES CORNER DESIGN ================= */}
        {/* Top Right: Layered Abstract Rings and Angular Vectors */}
        <div className="position-absolute" style={{
          width: '140px', height: '140px',
          background: 'linear-gradient(135deg, rgba(13, 110, 253, 0.22) 0%, rgba(0, 210, 255, 0.18) 100%)',
          borderRadius: '30px', transform: 'rotate(15deg)', top: '-40px', right: '-30px', pointerEvents: 'none'
        }}></div>
        <div className="position-absolute" style={{
          width: '90px', height: '90px',
          border: '2.5px dashed rgba(13, 110, 253, 0.35)',
          borderRadius: '50%', top: '15px', right: '-35px', pointerEvents: 'none'
        }}></div>
        
        {/* Bottom Left: Floating Solid Geometric Pill Objects */}
        <div className="position-absolute" style={{
          width: '120px', height: '40px',
          background: 'linear-gradient(135deg, rgba(0, 210, 255, 0.2) 0%, rgba(13, 110, 253, 0.15) 100%)',
          borderRadius: '20px', transform: 'rotate(-35deg)', bottom: '-10px', left: '-40px', pointerEvents: 'none'
        }}></div>
        <div className="position-absolute" style={{
          width: '35px', height: '35px',
          background: 'rgba(13, 110, 253, 0.18)',
          borderRadius: '8px', transform: 'rotate(45deg)', bottom: '50px', left: '20px', pointerEvents: 'none'
        }}></div>
        {/* ================================================================================== */}

        {/* INTERFACE CONTENT CONTAINER */}
        <div className="position-relative">
          <div className="text-center mb-4">
            <div className="d-inline-flex align-items-center justify-content-center mb-3 shadow-sm" style={{
              width: '56px', height: '56px',
              background: 'linear-gradient(135deg, #0d6efd 0%, #00d2ff 100%)',
              borderRadius: '16px'
            }}>
              <span className="fs-4 text-white">🚀</span>
            </div>
            <h2 className="fw-bold text-dark mb-1" style={{ letterSpacing: '-0.75px' }}>Get Started</h2>
            <p className="text-muted small">Create your free account to track instant analytics</p>
          </div>

          {error && (
            <div className="alert border-0 text-center small py-2.5 mb-4" style={{ 
              backgroundColor: '#fff5f5', 
              color: '#e53e3e', 
              borderRadius: '12px',
              fontWeight: '500'
            }}>
              ⚠️ {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <div>
              <label className="form-label small fw-bold text-secondary mb-1" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Full Name</label>
              <input 
                type="text" 
                required 
                placeholder="John Doe"
                className="form-control px-3 py-2.5" 
                style={{ 
                  borderRadius: '12px', 
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#f8fafc',
                  fontSize: '0.92rem',
                  color: '#334155'
                }}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div>
              <label className="form-label small fw-bold text-secondary mb-1" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Address</label>
              <input 
                type="email" 
                required 
                placeholder="name@example.com"
                className="form-control px-3 py-2.5" 
                style={{ 
                  borderRadius: '12px', 
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#f8fafc',
                  fontSize: '0.92rem',
                  color: '#334155'
                }}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            
            <div>
              <label className="form-label small fw-bold text-secondary mb-1" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Password</label>
              <input 
                type="password" 
                required 
                placeholder="••••••••"
                className="form-control px-3 py-2.5" 
                style={{ 
                  borderRadius: '12px', 
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#f8fafc',
                  fontSize: '0.92rem',
                  color: '#334155'
                }}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="btn text-white w-100 py-2.5 fw-bold mt-3 shadow-sm" 
              style={{
                background: 'linear-gradient(135deg, #0d6efd 0%, #00d2ff 100%)',
                border: 'none',
                borderRadius: '12px',
                fontSize: '0.95rem'
              }}
            >
              {loading ? (
                <span className="d-flex align-items-center justify-content-center gap-2">
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Creating Account...
                </span>
              ) : (
                'Create Account →'
              )}
            </button>
          </form>

          <p className="mt-4 text-center small text-muted mb-0">
            Already have an account? <Link to="/login" className="text-decoration-none fw-bold text-primary ms-1">Log in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;