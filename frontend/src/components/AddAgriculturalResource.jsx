// frontend/src/components/AddAgriculturalResource.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createAgriculturalResource } from '../services/api';
import AgriculturalResourceForm from './AgriculturalResourceForm';

function AddAgriculturalResource() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddResource = async (formData) => {
    setIsLoading(true);
    try {
      await createAgriculturalResource(formData);
      toast.success('Sumber daya berhasil ditambahkan!');
      navigate('/admin/agricultural-resources');
    } catch (err) {
      console.error('Error adding resource:', err);
      toast.error('Gagal menambahkan sumber daya. Silakan coba lagi.');
      setIsLoading(false);
    }
  };

  return (
    <AgriculturalResourceForm 
      onSubmit={handleAddResource} 
      isLoading={isLoading} 
    />
  );
}

export default AddAgriculturalResource;
