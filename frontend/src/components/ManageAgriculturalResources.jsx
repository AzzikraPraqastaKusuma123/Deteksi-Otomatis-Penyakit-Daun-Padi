// frontend/src/components/ManageAgriculturalResources.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAgriculturalResources, deleteAgriculturalResource } from '../services/api';
import './ManageAgriculturalResources.css'; // The new CSS file

function ManageAgriculturalResources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchResources = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAgriculturalResources();
      setResources(response.data);
    } catch (err) {
      console.error('Error fetching resources:', err);
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        setError('Sesi Anda telah berakhir. Silakan login kembali.');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError('Gagal memuat sumber daya.');
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  const handleDelete = async (resourceId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus sumber daya ini?')) {
      try {
        await deleteAgriculturalResource(resourceId);
        fetchResources(); // Refresh the list
      } catch (err) {
        console.error('Error deleting resource:', err);
        alert('Gagal menghapus sumber daya.');
      }
    }
  };

  if (loading) return <div className="agrius-resource-list-container"><p>Loading...</p></div>;
  if (error) return <div className="agrius-resource-list-container"><p className="agrius-error-message">{error}</p></div>;

    return (
      <div className="agrius-user-list-container">
        <div className="agrius-user-list-header">
          <h1>Kelola Sumber Daya</h1>
          <Link to="/admin/agricultural-resources/add" className="agrius-btn-primary">
            Tambah Sumber Daya
          </Link>
        </div>
  
        <div className="agrius-table-responsive">
          <table className="agrius-user-table">
            <thead>
              <tr>
                <th>Gambar</th>
                <th>Nama</th>
                <th>Kategori</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {resources.map(resource => (
                <tr key={resource.id}>
                  <td>
                    <img 
                      src={resource.image || 'https://via.placeholder.com/80x60'} 
                      alt={resource.name} 
                      className="agrius-resource-image-thumbnail"
                    />
                  </td>
                  <td>{resource.name}</td>
                  <td>{resource.category}</td>
                  <td className="agrius-action-buttons">
                    <Link to={`/admin/agricultural-resources/edit/${resource.id}`} className="agrius-btn-action agrius-btn-edit">
                      <i className="fas fa-pencil-alt"></i>
                    </Link>
                    <button onClick={() => handleDelete(resource.id)} className="agrius-btn-action agrius-btn-delete">
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
                  </table>
                </div>
              </div> 
            );
          }
export default ManageAgriculturalResources;
