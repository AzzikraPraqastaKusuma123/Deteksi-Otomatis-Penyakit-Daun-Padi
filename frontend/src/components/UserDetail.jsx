import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './UserDetail.css';

function UserDetail() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/users/${userId}`)
      .then(response => response.json())
      .then(data => {
        setUserData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user detail:', error);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <div className="detail-container"><p>Loading user details...</p></div>;
  }

  if (!userData || !userData.user) {
    return <div className="detail-container"><p>User not found</p></div>;
  }

  const { user, detections } = userData;

  return (
    <div className="detail-container">
      <Link to="/users" className="back-link">
        <i className="fas fa-arrow-left me-2"></i>Back to Users
      </Link>

      <div className="row">
        {/* User Information */}
        <div className="col-md-4">
          <div className="card detail-card">
            <div className="text-center">
              <i className="fas fa-user-circle fa-6x text-primary mb-3"></i>
              <h1 className="detail-title h4">{user.full_name}</h1>
              <p className="text-muted">@{user.username}</p>
            </div>
            <hr />
            <div className="detail-info">
              <p><i className="fas fa-envelope me-2 text-muted"></i>{user.email}</p>
              <p><i className="fas fa-map-marker-alt me-2 text-muted"></i>{user.location || '-'}</p>
            </div>
          </div>
        </div>

        {/* Detections Information */}
        <div className="col-md-8">
          <div className="card detail-card">
            <h2 className="detail-title">Detections by {user.username}</h2>
            {detections && detections.length > 0 ? (
              <div className="list-group">
                {detections.map(detection => (
                  <div key={detection.detection_id} className="list-group-item list-group-item-action">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">{detection.detected_disease || 'Unknown Disease'}</h5>
                      <small>{new Date(detection.detection_timestamp).toLocaleString()}</small>
                    </div>
                    <p className="mb-1">Confidence: {detection.confidence_score}</p>
                    <p className="text-muted mb-0">{detection.llm_generated_response}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No detections found for this user.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
