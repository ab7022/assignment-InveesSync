import React, { useState, useEffect } from "react";
import "./App.css";
import numberToWords from "number-to-words";
import ItemSelection from "./components/ItemSelection";
import QuantityInput from "./components/QuantityInput";
import QrCodeScanner from "./components/QrCodeScanner";
import SubmitButton from "./components/SubmitButton";
import { getItems } from "./api";

function App() {
  const [response, setResponse] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const [items, setItems] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isDestinationMatched, setIsDestinationMatched] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemsData = await getItems();
        setItems(itemsData);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const handleItemChange = (event, scannedLocation) => {
    const selectedItemId = event.target.value;
    const selectedItemData = items.find((item) => item.value == selectedItemId);
  
    // Update the selected item with the scanned location
    selectedItemData.allowed_Locations = [scannedLocation];
  
    setSelectedItems([selectedItemData]);
    setSelectedItem(selectedItemData);
    setDestinations(selectedItemData?.allowedLocations || []);
    setUnit(selectedItemData?.unit || "");
  };
  //test

  const handleScan = (data) => {
    if (data) {
      console.log("Scanned Data:", data.text);
      const scannedLocation = data.text;
      const isLocationAllowed = destinations.includes(scannedLocation);
  
      // Use the state updater function to ensure you have the latest state
      setIsCameraOpen((prevIsCameraOpen) => {
        if (isLocationAllowed) {
          console.log("Destination is allowed. Success!");
          setIsDestinationMatched(true);
          setIsCameraOpen(false)
          handleItemChange({ target: { value: selectedItem?.value } }, scannedLocation);
        } else {
          console.log("Destination is not allowed. Failed!");
          setIsDestinationMatched(false);
        }
  
        return prevIsCameraOpen;
      });
    }
  };
  
  
  

  const handleError = (error) => {
    console.error(error);
  };

  const openCamera = () => {
    setIsCameraOpen(true);
  };

  const getQuantityMessage = () => {
    const quantityNumber = +quantity;
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
          <ItemSelection items={items} handleItemChange={handleItemChange} />

          <div className="mt-4 grid grid-cols-1 2 gap-4">
            <QuantityInput
              setQuantity={setQuantity}
              getQuantityMessage={getQuantityMessage}
            />

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
                className="w-full p-2 border rounded-md focus:border-blue-500"
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
                className="w-full p-2 border rounded-md bg-blue-50 focus:border-blue-500"
              >
                <option value="" className="text-gray-400">
                  List of available destinations
                </option>
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
                Scan Destination Location
              </button>
              <QrCodeScanner
                onScan={handleScan}
                onError={handleError}
                isCameraOpen={isCameraOpen}
              />
            </div>

            <SubmitButton
              isDestinationMatched={isDestinationMatched}
              selectedItem={selectedItems}
              quantity={quantity}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
