import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addPest } from '../services/api';
import './AddPest.css';

function AddPest() {
  const [nameId, setNameId] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [scientificName, setScientificName] = useState('');
  const [descriptionId, setDescriptionId] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [symptomsId, setSymptomsId] = useState('');
  const [symptomsEn, setSymptomsEn] = useState('');
  const [preventionId, setPreventionId] = useState('');
  const [preventionEn, setPreventionEn] = useState('');
  const [treatmentId, setTreatmentId] = useState('');
  const [treatmentEn, setTreatmentEn] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPest({
        name_id: nameId,
        name_en: nameEn,
        scientific_name: scientificName,
        description_id: descriptionId,
        description_en: descriptionEn,
        symptoms_id: symptomsId,
        symptoms_en: symptomsEn,
        prevention_id: preventionId,
        prevention_en: preventionEn,
        treatment_id: treatmentId,
        treatment_en: treatmentEn,
      });
      toast.success('Hama berhasil ditambahkan!');
      navigate('/admin/pests');
    } catch (error) {
      console.error('Error adding pest:', error);
      toast.error('Gagal menambahkan hama. Silakan coba lagi.');
    }
  };

  return (
    <div className="agrius-add-disease-container">
      <h1 className="agrius-add-disease-title">Tambah Hama Baru</h1>
      <form onSubmit={handleSubmit} className="agrius-add-disease-form">
        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="nameId">Nama Hama (ID)</label>
          <input
            type="text"
            id="nameId"
            className="agrius-form-control"
            value={nameId}
            onChange={(e) => setNameId(e.target.value)}
            required
          />
        </div>
        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="nameEn">Pest Name (EN)</label>
          <input
            type="text"
            id="nameEn"
            className="agrius-form-control"
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
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
          <label htmlFor="treatmentId">Perawatan (ID)</label>
          <textarea
            id="treatmentId"
            className="agrius-form-control"
            rows="3"
            value={treatmentId}
            onChange={(e) => setTreatmentId(e.target.value)}
          ></textarea>
        </div>
        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="treatmentEn">Treatment (EN)</label>
          <textarea
            id="treatmentEn"
            className="agrius-form-control"
            rows="3"
            value={treatmentEn}
            onChange={(e) => setTreatmentEn(e.target.value)}
          ></textarea>
        </div>

        <button type="submit" className="agrius-btn-primary agrius-btn-submit">Tambah Hama</button>
      </form>
    </div>
  );
}

export default AddPest;
