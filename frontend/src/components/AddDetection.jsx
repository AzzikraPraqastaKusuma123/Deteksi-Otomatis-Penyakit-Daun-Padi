import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import api from '../services/api';
import './AddDetection.css';

function AddDetection() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: 'image/*' 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert('Please upload an image.');
      return;
    }
    const formData = new FormData();
    formData.append('image', image);
    formData.append('notes', notes);

    try {
      // Mock submission for now
      console.log('Submitting...', formData);
      alert('Detection submitted successfully! (Mock)');
      navigate('/detections');
      // await api.post('/detections', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });
      // navigate('/detections');
    } catch (error) {
      console.error('Error adding detection:', error);
    }
  };

  return (
    <div className="add-detection-container">
      <div className="add-detection-header">
        <h1>Start New Detection</h1>
        <p>Upload an image of a rice leaf to get a diagnosis.</p>
      </div>
      <form onSubmit={handleSubmit} className="detection-form">
        <div {...getRootProps({ className: `dropzone ${isDragActive ? 'active' : ''}` })}>
          <input {...getInputProps()} />
          {
            preview ? 
            <img src={preview} alt="Preview" className="image-preview" /> :
            <div className="dropzone-text">
              <i className="fas fa-cloud-upload-alt"></i>
              <p>Drag & drop an image here, or click to select one</p>
              <em>(Only *.jpeg and *.png images will be accepted)</em>
            </div>
          }
        </div>
        
        <div className="form-group">
          <label htmlFor="notes">Notes (Optional)</label>
          <textarea
            id="notes"
            className="form-control"
            rows="4"
            placeholder="Add any relevant notes, e.g., location, recent treatments..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn-submit-detection">Analyze Image</button>
      </form>
    </div>
  );
}

export default AddDetection;
