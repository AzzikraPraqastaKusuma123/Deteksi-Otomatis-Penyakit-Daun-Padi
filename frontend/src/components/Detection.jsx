
import React, { useState, useRef, useEffect } from 'react';
import { detectImage } from '../services/api';
import './Detection.css';

const Detection = () => {
  const [stream, setStream] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera: ", err);
        setError('Tidak dapat mengakses kamera. Pastikan Anda memberikan izin dan menggunakan koneksi yang aman (HTTPS).');
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleScan = async () => {
    if (!videoRef.current) return;

    setLoading(true);
    setPrediction(null);
    setError('');

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      if (!blob) {
        setError('Gagal mengambil gambar dari kamera.');
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('image', blob, 'capture.jpg');

      try {
        const res = await detectImage(formData);
        setPrediction(res.data);
      } catch (err) {
        console.error('Error detecting disease:', err);
        setError('Gagal melakukan deteksi. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    }, 'image/jpeg');
  };

  return (
    <div className="detection-container">
      <h2>Scan Penyakit Daun Padi</h2>
      <div className="camera-feed">
        {error && !stream && <p className="error-message">{error}</p>}
        <video ref={videoRef} autoPlay playsInline muted />
      </div>
      <button onClick={handleScan} disabled={loading || !stream}>
        {loading ? 'Menganalisis...' : 'Scan Gambar'}
      </button>
      {loading && <div className="loading-spinner"></div>}
      {error && <p className="error-message">{error}</p>}
      {prediction && (
        <div className="detection-result">
          <h3>Hasil Deteksi</h3>
          <p><strong>Penyakit:</strong> {prediction.disease}</p>
          <p><strong>Tingkat Kepercayaan:</strong> {(prediction.confidence * 100).toFixed(2)}%</p>
          {prediction.description && <p><strong>Deskripsi:</strong> {prediction.description}</p>}
          {prediction.prevention && <p><strong>Pencegahan:</strong> {prediction.prevention}</p>}
        </div>
      )}
    </div>
  );
};

export default Detection;
