import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { detectImage } from '../services/api'; // Ini sudah benar
import './DetectionPage.css';
import { FiUploadCloud, FiCamera } from 'react-icons/fi';
// 1. Impor useNavigate untuk redirect jika token habis
import { useNavigate } from 'react-router-dom';

const DetectionPage = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('upload'); 
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const navigate = useNavigate(); // 2. Inisialisasi navigate

  // ... (useEffect, startCamera, stopCamera, onDrop, getRootProps, handleModeChange semuanya sudah benar) ...
  // Cleanup effect for camera stream
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera: ", err);
      setError('Could not access the camera. Please ensure you have granted permission and are on a secure connection (HTTPS).');
  }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setPrediction(null);
      setError('');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: 'image/jpeg, image/png',
    noClick: mode === 'camera',
    noKeyboard: mode === 'camera',
  });

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setPreview(null);
    setImage(null);
    setPrediction(null);
    setError('');
    if (newMode === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
  };


  const handleAnalysis = async () => {
    if (!image) {
      setError('Please provide an image first.');
      return;
    }

    setLoading(true);
    setPrediction(null);
    setError('');

    const formData = new FormData();
    formData.append('image', image, 'image.jpg');

    try {
      // Panggilan ini sekarang akan otomatis mengirim token (via api.js)
      const res = await detectImage(formData);
      setPrediction(res.data);
    } catch (err) {
      console.error('Error detecting disease:', err);
      
      // 3. Penanganan error yang lebih baik
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        setError('Sesi Anda telah berakhir. Silakan login kembali.');
        // Hapus token lama dan redirect ke login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Beri sedikit waktu sebelum redirect
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError('Failed to analyze the image. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // ... (handleCapture dan clearPreview sudah benar) ...
  const handleCapture = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(blob => {
      if (blob) {
        setImage(blob);
        setPreview(URL.createObjectURL(blob));
        stopCamera();
        setMode('upload'); 
      }
    }, 'image/jpeg');
  };

  const clearPreview = () => {
    setImage(null);
    setPreview(null);
    setPrediction(null);
    setError('');
  };


  // --- Perbaikan JSX ada di dalam 'return' ---
  return (
    <div className="detection-page">
      <div className="detection-container">
        <div className="detection-controls">
          <h2>Paddy Leaf Disease Detection</h2>
          <p>Upload an image or use your camera to detect diseases in rice leaves.</p>
          <div className="mode-switcher">
            <button onClick={() => handleModeChange('upload')} className={mode === 'upload' ? 'active' : ''}>
              <FiUploadCloud /> Upload Image
            </button>
            <button onClick={() => handleModeChange('camera')} className={mode === 'camera' ? 'active' : ''}>
              <FiCamera /> Use Camera
            </button>
          </div>

          {mode === 'upload' && (
            <div {...getRootProps({ className: `dropzone ${isDragActive ? 'active' : ''}` })}>
              <input {...getInputProps()} />
              {preview ? (
                <div className="image-preview-container">
                  <img src={preview} alt="Preview" className="image-preview" />
                  <button onClick={clearPreview} className="clear-btn">X</button>
                </div>
              ) : (
                <div className="dropzone-text">
                  <FiUploadCloud size={50} />
                  <p>Drag & drop an image here, or click to select</p>
                  <em>(Supports *.jpeg and *.png)</em>
                </div>
              )}
            </div>
          )}

          {mode === 'camera' && (
            <div className="camera-container">
              <video ref={videoRef} autoPlay playsInline muted className="camera-feed" />
              {stream && <button onClick={handleCapture} className="btn-capture">Capture Photo</button>}
            </div>
          )}

          <button 
            onClick={handleAnalysis} 
            disabled={loading || (!image && mode === 'upload')}
            className="btn-analyze"
        _ >
            {loading ? 'Analyzing...' : 'Analyze Image'}
          </button>
        </div>

        <div className="results-container">
          {loading && (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Analyzing image, please wait...</p>
            </div>
          )}
          {error && <div className="error-message">{error}</div>}
          {prediction ? (
            <div className="result-card">
        _     <h3>Detection Result</h3>
              <div className="result-header">
                <h2>{prediction.disease.replace(/_/g, ' ')}</h2>
              </div>
              <div className="confidence">
                <p>Confidence</p>
                <div className="confidence-bar-container">
                  <div 
                    className="confidence-bar" 
                    style={{ width: `${(prediction.confidence * 100).toFixed(2)}%` }}
                  >
                    <span>{(prediction.confidence * 100).toFixed(2)}%</span>
                  </div>
                </div>
              </div>
              
              {/* --- 4. PERBAIKAN BUG JSX DISINI --- */}
              <div className="result-details">
                <h4>Description</h4>
                <p>{prediction.description}</p>
                
                {/* Menambahkan 'Prevention' yang hilang */}
                <h4>Treatment Recommendation</h4>
                <p>{prediction.prevention}</p>
                
               
              </div>
              {/* --- AKHIR PERBAIKAN --- */}

            </div>
          ) : (
            !loading && <div className="no-results">
              <p>Results will be displayed here after analysis.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetectionPage;