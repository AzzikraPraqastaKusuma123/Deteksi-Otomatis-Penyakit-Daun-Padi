// frontend/src/components/AgriculturalResourceForm.jsx
import React, { useState, useEffect } from 'react';
import './AgriculturalResourceForm.css';

function AgriculturalResourceForm({ onSubmit, initialData = {}, isEditing = false, isLoading = false }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Pupuk', // Default category
    description: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    console.log("AgriculturalResourceForm: initialData received:", initialData);
    if (isEditing && initialData) {
      setFormData({
        name: initialData.name || '',
        category: initialData.category || 'Pupuk',
        description: initialData.description || '',
      });
      if (initialData.image) {
        setImagePreview(initialData.image);
      }
    }
  }, [initialData, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = new FormData();
    submissionData.append('name', formData.name);
    submissionData.append('category', formData.category);
    submissionData.append('description', formData.description);
    if (imageFile) {
      submissionData.append('image', imageFile);
    }
    onSubmit(submissionData);
  };

  return (
    <div className="agrius-resource-form-container">
      <h1 className="agrius-resource-form-title">
        {isEditing ? 'Edit Sumber Daya' : 'Tambah Sumber Daya Baru'}
      </h1>
      <form onSubmit={handleSubmit} className="agrius-resource-form">
        <div className="agrius-form-row-two-cols">
          <div className="agrius-form-group">
            <label htmlFor="name">Nama Sumber Daya</label>
            <input
              type="text"
              id="name"
              name="name"
              className="agrius-form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="agrius-form-group">
            <label htmlFor="category">Kategori</label>
            <select
              id="category"
              name="category"
              className="agrius-form-control"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="Pupuk">Pupuk</option>
              <option value="Pestisida">Pestisida</option>
              <option value="Obat">Obat</option>
            </select>
          </div>
        </div>

        <div className="agrius-form-row-two-cols">
          <div className="agrius-form-group">
            <label htmlFor="description">Deskripsi</label>
            <textarea
              id="description"
              name="description"
              className="agrius-form-control"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="agrius-form-group">
            <label htmlFor="image">Gambar</label>
            <input
              type="file"
              id="image"
              name="image"
              className="agrius-form-control"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className="agrius-image-preview-container">
                <p>Preview:</p>
                <img src={imagePreview} alt="Preview" className="agrius-image-preview" />
              </div>
            )}
          </div>
        </div>

        <button type="submit" className="agrius-btn-primary agrius-btn-submit" disabled={isLoading}>
          {isLoading ? 'Menyimpan...' : (isEditing ? 'Update Sumber Daya' : 'Tambah Sumber Daya')}
        </button>
      </form>
    </div>
  );
}

export default AgriculturalResourceForm;
