// frontend/src/components/DiseaseList.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getAllDiseases } from '../services/api';
import './DiseaseList.css';

function DiseaseList() {
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const response = await getAllDiseases();
        setDiseases(response.data);
      } catch (err) {
        console.error('Error fetching diseases:', err);
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          setError('Sesi Anda berakhir. Silakan login kembali.');
          setTimeout(() => navigate('/login'), 1500);
        } else {
          setError('Gagal memuat data penyakit.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDiseases();
  }, [navigate]);

  // Tentukan apakah ini halaman admin (misal path dimulai dengan /admin)
  const isAdminContext = location.pathname.startsWith('/admin');

  if (loading) return <div className="agrius-disease-list-container"><p className="agrius-loading-text">Loading diseases...</p></div>;
  if (error) return <div className="agrius-disease-list-container"><p className="agrius-error-message">{error}</p></div>;

  return (
    <div className="agrius-disease-list-container">
      <div className="agrius-list-header">
        <h1>Disease Library</h1>
        {isAdminContext && <Link to="/admin/diseases/add" className="agrius-btn-primary agrius-btn-add-new">Add Disease</Link>}
      </div>

      <div className="agrius-disease-cards-flex">
        {diseases.map(disease => {
          // Buat path detail sesuai konteks
          const detailPath = isAdminContext
            ? `/admin/diseases/${disease.id}`
            : `/diseases/${disease.id}`;

          return (
            <div className="agrius-disease-card" key={disease.id}>
              <div className="agrius-disease-card-body">
                <h5 className="agrius-card-title">{disease.disease_name}</h5>
                <p className="agrius-card-text">{disease.description || 'No description available.'}</p>
                <Link to={detailPath} className="agrius-btn-secondary agrius-btn-view-details">View Details</Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DiseaseList;
