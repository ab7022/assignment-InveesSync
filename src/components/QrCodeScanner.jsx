// QrCodeScanner.jsx
import React from "react";
import QrScanner from "react-qr-scanner";

const QrCodeScanner = ({ onScan, onError, isCameraOpen }) => (
  <div>
 
    {isCameraOpen && (
      <QrScanner
        onScan={onScan}
        onError={onError}
        style={{ width: "100%" }}
      />
    )}
  </div>
);

export default QrCodeScanner;