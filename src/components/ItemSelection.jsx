// ItemSelection.jsx
import React from "react";

const ItemSelection = ({ items, handleItemChange }) => (
  <div>
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
        <option key={item.value} value={item.value} data-location={item.allowedLocations}>
          {item.label}
        </option>
      ))}
    </select>
  </div>
);

export default ItemSelection;
