import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Form.css';

function AddDisease() {
  const [diseaseName, setDiseaseName] = useState('');
  const [scientificName, setScientificName] = useState('');
  const [description, setDescription] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [treatment, setTreatment] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/diseases', {
        disease_name: diseaseName,
        scientific_name: scientificName,
        description,
        symptoms,
        treatment_recommendations: treatment,
      });
      navigate('/diseases');
    } catch (error) {
      console.error('Error adding disease:', error);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Add New Disease</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Disease Name</label>
          <input
            type="text"
            className="form-control"
            value={diseaseName}
            onChange={(e) => setDiseaseName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Scientific Name</label>
          <input
            type="text"
            className="form-control"
            value={scientificName}
            onChange={(e) => setScientificName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Symptoms</label>
          <textarea
            className="form-control"
            rows="3"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Treatment Recommendations</label>
          <textarea
            className="form-control"
            rows="3"
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Add Disease</button>
      </form>
    </div>
  );
}

export default AddDisease;
