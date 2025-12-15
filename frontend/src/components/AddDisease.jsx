import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import './AddDisease.css';

function AddDisease() {
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
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/diseases', {
        disease_name_id: diseaseNameId,
        disease_name_en: diseaseNameEn,
        scientific_name: scientificName,
        description_id: descriptionId,
        description_en: descriptionEn,
        prevention_id: preventionId,
        prevention_en: preventionEn,
        symptoms_id: symptomsId,
        symptoms_en: symptomsEn,
        treatment_recommendations_id: treatmentRecommendationsId,
        treatment_recommendations_en: treatmentRecommendationsEn,
        // image_url_example is handled by separate image upload
      });
      toast.success('Penyakit berhasil ditambahkan!');
      navigate('/admin/diseases'); // Navigate back to admin disease list
    } catch (error) {
      console.error('Error adding disease:', error);
      toast.error('Gagal menambahkan penyakit. Silakan coba lagi.');
    }
  };

  return (
    <div className="agrius-add-disease-container">
      <h1 className="agrius-add-disease-title">Tambah Penyakit Baru</h1>
      <form onSubmit={handleSubmit} className="agrius-add-disease-form">
        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="diseaseNameId">Nama Penyakit (ID)</label>
          <input
            type="text"
            id="diseaseNameId"
            className="agrius-form-control"
            value={diseaseNameId}
            onChange={(e) => setDiseaseNameId(e.target.value)}
            required
          />
        </div>
        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="diseaseNameEn">Disease Name (EN)</label>
          <input
            type="text"
            id="diseaseNameEn"
            className="agrius-form-control"
            value={diseaseNameEn}
            onChange={(e) => setDiseaseNameEn(e.target.value)}
          />
        </div>

        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="scientificName">Scientific Name</label>
          <input
            type="text"
            id="scientificName"
            className="agrius-form-control"
            value={scientificName}
            onChange={(e) => setScientificName(e.target.value)}
          />
        </div>

        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="descriptionId">Deskripsi (ID)</label>
          <textarea
            id="descriptionId"
            className="agrius-form-control"
            rows="3"
            value={descriptionId}
            onChange={(e) => setDescriptionId(e.target.value)}
          ></textarea>
        </div>
        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="descriptionEn">Description (EN)</label>
          <textarea
            id="descriptionEn"
            className="agrius-form-control"
            rows="3"
            value={descriptionEn}
            onChange={(e) => setDescriptionEn(e.target.value)}
          ></textarea>
        </div>

        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="preventionId">Pencegahan (ID)</label>
          <textarea
            id="preventionId"
            className="agrius-form-control"
            rows="3"
            value={preventionId}
            onChange={(e) => setPreventionId(e.target.value)}
          ></textarea>
        </div>
        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="preventionEn">Prevention (EN)</label>
          <textarea
            id="preventionEn"
            className="agrius-form-control"
            rows="3"
            value={preventionEn}
            onChange={(e) => setPreventionEn(e.target.value)}
          ></textarea>
        </div>

        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="symptomsId">Gejala (ID)</label>
          <textarea
            id="symptomsId"
            className="agrius-form-control"
            rows="3"
            value={symptomsId}
            onChange={(e) => setSymptomsId(e.target.value)}
          ></textarea>
        </div>
        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="symptomsEn">Symptoms (EN)</label>
          <textarea
            id="symptomsEn"
            className="agrius-form-control"
            rows="3"
            value={symptomsEn}
            onChange={(e) => setSymptomsEn(e.target.value)}
          ></textarea>
        </div>

        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="treatmentRecommendationsId">Rekomendasi Perawatan (ID)</label>
          <textarea
            id="treatmentRecommendationsId"
            className="agrius-form-control"
            rows="3"
            value={treatmentRecommendationsId}
            onChange={(e) => setTreatmentRecommendationsId(e.target.value)}
          ></textarea>
        </div>
        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="treatmentRecommendationsEn">Treatment Recommendations (EN)</label>
          <textarea
            id="treatmentRecommendationsEn"
            className="agrius-form-control"
            rows="3"
            value={treatmentRecommendationsEn}
            onChange={(e) => setTreatmentRecommendationsEn(e.target.value)}
          ></textarea>
        </div>

        <button type="submit" className="agrius-btn-primary agrius-btn-submit">Tambah Penyakit</button>
      </form>
    </div>
  );
}

export default AddDisease;
