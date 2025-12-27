import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { detectImage } from '../services/api';
import './DetectionPage.css';
import { FiUploadCloud, FiCamera, FiArrowRight, FiRefreshCcw, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const DetectionPage = () => {
  const { t } = useTranslation();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('upload');
  const [stream, setStream] = useState(null);
  const [currentFacingMode, setCurrentFacingMode] = useState('environment');
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: currentFacingMode } });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera: ", err);
      toast.error(t('detectionPage.cameraAccessError'));
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const switchCamera = () => {
    stopCamera();
    const newFacingMode = currentFacingMode === 'environment' ? 'user' : 'environment';
    setCurrentFacingMode(newFacingMode);
  };

  useEffect(() => {
    if (mode === 'camera' && currentFacingMode) {
      startCamera();
    }
  }, [currentFacingMode, mode]);

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setPrediction(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [] },
    noClick: mode === 'camera',
    noKeyboard: mode === 'camera',
  });

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setPreview(null);
    setImage(null);
    setPrediction(null);
    if (newMode !== 'camera') {
      stopCamera();
    }
  };

  const handleAnalysis = async () => {
    if (!image) {
      toast.warn(t('detectionPage.imageRequiredError'));
      return;
    }
    setLoading(true);
    setPrediction(null);
    const formData = new FormData();
    formData.append('image', image, 'image.jpg');
    try {
      const res = await detectImage(formData);
      setPrediction(res.data);
      toast.success(t('detectionPage.analysisSuccess'));
    } catch (err) {
      console.error('Error detecting disease:', err);
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        toast.error(t('detectionPage.sessionExpiredError'));
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        toast.error(t('detectionPage.analysisFailedError'));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleViewResult = () => {
    if (prediction) {
      navigate('/analysis-result', { state: { prediction } });
    }
  };

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

  const clearPreview = (e) => {
    e.stopPropagation(); // Prevent dropzone click event
    setImage(null);
    setPreview(null);
    setPrediction(null);
  };

  return (
    <div className="agrius-detection-container">
      <div className="agrius-detection-grid">
        {/* Left Column: Text Content */}
        <div className="agrius-detection-text-content">
          <div className="agrius-label-tag">{t('detectionPage.tag')}</div>
          <h1>{t('detectionPage.pageTitle')}</h1>
          <p className="agrius-subtitle">{t('detectionPage.pageSubtitle')}</p>
        </div>

        {/* Right Column: Uploader and Results */}
        <div className="agrius-detection-main-panel">
          {/* Uploader Card */}
          {!prediction && (
            <div className="agrius-card agrius-uploader-card">
              <div className="agrius-mode-switcher">
                <button onClick={() => handleModeChange('upload')} className={mode === 'upload' ? 'active' : ''}>
                  <FiUploadCloud /> {t('detectionPage.uploadImageButton')}
                </button>
                <button onClick={() => handleModeChange('camera')} className={mode === 'camera' ? 'active' : ''}>
                  <FiCamera /> {t('detectionPage.useCameraButton')}
                </button>
              </div>

              {mode === 'upload' && (
                <div {...getRootProps({ className: `agrius-dropzone ${isDragActive ? 'active' : ''}` })}>
                  <input {...getInputProps()} />
                  {preview ? (
                    <div className="agrius-image-preview-container">
                      <img src={preview} alt="Preview" className="agrius-image-preview" />
                      <button onClick={clearPreview} className="agrius-clear-btn">×</button>
                    </div>
                  ) : (
                    <div className="agrius-dropzone-instructions">
                      <div className="agrius-dropzone-icon">
                        <FiUploadCloud size={40} />
                      </div>
                      <p>{t('detectionPage.dropzoneText')}</p>
                      <em>{t('detectionPage.dropzoneSupport')}</em>
                    </div>
                  )}
                </div>
              )}

              {mode === 'camera' && (
                <div className="agrius-camera-container">
                  <video ref={videoRef} autoPlay playsInline muted className="agrius-camera-feed" />
                  {stream && (
                    <div className="agrius-camera-controls">
                      <button onClick={handleCapture} className="agrius-camera-btn"><FiCamera size={24} /></button>
                      <button onClick={switchCamera} className="agrius-camera-btn"><FiRefreshCcw size={24} /></button>
                    </div>
                  )}
                </div>
              )}

              <div className="agrius-action-buttons">
                <button
                  onClick={handleAnalysis}
                  disabled={loading || !image}
                  className="agrius-btn-primary"
                >
                  {loading ? t('detectionPage.analyzingButton') : t('detectionPage.analyzeImageButton')}
                </button>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
             <div className="agrius-card agrius-loading-card">
                <div className="agrius-spinner"></div>
                <p>{t('detectionPage.analyzingImageMessage')}</p>
             </div>
          )}

          {/* Result Card */}
          {prediction && !loading && (
            <div className="agrius-card agrius-result-card">
                <div className="agrius-result-image-wrapper">
                    <img src={preview} alt={prediction.disease} />
                </div>
                <div className="agrius-result-content">
                    <div className="agrius-result-header">
                        <span className="agrius-result-tag">{t('detectionPage.resultTag')}</span>
                        <h2>{prediction.disease.replace(/_/g, ' ')}</h2>
                    </div>
                    
                    <div className="agrius-confidence-badge">
                        <FiCheckCircle />
                        <span>{(prediction.confidence * 100).toFixed(0)}% {t('detectionPage.confidenceLabel')}</span>
                    </div>

                    <div className="agrius-result-summary">
                        <p>
                            {prediction.description
                                ? prediction.description.replace(/\*.+?\*/g, '').split('.').slice(0, 2).join('.') + '.'
                                : t('detectionPage.noDescriptionAvailable')}
                        </p>
                    </div>
                    
                    <button onClick={handleViewResult} className="agrius-btn-primary">
                        {t('detectionPage.viewDetailsButton')} <FiArrowRight />
                    </button>
                    <button onClick={clearPreview} className="agrius-btn-secondary">
                        {t('detectionPage.analyzeAgainButton')}
                    </button>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetectionPage;
