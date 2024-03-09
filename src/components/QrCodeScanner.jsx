import React from "react";
import QrScanner from "react-qr-scanner";

const QrCodeScanner = ({ onScan, onError, isCameraOpen, facingMode }) => {
  const cameraConstraints = {
    video: {
      facingMode: facingMode, // 'user' for front camera, 'environment' for back camera
    },
  };

  return (
    <div>
      {isCameraOpen && (
        <QrScanner
          onScan={onScan}
          onError={onError}
          style={{ width: "100%" }}
          constraints={cameraConstraints}
        />
      )}
    </div>
  );
};

export default QrCodeScanner;
