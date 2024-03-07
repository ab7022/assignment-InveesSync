// QuantityInput.jsx
import React from "react";

const QuantityInput = ({ setQuantity, getQuantityMessage }) => (
  <div>
    <label htmlFor="quantity" className="text-lg font-semibold mb-2 block">
      Quantity
    </label>
    <input
      type="number"
      id="quantity"
      placeholder="Enter quantity"
      onChange={(e) => setQuantity(e.target.value)}
      className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
    />
    {getQuantityMessage() && (
      <p className="text-green-500 mt-2">{getQuantityMessage()}</p>
    )}
  </div>
);

export default QuantityInput;
