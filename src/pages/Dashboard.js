import React, { useState, useEffect } from 'react';
import { urlAPI } from '../services/api';

const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  const [longUrl, setLongUrl] = useState('');
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 1. DEFINE API DATA FUNCTIONS AT THE TOP TO FIX HOISTING SCOPE
  const fetchUrls = async () => {
    try {
      const response = await urlAPI.getAll();
      setUrls(response.data);
    } catch (err) {
      console.error('Failed to load URLs');
    }
  };

  const handleViewAnalytics = async (url) => {
    setSelectedUrl(url);
    try {
      const response = await urlAPI.getAnalytics(url._id);
      setAnalytics(response.data);
    } catch (err) {
      alert('Failed to fetch analytics');
    }
  };

  // 2. EFFECT HOOK SAFELY REFERENCES PRE-DECLARED FUNCTIONS
  useEffect(() => {
    fetchUrls();

    // Automatically refresh data when the user switches back to this browser tab
    const handleWindowFocus = () => {
      fetchUrls();
      
      // If the user has a specific link's stats panel open, refresh those stats too!
      if (selectedUrl) {
        handleViewAnalytics(selectedUrl);
      }
    };

    window.addEventListener('focus', handleWindowFocus);
    
    // Clean up the event listener when the component unmounts to prevent memory leaks
    return () => {
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, [selectedUrl]); // Tracking selectedUrl ensures the stats panel updates smoothly too

  // 3. ACTION EVENT HANDLERS
  const handleShorten = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await urlAPI.shorten(longUrl);
      setUrls([response.data, ...urls]);
      setLongUrl('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to shorten URL.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this URL?')) {
      try {
        await urlAPI.delete(id);
        setUrls(urls.filter((url) => url._id !== id));
        if (selectedUrl?._id === id) {
          setSelectedUrl(null);
          setAnalytics(null);
        }
      } catch (err) {
        alert('Failed to delete URL');
      }
    }
  };

  return (
    <div className="container py-5">
      {/* Premium Studio Branding Header */}
      <div className="mb-5">
        <h1 className="fw-bold text-dark mb-1" style={{ letterSpacing: '-1px' }}>Link Management Studio</h1>
        <p className="text-muted mb-0">Create, deploy, and inspect the structural health of your active short codes.</p>
      </div>

      <div className="row g-4">
        {/* Left Side: Shortener Panel & Links Table */}
        <div className="col-12 col-md-8 d-flex flex-column gap-4">
          
          {/* URL Input Form Card */}
          <div className="card border-0 p-4 shadow-sm" style={{ borderRadius: '20px', background: '#ffffff' }}>
            <h5 className="fw-bold text-dark mb-3">Shorten a New Target Destination</h5>
            <form onSubmit={handleShorten} className="input-group">
              <input 
                type="text" 
                placeholder="Paste your link here (e.g., https://example.com)..." 
                value={longUrl} 
                onChange={(e) => setLongUrl(e.target.value)} 
                required
                className="form-control form-control-lg border-end-0 px-4"
                style={{ 
                  borderRadius: '14px 0 0 14px', 
                  fontSize: '0.95rem',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0'
                }}
              />
              <button 
                type="submit" 
                disabled={loading} 
                className="btn text-white px-4 fw-bold"
                style={{
                  background: 'linear-gradient(135deg, #0d6efd 0%, #00d2ff 100%)',
                  borderRadius: '0 14px 14px 0',
                  border: 'none',
                  minWidth: '130px'
                }}
              >
                {loading ? 'Processing...' : 'Shorten Link'}
              </button>
            </form>
            {error && (
              <div className="mt-3 p-2 text-danger small bg-light border-start border-danger border-3 rounded">
                ⚠️ {error}
              </div>
            )}
          </div>

          {/* Links Tracking Data Table Card */}
          <div className="card border-0 shadow-sm overflow-hidden" style={{ borderRadius: '20px', background: '#ffffff' }}>
            <div className="px-4 py-3 border-bottom d-flex justify-content-between align-items-center" style={{ borderColor: '#f1f5f9' }}>
              <h5 className="fw-bold text-dark m-0">Your Active Links</h5>
              <span className="badge bg-light text-primary border px-3 py-2 rounded-pill fw-bold">{urls.length} Links Active</span>
            </div>

            {urls.length === 0 ? (
              <div className="text-center py-5">
                <span className="fs-1 d-block mb-2">📁</span>
                <p className="text-muted small mb-0">No shortened URLs yet. Shorten your first link above!</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table align-middle table-hover m-0">
                  <thead className="table-light text-secondary small text-uppercase" style={{ fontSize: '0.75rem', fontWeight: '700' }}>
                    <tr>
                      <th className="px-4 py-3">Original Link</th>
                      <th className="py-3">Short Link</th>
                      <th className="text-center py-3">Clicks</th>
                      <th className="text-center py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="small text-secondary" style={{ fontSize: '0.88rem' }}>
                    {urls.map((url) => (
                      <tr key={url._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td className="px-4 text-truncate fw-medium" style={{ maxWidth: '200px', color: '#64748b' }}>{url.longUrl}</td>
                        <td>
                          <a 
                            href={`http://localhost:5000/r/${url.shortCode}`} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="fw-bold text-decoration-none"
                            style={{ color: '#0d6efd' }}
                          >
                            {url.shortCode}
                          </a>
                        </td>
                        <td className="text-center fw-bold text-dark">{url.clicks}</td>
                        <td className="text-center px-4">
                          <div className="btn-group shadow-sm bg-white rounded-3">
                            <button 
                              onClick={() => handleViewAnalytics(url)} 
                              className={`btn btn-sm px-3 fw-medium ${selectedUrl?._id === url._id ? 'btn-primary text-white' : 'btn-light border-end'}`}
                            >
                              Stats
                            </button>
                            <button 
                              onClick={() => {
                                navigator.clipboard.writeText(`http://localhost:5000/r/${url.shortCode}`);
                                alert('Copied link!');
                              }} 
                              className="btn btn-sm btn-light px-3 fw-medium border-end text-dark"
                            >
                              Copy
                            </button>
                            <button 
                              onClick={() => handleDelete(url._id)} 
                              className="btn btn-sm btn-light px-3 fw-medium text-danger"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Analytical Deep Dive Insight Card */}
        <div className="col-12 col-md-4">
          <div className="card border-0 p-4 shadow-sm sticky-top" style={{ top: '100px', borderRadius: '20px', background: '#ffffff' }}>
            <h5 className="fw-bold text-dark mb-4">Performance Metrics</h5>
            {!selectedUrl ? (
              <div className="text-center py-4 bg-light rounded-4 border border-dashed p-3">
                <span className="fs-2 d-block mb-2">📊</span>
                <p className="text-muted small m-0">Click "Stats" next to an active link to view granular engine tracking.</p>
              </div>
            ) : !analytics ? (
              <div className="text-center py-4">
                <div className="spinner-border spinner-border-sm text-primary mb-2" role="status"></div>
                <p className="text-muted small animate-pulse m-0">Fetching data logs...</p>
              </div>
            ) : (
              <div className="d-flex flex-column gap-4">
                <div>
                  <span className="text-uppercase text-muted d-block small fw-bold tracking-wider" style={{ fontSize: '0.7rem' }}>Short Code Identifier</span>
                  <span className="fs-3 fw-bold" style={{
                    background: 'linear-gradient(135deg, #0d6efd 0%, #00d2ff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>{selectedUrl.shortCode}</span>
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <div className="p-3 rounded-4 text-center" style={{ backgroundColor: '#f0f7ff', border: '1px solid #e0effe' }}>
                      <span className="text-primary d-block small fw-semibold mb-1">Total Hits</span>
                      <span className="fs-3 fw-bold text-primary">{analytics.totalClicks}</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="p-3 rounded-4 text-center" style={{ backgroundColor: '#f8fafc', border: '1px solid #f1f5f9' }}>
                      <span className="text-muted d-block small fw-semibold mb-1">Created</span>
                      <span className="fw-bold text-dark d-block mt-1" style={{ fontSize: '0.85rem' }}>{new Date(selectedUrl.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <span className="text-uppercase text-muted d-block small fw-bold tracking-wider mb-1" style={{ fontSize: '0.7rem' }}>Last Interaction Log</span>
                  <span className="text-dark fw-semibold small d-block p-2 bg-light rounded-3">
                    ⏰ {analytics.lastVisited ? new Date(analytics.lastVisited).toLocaleString() : 'Never Interacted'}
                  </span>
                </div>
                <div>
                  <span className="text-uppercase text-muted d-block small fw-bold tracking-wider mb-2" style={{ fontSize: '0.7rem' }}>Recent Visits (Max 5)</span>
                  {analytics.recentVisits.length === 0 ? (
                    <p className="text-muted small italic bg-light p-2 rounded-3 text-center m-0">No entries recorded.</p>
                  ) : (
                    <div className="d-flex flex-column gap-2">
                      {analytics.recentVisits.map((visit, index) => (
                        <div 
                          key={index} 
                          className="d-flex align-items-center bg-light border-start border-primary border-3 p-2 rounded-3 text-secondary"
                          style={{ fontSize: '0.82rem', fontFamily: 'monospace' }}
                        >
                          <span className="me-2">📍</span>
                          {new Date(visit.timestamp).toLocaleString()}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;