import React, { useState, useEffect } from 'react';
import { urlAPI } from '../services/api';

const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  const [longUrl, setLongUrl] = useState('');
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const response = await urlAPI.getAll();
      setUrls(response.data);
    } catch (err) {
      console.error('Failed to load URLs');
    }
  };

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

  const handleViewAnalytics = async (url) => {
    setSelectedUrl(url);
    try {
      const response = await urlAPI.getAnalytics(url._id);
      setAnalytics(response.data);
    } catch (err) {
      alert('Failed to fetch analytics');
    }
  };

  return (
    <div className="container py-5">
      <div className="row g-4">
        {/* Left Side: Shortener Panel & Links Table */}
        <div className="col-12 col-md-8 d-flex flex-column gap-4">
          {/* URL Input Form Card */}
          <div className="card shadow-sm border-0 p-4">
            <h4 className="fw-bold text-dark mb-3">Shorten a Long URL</h4>
            <form onSubmit={handleShorten} className="input-group">
              <input 
                type="text" placeholder="Paste your link here (e.g., https://example.com)..." 
                value={longUrl} onChange={(e) => setLongUrl(e.target.value)} required
                className="form-control form-control-lg"
              />
              <button type="submit" disabled={loading} className="btn btn-primary px-4 fw-medium">
                {loading ? 'Processing...' : 'Shorten'}
              </button>
            </form>
            {error && <p className="text-danger small mt-2 mb-0">{error}</p>}
          </div>

          {/* Links Tracking Data Table Card */}
          <div className="card shadow-sm border-0 overflow-hidden">
            <h4 className="fw-bold text-dark p-4 border-b m-0">Your Active Links</h4>
            {urls.length === 0 ? (
              <p className="text-muted text-center py-5 m-0">No shortened URLs yet. Shorten your first link above!</p>
            ) : (
              <div className="table-responsive">
                <table className="table align-middle table-hover m-0">
                  <thead className="table-light text-secondary small text-uppercase">
                    <tr>
                      <th className="px-4 py-3">Original Link</th>
                      <th className="py-3">Short Link</th>
                      <th className="text-center py-3">Clicks</th>
                      <th className="text-center py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="small">
                    {urls.map((url) => (
                      <tr key={url._id}>
                        <td className="px-4 text-truncate text-muted" style={{ maxWidth: '200px' }}>{url.longUrl}</td>
                        <td>
                          <a href={`http://localhost:5000/r/${url.shortCode}`} target="_blank" rel="noreferrer" className="fw-bold text-decoration-none text-primary">
                            {url.shortCode}
                          </a>
                        </td>
                        <td className="text-center fw-bold text-secondary">{url.clicks}</td>
                        <td className="text-center px-4">
                          <div className="btn-group btn-group-sm">
                            <button onClick={() => handleViewAnalytics(url)} className="btn btn-light border">Stats</button>
                            <button onClick={() => {
                              navigator.clipboard.writeText(`http://localhost:5000/r/${url.shortCode}`);
                              alert('Copied link!');
                            }} className="btn btn-outline-primary">Copy</button>
                            <button onClick={() => handleDelete(url._id)} className="btn btn-outline-danger">Delete</button>
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
          <div className="card shadow-sm border-0 p-4 sticky-top" style={{ top: '24px' }}>
            <h4 className="fw-bold text-dark mb-4">Performance Metrics</h4>
            {!selectedUrl ? (
              <p className="text-muted small m-0">Click "Stats" next to an active link to view granular engine tracking.</p>
            ) : !analytics ? (
              <p className="text-muted small animate-pulse m-0">Fetching data logs...</p>
            ) : (
              <div className="d-flex flex-column gap-3">
                <div>
                  <span className="text-uppercase text-muted d-block small fw-bold tracking-wider">Short Code Identifier</span>
                  <span className="fs-4 fw-bold text-primary">{selectedUrl.shortCode}</span>
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <div className="bg-light p-3 rounded text-center">
                      <span className="text-muted d-block small mb-1">Total Hits</span>
                      <span className="fs-3 fw-bold text-dark">{analytics.totalClicks}</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="bg-light p-3 rounded text-center">
                      <span className="text-muted d-block small mb-1">Created</span>
                      <span className="fw-bold text-dark d-block mt-1 small">{new Date(selectedUrl.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <span className="text-uppercase text-muted d-block small fw-bold tracking-wider">Last Interaction Log</span>
                  <span className="text-dark fw-medium small">{analytics.lastVisited ? new Date(analytics.lastVisited).toLocaleString() : 'Never Interacted'}</span>
                </div>
                <div>
                  <span className="text-uppercase text-muted d-block small fw-bold tracking-wider mb-2">Recent Visits (Max 5)</span>
                  {analytics.recentVisits.length === 0 ? (
                    <p className="text-muted small italic m-0">No entries recorded.</p>
                  ) : (
                    <div className="d-flex flex-column gap-1">
                      {analytics.recentVisits.map((visit, index) => (
                        <div key={index} className="bg-light border-start border-primary border-3 p-2 rounded small font-mono text-secondary">
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