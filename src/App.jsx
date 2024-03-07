import React, { useState, useEffect } from "react";
import "./App.css"; 
import axios from "axios";

function App() {
  const [response, setResponse] = useState([]);
  const [items, setItems] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [unit, setUnit] = useState("");

  useEffect(() => {
    axios
      .get("https://api-staging.inveesync.in/test/get-items")
      .then((response) => {
        setResponse(response.data);
        setItems(
          response.data.map((item) => ({
            value: item.id,
            label: item.item_name,
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
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <div>
        <div className="bg-white p-6 shadow-md w-full md:w-1/2 rounded-xl">
          <label htmlFor="item" className="text-lg font-semibold mb-2 block">
            Select Item
          </label>
          <select
            name="item"
            id="item"
            className="w-full p-2 border rounded-md bg-gray-50 focus:border-blue-500"
            onChange={handleItemChange}
          >
            <option value="">Choose an Item</option>
            {items.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
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
                className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
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
            
            <button className="bg-blue-500 block text-white p-2 rounded-xl">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
