// frontend/src/components/RealtimeDetection.jsx
import React, { useRef, useEffect, useState } from 'react';
import { detectRealtimeImage, getDiseaseDetailsByName } from '../services/api'; // Import the new API function
import { useTranslation } from 'react-i18next'; // Assuming i18n might be used later for consistency
import './RealtimeDetection.css'; // Import component-specific styles

// Helper function to format text with bold for asterisks
const formatTextWithBold = (text) => {
  if (!text) return { __html: '' };
  // Replace single asterisks with <strong> tags, handling cases like *word* or *phrase with spaces*
  // It specifically looks for patterns like *text* where 'text' doesn't contain spaces around asterisks,
  // and correctly ignores multiplication signs or other non-formatting asterisks.
  const formattedText = text.replace(/\*(.+?)\*/g, '<strong>$1</strong>');
  return { __html: formattedText.replace(/\n/g, '<br />') }; // Replace newlines with <br /> for proper rendering
};

const RealtimeDetection = () => {
  const { t, i18n } = useTranslation(); // Destructure i18n
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState('');
  const [currentDetection, setCurrentDetection] = useState({ disease: t('realtime.detecting'), confidence: 0 });
  const [isDetecting, setIsDetecting] = useState(false);
  const [processingError, setProcessingError] = useState(''); // New state for API call errors

  const llmCache = useRef({}); // Cache for LLM explanations

  // --- New state for debouncing and LLM ---
  const [stableDetection, setStableDetection] = useState({ disease: '', confidence: 0 });
  const [llmExplanation, setLlmExplanation] = useState(null);
  const [llmRecommendedSolutions, setLlmRecommendedSolutions] = useState([]); // For LLM-fetched recommended solutions
  const [isLlmLoading, setIsLlmLoading] = useState(false);
  const [llmError, setLlmError] = useState('');
  // --- End new state ---

  useEffect(() => {
    // Access camera
    const enableStream = async () => {
      try {
        // Request a lower resolution video to optimize performance
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: "environment" // Prefer rear camera on mobile
          }
        });
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError(t('realtime.cameraAccessError'));
      }
    };

    enableStream();

    // Cleanup on component unmount
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream, t]);

  // Function to capture, preprocess, and send frames to backend
  const captureAndSendFrame = async () => {
    if (videoRef.current && canvasRef.current && !isDetecting && videoRef.current.readyState === 4) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      const targetSize = 224; // Model input size

      canvas.width = targetSize;
      canvas.height = targetSize;

      // Crop the video frame to be square, centered
      const videoAspectRatio = video.videoWidth / video.videoHeight;
      const canvasAspectRatio = targetSize / targetSize; // 1
      
      let sx, sy, sWidth, sHeight; // Source rectangle in video

      if (videoAspectRatio > canvasAspectRatio) { // Video is wider than canvas (landscape or wider than square)
        sHeight = video.videoHeight;
        sWidth = sHeight * canvasAspectRatio;
        sx = (video.videoWidth - sWidth) / 2;
        sy = 0;
      } else { // Video is taller than canvas (portrait or taller than square)
        sWidth = video.videoWidth;
        sHeight = sWidth / canvasAspectRatio;
        sy = (video.videoHeight - sHeight) / 2;
        sx = 0;
      }

      context.drawImage(video, sx, sy, sWidth, sHeight, 0, 0, targetSize, targetSize);
      
      canvas.toBlob(async (blob) => {
        if (blob) {
          setIsDetecting(true);
          setProcessingError(''); // Clear previous processing errors
          try {
            const response = await detectRealtimeImage(blob);
            setCurrentDetection({
              disease: response.data.disease,
              confidence: response.data.confidence,
            });
          } catch (apiError) {
            console.error("Error sending frame for detection:", apiError);
            if (apiError.response && apiError.response.data && apiError.response.data.message) {
              setProcessingError(apiError.response.data.message);
            } else {
              setProcessingError(t('realtime.detectionFailed'));
            }
          } finally {
            setIsDetecting(false);
          }
        }
      }, 'image/jpeg', 0.7); // Convert to JPEG Blob with 70% quality to save bandwidth
    }
  };

  // Set up interval for capturing and sending frames
  useEffect(() => {
    let intervalId;
    if (stream) {
      // Capture and send a frame every X milliseconds (e.g., 500ms)
      // Adjust interval based on backend processing speed and desired responsiveness
      // Also ensure video metadata is loaded before trying to draw
      videoRef.current.onloadedmetadata = () => {
        intervalId = setInterval(captureAndSendFrame, 1000); // Send frame every 1 second
      };
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
      if (videoRef.current) videoRef.current.onloadedmetadata = null; // Clean up event listener
    };
  }, [stream, isDetecting, t]);

  // --- Debounce mechanism for stable detection ---
  useEffect(() => {
    const handler = setTimeout(() => {
      // Only update stableDetection if currentDetection has actually changed from the last stable one
      // and it's not the initial "Detecting..." state
      if (currentDetection.disease && 
          currentDetection.disease !== t('realtime.detecting') && 
          currentDetection.disease !== stableDetection.disease) {
        setStableDetection(currentDetection);
        setLlmExplanation(null); // Clear previous LLM explanation
        setLlmRecommendedSolutions([]); // Clear previous LLM recommended solutions
        setLlmError(''); // Clear previous LLM error
      }
    }, 2000); // 2 second debounce time

    // Cleanup: clear timeout if currentDetection.disease changes before the delay
    return () => {
      clearTimeout(handler);
    };
  }, [currentDetection.disease, stableDetection.disease, t]);

  // --- Effect to fetch LLM explanation when stable detection changes ---
  useEffect(() => {
    const fetchLlmExplanation = async () => {
      if (stableDetection.disease && stableDetection.disease !== t('realtime.detecting')) {
        setIsLlmLoading(true);
        setLlmError('');
        try {
          const response = await getDiseaseDetailsByName(stableDetection.disease, i18n.language);
          setLlmExplanation(response.data.disease.gemini_summary);
          setLlmRecommendedSolutions(response.data.recommendedSolutions || []);
        } catch (err) {
          console.error("Error fetching LLM explanation:", err);
          setLlmExplanation(null); // Clear previous explanation
          setLlmRecommendedSolutions([]); // Clear previous recommendations
          if (err.response && err.response.data && err.response.data.message) {
            setLlmError(err.response.data.message);
          } else {
            setLlmError(t('realtime.llmExplanationFailed'));
          }
        } finally {
          setIsLlmLoading(false);
        }
      } else {
        setLlmExplanation(null);
        setLlmRecommendedSolutions([]);
        setLlmError('');
      }
    };

    fetchLlmExplanation();
  }, [stableDetection.disease, i18n.language, t]); // Dependencies


  if (error) {
    return <div className="realtime-detection-container error-message">{error}</div>;
  }

  return (
    <div className="realtime-detection-container">
      <h1>{t('realtime.title')}</h1>
      <div className="video-feed-container">
        <video ref={videoRef} autoPlay playsInline muted className="realtime-video"></video>
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas> {/* Canvas for frame capture, hidden */}
      </div>
      <div className="detection-results">
        <h2>{t('realtime.detected')}: {currentDetection.disease}</h2>
        <p>{t('realtime.confidence')}: {(currentDetection.confidence * 100).toFixed(2)}%</p>
        {isDetecting && <p className="loading-text">{t('realtime.processing')}</p>}
        {processingError && <p className="error-message">{processingError}</p>}
      </div>
      <div className="llm-explanation">
        <h3>{t('realtime.llmExplanationTitle')}</h3>
        {isLlmLoading && <p className="loading-text">{t('realtime.loadingLlmExplanation')}</p>}
        {llmError && <p className="error-message">{llmError}</p>}
        {llmExplanation && (
          <div>
            <div className="gemini-section-detailed">
              <h4><i className="fas fa-info-circle"></i> {t('realtime.detailedInfo')}</h4>
              <p dangerouslySetInnerHTML={formatTextWithBold(llmExplanation.informasi_detail || t('realtime.noDetailedInfo'))}></p>
            </div>
            <div className="gemini-section-detailed">
              <h4><i className="fas fa-seedling"></i> {t('realtime.solutionHealing')}</h4>
              <p dangerouslySetInnerHTML={formatTextWithBold(llmExplanation.solusi_penyembuhan || t('realtime.noSolutionInfo'))}></p>
            </div>
            {/* LLM Recommended Products (if any) will be rendered here */}
            {llmRecommendedSolutions.length > 0 && (
              <div className="gemini-section-detailed">
                <h4><i className="fas fa-prescription-bottle-alt"></i> {t('realtime.llmProductRecs')}</h4>
                <ul className="product-list-detailed">
                  {llmRecommendedSolutions.map((product, index) => (
                    <li key={product.nama_produk || index} className="product-item-detailed">
                      <strong>{product.nama_produk}:</strong> {product.deskripsi_singkat}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        {stableDetection.disease && !llmExplanation && !isLlmLoading && !llmError && 
          stableDetection.disease !== t('realtime.detecting') && 
          <p>{t('realtime.selectDiseaseForExplanation')}</p>}
      </div>
    </div>
  );
};

export default RealtimeDetection;
