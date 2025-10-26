import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './DiseaseList.css';

function DiseaseList() {
  const [diseases, setDiseases] = useState([]);

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const response = await api.get('/diseases');
        setDiseases(response.data);
      } catch (error) {
        console.error('Error fetching diseases:', error);
      }
    };

    fetchDiseases();
  }, []);

  return (
    <div className="disease-list-container">
      <div className="list-header">
        <h1>Diseases</h1>
        <Link to="/admin/diseases/add" className="btn-add-new">Add Disease</Link>
      </div>
      <div className="disease-cards-grid">
        {diseases.map(disease => (
          <div className="disease-card" key={disease.disease_id}>
            <div className="disease-card-body">
              <h5 className="card-title">{disease.disease_name}</h5>
              <p className="card-text">{disease.description}</p>
              <Link to={`/admin/diseases/${disease.disease_id}`} className="btn-view-details">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiseaseList;
