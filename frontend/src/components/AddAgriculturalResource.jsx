// frontend/src/components/AddAgriculturalResource.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAgriculturalResource } from '../services/api';
import AgriculturalResourceForm from './AgriculturalResourceForm';

function AddAgriculturalResource() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAddResource = async (formData) => {
    setIsLoading(true);
    setError('');
    try {
      await createAgriculturalResource(formData);
      navigate('/admin/agricultural-resources');
    } catch (err) {
      console.error('Error adding resource:', err);
      setError('Gagal menambahkan sumber daya. Silakan coba lagi.');
      setIsLoading(false);
    }
  };

  return (
    <>
      {error && <p className="agrius-error-message" style={{ maxWidth: '900px', margin: '0 auto 20px' }}>{error}</p>}
      <AgriculturalResourceForm 
        onSubmit={handleAddResource} 
        isLoading={isLoading} 
      />
    </>
  );
}

export default AddAgriculturalResource;
