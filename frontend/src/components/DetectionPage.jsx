import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { detectImage } from '../services/api'; 
import './DetectionPage.css';
import { FiUploadCloud, FiCamera, FiArrowRight, FiRefreshCcw } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const DetectionPage = () => {
  const { t } = useTranslation();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState(null); // Still needed to know when analysis is done
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('upload'); 
  const [stream, setStream] = useState(null);
  const [currentFacingMode, setCurrentFacingMode] = useState('environment'); // 'user' for front, 'environment' for back
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
      setError(t('detectionPage.cameraAccessError'));
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const switchCamera = () => {
    stopCamera(); // Stop current stream
    const newFacingMode = currentFacingMode === 'environment' ? 'user' : 'environment';
    setCurrentFacingMode(newFacingMode);
    // Restart camera with new facing mode
    // This will be handled by the useEffect that watches currentFacingMode, or by calling startCamera directly
    // For now, let's call startCamera directly after setting the new mode.
    // However, startCamera uses the state, so it might not get the updated state immediately.
    // A better approach is to trigger startCamera when currentFacingMode changes.
    // Let's modify startCamera to accept a facingMode parameter or rely on useEffect.
    // For simplicity and immediate effect, I'll modify startCamera to accept a parameter.
    // But first, let's ensure the state update triggers a re-render and then startCamera.
    // The useEffect for stream cleanup is good. We need another useEffect for currentFacingMode changes.
  };

  useEffect(() => {
    if (mode === 'camera' && currentFacingMode) {
      startCamera();
    }
  }, [currentFacingMode, mode]); // Re-run startCamera when facing mode or mode changes

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
      // When switching to camera mode, ensure we start with the currentFacingMode
      // The useEffect above will handle calling startCamera when mode becomes 'camera'
      // and currentFacingMode is set.
    } else {
      stopCamera();
    }
  };

  const handleAnalysis = async () => {
    if (!image) {
      setError(t('detectionPage.imageRequiredError'));
      return;
    }

    setLoading(true);
    setPrediction(null);
    setError('');

    const formData = new FormData();
    formData.append('image', image, 'image.jpg');

    try {
      const res = await detectImage(formData);
      // Instead of navigating directly, just set the prediction data.
      // This will make the "View Analysis" button appear.
      setPrediction(res.data); 
    } catch (err) {
      console.error('Error detecting disease:', err);
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        setError(t('detectionPage.sessionExpiredError'));
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(t('detectionPage.analysisFailedError'));
      }
    } finally {
      setLoading(false);
    }
  };

  // This function is triggered by the new button
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

  const clearPreview = () => {
    setImage(null);
    setPreview(null);
    setPrediction(null);
    setError('');
  };

  return (
    <div className="agrius-detection-page">
      <div className="agrius-detection-main-layout">
        <div className="agrius-detection-input-section">
          <div className="agrius-detection-controls">
            <h2>{t('detectionPage.pageTitle')}</h2>
            <p>{t('detectionPage.pageSubtitle')}</p>
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
                    <button onClick={clearPreview} className="agrius-clear-btn">X</button>
                  </div>
                ) : (
                  <div className="agrius-dropzone-text">
                    <FiUploadCloud size={50} />
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
                    <button onClick={handleCapture} className="agrius-btn-capture"><FiCamera size={24} /></button>
                    <button onClick={switchCamera} className="agrius-btn-switch-camera"><FiRefreshCcw size={24} /></button>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons Area */}
            <div className="agrius-action-buttons">
              <button 
                onClick={handleAnalysis} 
                disabled={loading || !image || !!prediction} // Disable if analysis is done
                className="agrius-btn-primary agrius-btn-analyze"
              >
                {loading ? t('detectionPage.analyzingButton') : t('detectionPage.analyzeImageButton')}
              </button>
            </div>
            {error && <div className="agrius-error-message" style={{marginTop: 'var(--spacing-md)'}}>{error}</div>}
          </div>
        </div>

        <div className="agrius-detection-results-section">
          {/* Basic result shown here */}
          {prediction && !loading && (
            <div className="agrius-result-card" style={{marginTop: '0'}}>
              <h3>{t('detectionPage.summaryTitle')}</h3>
              <div className="agrius-result-header">
                <h2>{prediction.disease.replace(/_/g, ' ')}</h2>
              </div>
              <div className="agrius-confidence">
                <p>{t('detectionPage.confidenceLabel')}</p>
                <div className="agrius-confidence-bar-container">
                  <div 
                    className="agrius-confidence-bar" 
                    style={{ width: `${(prediction.confidence * 100).toFixed(2)}%` }}
                  >
                    <span>{(prediction.confidence * 100).toFixed(2)}%</span>
                  </div>
                </div>
              </div>
              <div className="agrius-result-details">
                <h4>{t('detectionPage.descriptionLabel')}</h4>
                <p>{prediction.description}</p>
                <h4>{t('detectionPage.preventionLabel')}</h4>
                <p>{prediction.prevention}</p>
              </div>
              <button 
                onClick={handleViewResult}
                className="agrius-btn-primary agrius-btn-view-result"
                style={{width: '100%', marginTop: 'var(--spacing-md)'}}
              >
                {t('detectionPage.viewDetailsButton')} <FiArrowRight />
              </button>
            </div>
          )}
          {!prediction && !loading && !error && (
            <div className="agrius-no-results">
              <p>{t('detectionPage.noResultsMessage')}</p>
            </div>
          )}
          {loading && (
            <div className="agrius-loading-spinner">
              <div className="agrius-spinner"></div>
              <p>{t('detectionPage.analyzingImageMessage')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetectionPage;
