import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getDiseaseById, updateDisease } from '../services/api';
import './AddDisease.css'; // Reusing the same CSS for consistency

function EditDisease() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State for dual-language fields
  const [diseaseNameId, setDiseaseNameId] = useState('');
  const [diseaseNameEn, setDiseaseNameEn] = useState('');
  const [scientificName, setScientificName] = useState(''); // scientific_name is language-agnostic
  const [descriptionId, setDescriptionId] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [preventionId, setPreventionId] = useState('');
  const [preventionEn, setPreventionEn] = useState('');
  const [symptomsId, setSymptomsId] = useState('');
  const [symptomsEn, setSymptomsEn] = useState('');
  const [treatmentRecommendationsId, setTreatmentRecommendationsId] = useState('');
  const [treatmentRecommendationsEn, setTreatmentRecommendationsEn] = useState('');
  
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDisease = async () => {
      try {
        const response = await getDiseaseById(id); // API now returns all _id and _en columns
        const diseaseData = response.data;

        setDiseaseNameId(diseaseData.disease_name_id || '');
        setDiseaseNameEn(diseaseData.disease_name_en || '');
        setScientificName(diseaseData.scientific_name || '');
        setDescriptionId(diseaseData.description_id || '');
        setDescriptionEn(diseaseData.description_en || '');
        setPreventionId(diseaseData.prevention_id || '');
        setPreventionEn(diseaseData.prevention_en || '');
        setSymptomsId(diseaseData.symptoms_id || '');
        setSymptomsEn(diseaseData.symptoms_en || '');
        setTreatmentRecommendationsId(diseaseData.treatment_recommendations_id || '');
        setTreatmentRecommendationsEn(diseaseData.treatment_recommendations_en || '');
        
        if (diseaseData.image_url_example) {
          setPreview(`http://localhost:5000${diseaseData.image_url_example}`);
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
    data.append('disease_name_id', diseaseNameId);
    data.append('disease_name_en', diseaseNameEn);
    data.append('scientific_name', scientificName);
    data.append('description_id', descriptionId);
    data.append('description_en', descriptionEn);
    data.append('prevention_id', preventionId);
    data.append('prevention_en', preventionEn);
    data.append('symptoms_id', symptomsId);
    data.append('symptoms_en', symptomsEn);
    data.append('treatment_recommendations_id', treatmentRecommendationsId);
    data.append('treatment_recommendations_en', treatmentRecommendationsEn);

    if (image) {
      data.append('image', image);
    }

    try {
      await updateDisease(id, data);
      toast.success('Penyakit berhasil diperbarui!');
      navigate('/admin/diseases');
    } catch (err) {
      console.error('Error updating disease:', err);
      toast.error('Gagal memperbarui penyakit.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="agrius-add-disease-container">
      <h1 className="agrius-add-disease-title">Edit Penyakit</h1>
      <form onSubmit={handleSubmit} className="agrius-add-disease-form">
        
        {/* Disease Name */}
        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="diseaseNameId">Nama Penyakit (ID)</label>
          <input type="text" id="diseaseNameId" name="disease_name_id" className="agrius-form-control" value={diseaseNameId} onChange={(e) => setDiseaseNameId(e.target.value)} required />
        </div>
        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="diseaseNameEn">Disease Name (EN)</label>
          <input type="text" id="diseaseNameEn" name="disease_name_en" className="agrius-form-control" value={diseaseNameEn} onChange={(e) => setDiseaseNameEn(e.target.value)} />
        </div>

        {/* Scientific Name */}
        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="scientificName">Scientific Name</label>
          <input type="text" id="scientificName" name="scientific_name" className="agrius-form-control" value={scientificName} onChange={(e) => setScientificName(e.target.value)} />
        </div>

        {/* Description */}
        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="descriptionId">Deskripsi (ID)</label>
          <textarea id="descriptionId" name="description_id" className="agrius-form-control" rows="3" value={descriptionId} onChange={(e) => setDescriptionId(e.target.value)}></textarea>
        </div>
        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="descriptionEn">Description (EN)</label>
          <textarea id="descriptionEn" name="description_en" className="agrius-form-control" rows="3" value={descriptionEn} onChange={(e) => setDescriptionEn(e.target.value)}></textarea>
        </div>

        {/* Prevention */}
        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="preventionId">Pencegahan (ID)</label>
          <textarea id="preventionId" name="prevention_id" className="agrius-form-control" rows="3" value={preventionId} onChange={(e) => setPreventionId(e.target.value)}></textarea>
        </div>
        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="preventionEn">Prevention (EN)</label>
          <textarea id="preventionEn" name="prevention_en" className="agrius-form-control" rows="3" value={preventionEn} onChange={(e) => setPreventionEn(e.target.value)}></textarea>
        </div>

        {/* Symptoms */}
        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="symptomsId">Gejala (ID)</label>
          <textarea id="symptomsId" name="symptoms_id" className="agrius-form-control" rows="3" value={symptomsId} onChange={(e) => setSymptomsId(e.target.value)}></textarea>
        </div>
        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="symptomsEn">Symptoms (EN)</label>
          <textarea id="symptomsEn" name="symptoms_en" className="agrius-form-control" rows="3" value={symptomsEn} onChange={(e) => setSymptomsEn(e.target.value)}></textarea>
        </div>

        {/* Treatment Recommendations */}
        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="treatmentRecommendationsId">Rekomendasi Perawatan (ID)</label>
          <textarea id="treatmentRecommendationsId" name="treatment_recommendations_id" className="agrius-form-control" rows="3" value={treatmentRecommendationsId} onChange={(e) => setTreatmentRecommendationsId(e.target.value)}></textarea>
        </div>
        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="treatmentRecommendationsEn">Treatment Recommendations (EN)</label>
          <textarea id="treatmentRecommendationsEn" name="treatment_recommendations_en" className="agrius-form-control" rows="3" value={treatmentRecommendationsEn} onChange={(e) => setTreatmentRecommendationsEn(e.target.value)}></textarea>
        </div>

        {/* Image Upload */}
        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="image">Disease Image</label>
          <input type="file" id="image" name="image" className="agrius-form-control" onChange={handleImageChange} />
          {preview && <img src={preview} alt="Preview" style={{ width: '200px', marginTop: '10px', borderRadius: '8px' }} />}
        </div>

        <button type="submit" className="agrius-btn-primary agrius-btn-submit">Update Penyakit</button>
      </form>
    </div>
  );
}

export default EditDisease;
