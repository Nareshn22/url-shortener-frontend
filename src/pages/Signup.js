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
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong during signup.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 76px)', backgroundColor: '#f8f9fa' }}>
      <div className="card shadow-sm border-0 p-4" style={{ width: '100%', maxWidth: '420px' }}>
        <h2 className="text-center fw-bold text-dark mb-4">Create Account</h2>
        {error && <div className="alert alert-danger py-2 text-center small">{error}</div>}
        
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <div>
            <label className="form-label fw-medium text-secondary mb-1">Full Name</label>
            <input 
              type="text" required className="form-control py-2"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="form-label fw-medium text-secondary mb-1">Email Address</label>
            <input 
              type="email" required className="form-control py-2"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="form-label fw-medium text-secondary mb-1">Password</label>
            <input 
              type="password" required className="form-control py-2"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary w-100 py-2 fw-bold mt-2">
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-4 text-center small text-muted">
          Already have an account? <Link to="/login" className="text-decoration-none fw-medium">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;