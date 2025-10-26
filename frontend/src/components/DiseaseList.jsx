import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './List.css';

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
    <div className="list-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="list-title mb-0">Diseases</h1>
        <Link to="/diseases/add" className="btn btn-primary">Add Disease</Link>
      </div>
      <div className="row">
        {diseases.map(disease => (
          <div className="col-md-6 col-lg-4 mb-4" key={disease.disease_id}>
            <div className="card list-card">
              <div className="card-body">
                <h5 className="card-title">{disease.disease_name}</h5>
                <p className="card-text">{disease.description}</p>
                <Link to={`/diseases/${disease.disease_id}`} className="btn btn-primary">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiseaseList;
