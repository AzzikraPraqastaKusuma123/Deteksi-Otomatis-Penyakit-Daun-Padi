import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api'; // Assuming api service is used for fetching
import './UserDetail.css';

function UserDetail() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await api.get(`/users/${userId}`);
        setUserData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user detail:', err);
        setError('Failed to load user details.');
        setLoading(false);
      }
    };
    fetchUserDetail();
  }, [userId]);

  if (loading) {
    return <div className="agrius-detail-container"><p className="agrius-loading-text">Loading user details...</p></div>;
  }

  if (error) {
    return <div className="agrius-detail-container"><p className="agrius-error-message">{error}</p></div>;
  }

  if (!userData || !userData.user) {
    return <div className="agrius-detail-container"><p className="agrius-no-data-message">User not found</p></div>;
  }

  const { user, detections } = userData;

  return (
    <div className="agrius-detail-container">
      <Link to="/admin/users" className="agrius-back-link">
        <i className="fas fa-arrow-left me-2"></i>Back to Users
      </Link>

      <div className="row agrius-detail-row">
        {/* User Information */}
        <div className="col-md-4">
          <div className="agrius-card agrius-detail-card">
            <div className="text-center">
              <i className="fas fa-user-circle agrius-user-icon mb-3"></i>
              <h1 className="agrius-detail-title h4">{user.full_name || user.username}</h1>
              <p className="agrius-text-muted">@{user.username}</p>
            </div>
            <hr className="agrius-divider" />
            <div className="agrius-detail-info">
              <p><i className="fas fa-envelope me-2 agrius-icon-muted"></i>{user.email}</p>
              <p><i className="fas fa-map-marker-alt me-2 agrius-icon-muted"></i>{user.location || '-'}</p>
              <p><i className="fas fa-user-tag me-2 agrius-icon-muted"></i>Role: <span className={`agrius-role-badge agrius-role-${user.role}`}>{user.role}</span></p>
            </div>
          </div>
        </div>

        {/* Detections Information */}
        <div className="col-md-8">
          <div className="agrius-card agrius-detail-card">
            <h2 className="agrius-detail-title">Detections by {user.username}</h2>
            {detections && detections.length > 0 ? (
              <div className="agrius-list-group">
                {detections.map(detection => (
                  <div key={detection.detection_id} className="agrius-list-group-item">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">{detection.detected_disease || 'Unknown Disease'}</h5>
                      <small className="agrius-text-muted">{new Date(detection.detection_timestamp).toLocaleString()}</small>
                    </div>
                    <p className="mb-1">Confidence: <strong>{(detection.confidence_score * 100).toFixed(2)}%</strong></p>
                    <p className="agrius-text-muted mb-0">{detection.llm_generated_response || 'No detailed AI response available.'}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="agrius-no-data-message">No detections found for this user.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
