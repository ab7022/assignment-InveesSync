// QrCodeScanner.jsx
import React from "react";
import QrScanner from "react-qr-scanner";

const QrCodeScanner = ({ onScan, onError, isCameraOpen }) => (
  <div>
    <label htmlFor="qrScanner" className="text-lg font-semibold mb-2 block">
      QR Code Scanner
    </label>
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
