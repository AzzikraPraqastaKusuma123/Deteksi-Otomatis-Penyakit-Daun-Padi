// frontend/src/components/EditAgriculturalResource.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAgriculturalResourceById, updateAgriculturalResource } from '../services/api';
import AgriculturalResourceForm from './AgriculturalResourceForm';

function EditAgriculturalResource() {
  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchResource = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getAgriculturalResourceById(id);
      setInitialData(response.data);
    } catch (err) {
      console.error('Error fetching resource details:', err);
      toast.error('Gagal memuat data sumber daya.');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchResource();
  }, [fetchResource]);

  const handleUpdateResource = async (formData) => {
    setIsLoading(true);
    try {
      await updateAgriculturalResource(id, formData);
      toast.success('Sumber daya berhasil diperbarui!');
      navigate('/admin/agricultural-resources');
    } catch (err) {
      console.error('Error updating resource:', err);
      toast.error('Gagal memperbarui sumber daya. Silakan coba lagi.');
      setIsLoading(false);
    }
  };

  if (!initialData && isLoading) {
    return <p>Loading resource data...</p>;
  }

  return (
    <>
      {initialData && (
        <AgriculturalResourceForm
          onSubmit={handleUpdateResource}
          initialData={initialData.resource} // Pass the nested resource object
          isEditing={true}
          isLoading={isLoading}
        />
      )}
    </>
  );
}

export default EditAgriculturalResource;
