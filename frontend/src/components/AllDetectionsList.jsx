import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAllDetectionsForAdmin } from '../services/api';
import './DetectionList.css'; // Re-using some styles
import './UserList.css'; // Re-using some styles

const AllDetectionsList = () => {
  const { t } = useTranslation();
  const [detections, setDetections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetections = async () => {
      try {
        setError(null);
        setLoading(true);
        const response = await getAllDetectionsForAdmin();
        setDetections(response.data);
      } catch (err) {
        console.error("Failed to fetch all detections:", err);
        setError('Failed to load detection history.'); // Fallback text
      } finally {
        setLoading(false);
      }
    };

    fetchDetections();
  }, [t]);

  const handleRowClick = (id) => {
    navigate(`/admin/detections/${id}`);
  };

  if (loading) {
    return <div className="agrius-user-list-container"><p className="agrius-loading-text">Loading all detections...</p></div>;
  }

  if (error) {
    return <div className="agrius-user-list-container"><p className="agrius-error-message">{error}</p></div>;
  }

  return (
    <div className="agrius-user-list-container">
      <div className="agrius-user-list-header">
        <h1>All User Detections</h1>
      </div>
      
      {detections.length === 0 ? (
        <div className="agrius-no-detections" style={{ textAlign: 'center', padding: '2rem' }}>
          <p>No detections found from any user yet.</p>
        </div>
      ) : (
        <div className="agrius-table-responsive">
          <table className="agrius-user-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Disease</th>
                <th>User</th>
                <th>Confidence</th>
                <th>Detected At</th>
              </tr>
            </thead>
            <tbody>
              {detections.map(detection => (
                <tr key={detection.id} onClick={() => handleRowClick(detection.id)} style={{ cursor: 'pointer' }}>
                  <td>
                    <img 
                      src={`http://localhost:5000${detection.image_url}`} 
                      alt={detection.disease_name} 
                      className="agrius-resource-image-thumbnail"
                    />
                  </td>
                  <td>{detection.disease_name}</td>
                  <td>{detection.username}</td>
                  <td>{(detection.confidence * 100).toFixed(2)}%</td>
                  <td>{new Date(detection.detected_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllDetectionsList;
