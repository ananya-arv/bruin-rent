import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { listingAPI } from '../services/api';
import ListingCard from '../components/ListingCard';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user, isGuest, logout } = useAuth();
  const navigate = useNavigate();
  const [myListings, setMyListings] = useState([]);
  const [recentListings, setRecentListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [myListingsRes, allListingsRes] = await Promise.all([
        listingAPI.getMyListings(),
        listingAPI.getAllListings()
      ]);
      
      setMyListings(myListingsRes.data.data);
      setRecentListings(allListingsRes.data.data.slice(0, 3));
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="welcome-section">
            <h1>Welcome back, {user?.name}! 👋</h1>
            <p className="user-email">{user?.email}</p>
          </div>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-info">
              <h3>{myListings.length}</h3>
              <p>Your Listings</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>
                {myListings.filter(l => l.availability === 'Available').length}
              </h3>
              <p>Available</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <h3>
                {myListings.filter(l => l.availability === 'Pending').length}
              </h3>
              <p>Pending</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🏠</div>
            <div className="stat-info">
              <h3>
                {myListings.filter(l => l.availability === 'Rented').length}
              </h3>
              <p>Rented</p>
            </div>
          </div>
        </div>

        <div className="dashboard-actions">
          <button 
            className="action-card create-listing-card"
            onClick={() => navigate('/create-listing')}
          >
            <div className="action-icon">➕</div>
            <h3>Create New Listing</h3>
            <p>Post your sublease or available room</p>
          </button>

          <button 
            className="action-card browse-listings-card"
            onClick={() => navigate('/listings')}
          >
            <div className="action-icon">🔍</div>
            <h3>Browse All Listings</h3>
            <p>Find your perfect housing near UCLA</p>
          </button>

          <button 
            className="action-card my-listings-card"
            onClick={() => navigate('/my-listings')}
          >
            <div className="action-icon">📋</div>
            <h3>Manage My Listings</h3>
            <p>View and edit your posted listings</p>
          </button>
        </div>

        <div className="dashboard-sections">
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Your Recent Listings</h2>
              <button 
                className="view-all-link"
                onClick={() => navigate('/my-listings')}
              >
                View All →
              </button>
            </div>
            
            {myListings.length === 0 ? (
              <div className="empty-state-small">
                <p>You haven't created any listings yet</p>
                <button onClick={() => navigate('/create-listing')}>
                  Create Your First Listing
                </button>
              </div>
            ) : (
              <div className="listings-preview">
                {myListings.slice(0, 2).map((listing) => (
                  <div key={listing._id} className="mini-listing-card">
                    <div className="mini-listing-content">
                      <h4>{listing.title}</h4>
                      <p className="mini-address">📍 {listing.address}</p>
                      <div className="mini-details">
                        <span className="mini-price">${listing.price}/mo</span>
                        <span className={`mini-status ${listing.availability.toLowerCase()}`}>
                          {listing.availability}
                        </span>
                      </div>
                    </div>
                    <button 
                      className="mini-view-btn"
                      onClick={() => navigate(`/listings/${listing._id}`)}
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="dashboard-section">
            <div className="section-header">
              <h2>Recently Posted</h2>
              <button 
                className="view-all-link"
                onClick={() => navigate('/listings')}
              >
                View All →
              </button>
            </div>
            
            {recentListings.length === 0 ? (
              <div className="empty-state-small">
                <p>No listings available yet</p>
              </div>
            ) : (
              <div className="recent-listings-grid">
                {recentListings.map((listing) => (
                  <ListingCard key={listing._id} listing={listing} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="quick-tips">
          <h3>💡 Quick Tips</h3>
          <ul>
            <li>Add clear photos to attract more interest in your listings</li>
            <li>Include detailed descriptions with amenities and nearby features</li>
            <li>Keep your contact information up to date</li>
            <li>Respond promptly to inquiries to close deals faster</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;