import React, { useRef, useEffect } from 'react';

const QrCodeScanner = ({ onScan, onError, isCameraOpen }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    let videoStream;

    const setupCamera = async () => {
      try {
        videoStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment', // 'user' for front camera, 'environment' for back camera
          },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = videoStream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        onError && onError(error);
      }
    };

    const startScanning = () => {
      const video = videoRef.current;

      const handleScan = async () => {
        const videoSettings = video.srcObject.getVideoTracks()[0].getSettings();
        const imageCapture = new ImageCapture(videoSettings);

        const blob = await imageCapture.takePhoto();

        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          onScan && onScan({ text: reader.result });
        };
      };

      video.addEventListener('loadedmetadata', () => {
        video.play();
        handleScan(); // Trigger initial scan
      });

      video.addEventListener('error', (error) => {
        console.error('Error playing video:', error);
        onError && onError(error);
      });
    };

    if (isCameraOpen) {
      setupCamera();
    } else if (videoStream) {
      videoStream.getTracks().forEach((track) => track.stop());
    }

    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isCameraOpen, onScan, onError]);

  return (
    <div className={`w-full ${isCameraOpen ? '' : 'hidden'}`}>
      <video ref={videoRef} className="w-full" autoPlay playsInline />
    </div>
  );
};

export default QrCodeScanner;
