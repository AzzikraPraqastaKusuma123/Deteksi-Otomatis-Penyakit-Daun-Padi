import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPestById, updatePest } from '../services/api';
import './AddPest.css'; // Reusing the same CSS for consistency

function EditPest() {
  const { id } = useParams();
  const navigate = useNavigate();
  
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
  
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPest = async () => {
      try {
        const response = await getPestById(id);
        const pestData = response.data;

        setNameId(pestData.name_id || '');
        setNameEn(pestData.name_en || '');
        setScientificName(pestData.scientific_name || '');
        setDescriptionId(pestData.description_id || '');
        setDescriptionEn(pestData.description_en || '');
        setSymptomsId(pestData.symptoms_id || '');
        setSymptomsEn(pestData.symptoms_en || '');
        setPreventionId(pestData.prevention_id || '');
        setPreventionEn(pestData.prevention_en || '');
        setTreatmentId(pestData.treatment_id || '');
        setTreatmentEn(pestData.treatment_en || '');
        
        if (pestData.image_url) {
          setPreview(`http://localhost:5000${pestData.image_url}`);
        }
      } catch (err) {
        console.error('Failed to fetch pest:', err);
        setError('Failed to load pest data.');
      } finally {
        setLoading(false);
      }
    };
    fetchPest();
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
    data.append('name_id', nameId);
    data.append('name_en', nameEn);
    data.append('scientific_name', scientificName);
    data.append('description_id', descriptionId);
    data.append('description_en', descriptionEn);
    data.append('symptoms_id', symptomsId);
    data.append('symptoms_en', symptomsEn);
    data.append('prevention_id', preventionId);
    data.append('prevention_en', preventionEn);
    data.append('treatment_id', treatmentId);
    data.append('treatment_en', treatmentEn);

    if (image) {
      data.append('image', image);
    }

    try {
      await updatePest(id, data);
      alert('Pest updated successfully!');
      navigate('/admin/pests');
    } catch (err) {
      console.error('Error updating pest:', err);
      alert('Failed to update pest.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="agrius-add-disease-container">
      <h1 className="agrius-add-disease-title">Edit Hama</h1>
      <form onSubmit={handleSubmit} className="agrius-add-disease-form">
        
        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="nameId">Nama Hama (ID)</label>
          <input type="text" id="nameId" name="name_id" className="agrius-form-control" value={nameId} onChange={(e) => setNameId(e.target.value)} required />
        </div>
        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="nameEn">Pest Name (EN)</label>
          <input type="text" id="nameEn" name="name_en" className="agrius-form-control" value={nameEn} onChange={(e) => setNameEn(e.target.value)} />
        </div>

        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="scientificName">Scientific Name</label>
          <input type="text" id="scientificName" name="scientific_name" className="agrius-form-control" value={scientificName} onChange={(e) => setScientificName(e.target.value)} />
        </div>

        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="descriptionId">Deskripsi (ID)</label>
          <textarea id="descriptionId" name="description_id" className="agrius-form-control" rows="3" value={descriptionId} onChange={(e) => setDescriptionId(e.target.value)}></textarea>
        </div>
        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="descriptionEn">Description (EN)</label>
          <textarea id="descriptionEn" name="description_en" className="agrius-form-control" rows="3" value={descriptionEn} onChange={(e) => setDescriptionEn(e.target.value)}></textarea>
        </div>

        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="symptomsId">Gejala (ID)</label>
          <textarea id="symptomsId" name="symptoms_id" className="agrius-form-control" rows="3" value={symptomsId} onChange={(e) => setSymptomsId(e.target.value)}></textarea>
        </div>
        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="symptomsEn">Symptoms (EN)</label>
          <textarea id="symptomsEn" name="symptoms_en" className="agrius-form-control" rows="3" value={symptomsEn} onChange={(e) => setSymptomsEn(e.target.value)}></textarea>
        </div>

        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="preventionId">Pencegahan (ID)</label>
          <textarea id="preventionId" name="prevention_id" className="agrius-form-control" rows="3" value={preventionId} onChange={(e) => setPreventionId(e.target.value)}></textarea>
        </div>
        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="preventionEn">Prevention (EN)</label>
          <textarea id="preventionEn" name="prevention_en" className="agrius-form-control" rows="3" value={preventionEn} onChange={(e) => setPreventionEn(e.target.value)}></textarea>
        </div>

        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="treatmentId">Perawatan (ID)</label>
          <textarea id="treatmentId" name="treatment_id" className="agrius-form-control" rows="3" value={treatmentId} onChange={(e) => setTreatmentId(e.target.value)}></textarea>
        </div>
        <div className="agrius-form.
        -group form-group-full-width">
          <label htmlFor="treatmentEn">Treatment (EN)</label>
          <textarea id="treatmentEn" name="treatment_en" className="agrius-form-control" rows="3" value={treatmentEn} onChange={(e) => setTreatmentEn(e.target.value)}></textarea>
        </div>

        <div className="agrius-form-group form-group-full-width">
          <label htmlFor="image">Gambar Hama</label>
          <input type="file" id="image" name="image" className="agrius-form-control" onChange={handleImageChange} />
          {preview && <img src={preview} alt="Preview" style={{ width: '200px', marginTop: '10px', borderRadius: '8px' }} />}
        </div>

        <button type="submit" className="agrius-btn-primary agrius-btn-submit">Update Hama</button>
      </form>
    </div>
  );
}

export default EditPest;
