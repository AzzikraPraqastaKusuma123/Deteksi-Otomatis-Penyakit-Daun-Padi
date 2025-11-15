import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './AddDisease.css';

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
      navigate('/admin/diseases'); // Navigate back to admin disease list
    } catch (error) {
      console.error('Error adding disease:', error);
      alert('Failed to add disease. Please try again.');
    }
  };

  return (
    <div className="agrius-add-disease-container">
      <h1 className="agrius-add-disease-title">Add New Disease</h1>
      <form onSubmit={handleSubmit} className="agrius-add-disease-form">
        <div className="agrius-form-group">
          <label htmlFor="diseaseName">Disease Name</label>
          <input
            type="text"
            id="diseaseName"
            className="agrius-form-control"
            value={diseaseName}
            onChange={(e) => setDiseaseName(e.target.value)}
            required
          />
        </div>
        <div className="agrius-form-group">
          <label htmlFor="scientificName">Scientific Name</label>
          <input
            type="text"
            id="scientificName"
            className="agrius-form-control"
            value={scientificName}
            onChange={(e) => setScientificName(e.target.value)}
          />
        </div>
        <div className="agrius-form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="agrius-form-control"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="agrius-form-group">
          <label htmlFor="symptoms">Symptoms</label>
          <textarea
            id="symptoms"
            className="agrius-form-control"
            rows="3"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          ></textarea>
        </div>
        <div className="agrius-form-group">
          <label htmlFor="treatment">Treatment Recommendations</label>
          <textarea
            id="treatment"
            className="agrius-form-control"
            rows="3"
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="agrius-btn-primary agrius-btn-submit">Add Disease</button>
      </form>
    </div>
  );
}

export default AddDisease;
