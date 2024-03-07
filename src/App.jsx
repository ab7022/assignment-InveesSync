// App.jsx
import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import QrScanner from "react-qr-scanner";
import numberToWords from "number-to-words";

function App() {
  const [response, setResponse] = useState([]);
  const [items, setItems] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [scannedValue, setScannedValue] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isDestinationMatched, setIsDestinationMatched] = useState(false);

  useEffect(() => {
    axios
      .get("https://api-staging.inveesync.in/test/get-items")
      .then((response) => {
        setResponse((prevResponse) => [...prevResponse, ...response.data]);
        setItems(
          response.data.map((item) => ({
            value: item.id,
            label: item.item_name,
            allowedLocations: item.allowed_locations || [],
            unit: item.unit || "",
          }))
        );
      })
      .catch(() => console.log("Something went wrong"));
  }, []);

  const handleItemChange = (event) => {
    const selectedItemData = response.find(
      (item) => item.id == event.target.value
    );
    setSelectedItem(selectedItemData);
    setDestinations(selectedItemData?.allowed_locations || []);
    setUnit(selectedItemData?.unit || "");
    setIsDestinationMatched(false); // Reset the destination matched state
  };
  // or using useEffect
  useEffect(() => {
    // Log destinations here or perform any other actions
    console.log("destinations in useEffect:", destinations);
  }, [destinations]);

  const handleScan = (data) => {
    if (data) {
      setScannedValue(data);

      console.log("it is scanned from camera", data.text);
      // Check if the scanned QR code matches any of the allowed locations
      console.log("destination is ", destinations);
      const isLocationAllowed = destinations.includes(data.text);

      if (isLocationAllowed) {
        // Show success message
        console.log("Location is allowed. Success!");
        setIsCameraOpen(false);
        setIsDestinationMatched(true);
      } else {
        // Show failed message
        console.log("Location is not allowed. Failed!");
        setIsDestinationMatched(false);
      }
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const openCamera = () => {
    setIsCameraOpen(true);
  };

  const getQuantityMessage = () => {
    const quantityNumber = parseInt(quantity, 10);
    if (isNaN(quantityNumber) || quantityNumber === 0) {
      return "";
    }
    const quantityWords = numberToWords.toWords(quantityNumber);
    return `${quantityWords}`;
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <div>
        <div className="bg-white p-6 shadow-md w-full  rounded-xl">
          <label htmlFor="item" className="text-lg font-semibold mb-2 block">
            Select Item
          </label>
          <select
            name="item"
            id="item"
            className="w-full p-2 border rounded-md bg-gray-50 "
            onChange={handleItemChange}
          >
            <option value="">Choose an Item</option>
            {items.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <div className="mt-4 grid grid-cols-1 2 gap-4">
            <div className="">
              <label
                htmlFor="quantity"
                className="text-lg font-semibold mb-2 block"
              >
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                placeholder="Enter quantity"
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
                className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
              {getQuantityMessage() && (
                <p className="text-green-500 mt-2">{getQuantityMessage()}</p>
              )}
            </div>
            <div className="">
              <label
                htmlFor="unit"
                className="text-lg font-semibold mb-2 block"
              >
                Unit
              </label>
              <input
                type="text"
                id="unit"
                placeholder="Unit"
                className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                value={unit}
                readOnly
              />
            </div>
            <div className="">
              <label
                htmlFor="dest"
                className="text-lg font-semibold mb-2 block"
              >
                Destination
              </label>
              <select
                name="dest"
                id="dest"
                className="w-full p-2 border rounded-md bg-blue-50 focus:outline-none focus:border-blue-500"
              >
                {destinations &&
                  destinations.map((destination) => (
                    <option key={destination} value={destination}>
                      {destination}
                    </option>
                  ))}
              </select>
            </div>
            <div className="w-full">
              <button
                className="bg-blue-200 text-black block text-white p-2 rounded-xl w-full text-semibold"
                onClick={openCamera}
              >
                Open Camera
              </button>
              {isCameraOpen && (
                <div className="mt-4">
                  <label
                    htmlFor="qrScanner"
                    className="text-lg font-semibold mb-2 block"
                  >
                    QR Code Scanner
                  </label>
                  <QrScanner
                    onScan={handleScan}
                    onError={handleError}
                    style={{ width: "100%" }}
                  />
                </div>
              )}
            </div>
            {isDestinationMatched ? (
              <div className="w-full">
                {" "}
                <p className="text-green-500 mt-2 text-center">Destination verified!</p>
                <button className="bg-blue-500 block text-white p-2 rounded-xl w-full font-bold">
                  Submit
                </button>
                
              </div>
            ) : (
              <div className="w-full">
                {" "}
                <p className="text-red-500 mt-2 text-center">Please verify the destination!</p>
                <button className="bg-blue-300  disabled:bg-blue-400 block text-white p-2 rounded-xl w-full font-bold shadow">
              Submit
            </button>
              </div>
            )}

           
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
