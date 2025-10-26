import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Form.css';

function AddDetection() {
  const [image, setImage] = useState(null);
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    formData.append('notes', notes);

    try {
      await api.post('/detections', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/detections');
    } catch (error) {
      console.error('Error adding detection:', error);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Add New Detection</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Image</label>
          <input
            type="file"
            className="form-control"
            onChange={handleImageChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Notes</label>
          <textarea
            className="form-control"
            rows="3"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Add Detection</button>
      </form>
    </div>
  );
}

export default AddDetection;
