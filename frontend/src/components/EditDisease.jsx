import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDiseaseById, updateDisease } from '../services/api';
import './AddDisease.css'; // Reusing the same CSS for consistency

function EditDisease() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    disease_name: '',
    scientific_name: '',
    description: '',
    prevention: '',
    symptoms: '',
    treatment_recommendations: '',
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDisease = async () => {
      try {
        const response = await getDiseaseById(id);
        setFormData({
          disease_name: response.data.disease_name || '',
          scientific_name: response.data.scientific_name || '',
          description: response.data.description || '',
          prevention: response.data.prevention || '',
          symptoms: response.data.symptoms || '',
          treatment_recommendations: response.data.treatment_recommendations || '',
        });
        if (response.data.image_url_example) {
          // Assuming the backend serves the images from a public folder
          setPreview(`http://localhost:5000${response.data.image_url_example}`);
        }
      } catch (err) {
        console.error('Failed to fetch disease:', err);
        setError('Failed to load disease data.');
      } finally {
        setLoading(false);
      }
    };
    fetchDisease();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (image) {
      data.append('image', image);
    }

    try {
      await updateDisease(id, data);
      alert('Disease updated successfully!');
      navigate('/admin/diseases');
    } catch (err) {
      console.error('Error updating disease:', err);
      alert('Failed to update disease.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="agrius-add-disease-container">
      <h1 className="agrius-add-disease-title">Edit Disease</h1>
      <form onSubmit={handleSubmit} className="agrius-add-disease-form">
        
        <div className="agrius-form-group">
          <label htmlFor="disease_name">Disease Name</label>
          <input type="text" id="disease_name" name="disease_name" className="agrius-form-control" value={formData.disease_name} onChange={handleChange} required />
        </div>

        <div className="agrius-form-group">
          <label htmlFor="scientific_name">Scientific Name</label>
          <input type="text" id="scientific_name" name="scientific_name" className="agrius-form-control" value={formData.scientific_name} onChange={handleChange} />
        </div>

        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" className="agrius-form-control" rows="3" value={formData.description} onChange={handleChange}></textarea>
        </div>

        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="symptoms">Symptoms</label>
          <textarea id="symptoms" name="symptoms" className="agrius-form-control" rows="3" value={formData.symptoms} onChange={handleChange}></textarea>
        </div>

        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="prevention">Prevention</label>
          <textarea id="prevention" name="prevention" className="agrius-form-control" rows="3" value={formData.prevention} onChange={handleChange}></textarea>
        </div>

        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="treatment_recommendations">Treatment Recommendations</label>
          <textarea id="treatment_recommendations" name="treatment_recommendations" className="agrius-form-control" rows="3" value={formData.treatment_recommendations} onChange={handleChange}></textarea>
        </div>

        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="image">Disease Image</label>
          <input type="file" id="image" name="image" className="agrius-form-control" onChange={handleImageChange} />
          {preview && <img src={preview} alt="Preview" style={{ width: '200px', marginTop: '10px', borderRadius: '8px' }} />}
        </div>

        <button type="submit" className="agrius-btn-primary agrius-btn-submit">Update Disease</button>
      </form>
    </div>
  );
}

export default EditDisease;
