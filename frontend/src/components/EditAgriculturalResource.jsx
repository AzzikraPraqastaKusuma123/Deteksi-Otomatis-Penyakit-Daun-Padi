// frontend/src/components/EditAgriculturalResource.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAgriculturalResourceById, updateAgriculturalResource } from '../services/api';
import AgriculturalResourceForm from './AgriculturalResourceForm';

function EditAgriculturalResource() {
  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchResource = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getAgriculturalResourceById(id);
      setInitialData(response.data);
    } catch (err) {
      console.error('Error fetching resource details:', err);
      setError('Gagal memuat data sumber daya.');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchResource();
  }, [fetchResource]);

  const handleUpdateResource = async (formData) => {
    setIsLoading(true);
    setError('');
    try {
      await updateAgriculturalResource(id, formData);
      navigate('/admin/agricultural-resources');
    } catch (err) {
      console.error('Error updating resource:', err);
      setError('Gagal memperbarui sumber daya. Silakan coba lagi.');
      setIsLoading(false);
    }
  };

  if (!initialData && isLoading) {
    return <p>Loading resource data...</p>;
  }

  if (error) {
    return <p className="agrius-error-message">{error}</p>;
  }

  return (
    <>
      {error && <p className="agrius-error-message" style={{ maxWidth: '900px', margin: '0 auto 20px' }}>{error}</p>}
      {initialData && (
        <AgriculturalResourceForm
          onSubmit={handleUpdateResource}
          initialData={initialData}
          isEditing={true}
          isLoading={isLoading}
        />
      )}
    </>
  );
}

export default EditAgriculturalResource;
