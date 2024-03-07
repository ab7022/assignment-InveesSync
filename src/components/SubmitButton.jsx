// SubmitButton.jsx
import React from "react";

const SubmitButton = ({ isDestinationMatched }) => (
  <div className="w-full">
    {isDestinationMatched ? (
      <div>
        <p className="text-green-500 mt-2 text-center">
          Destination verified!
        </p>
        <button className="bg-blue-500 block text-white p-2 rounded-xl w-full font-bold">
          Submit
        </button>
      </div>
    ) : (
      <div>
        <p className="text-red-500 mt-2 text-center">
          Please verify the destination!
        </p>
        <button className="bg-blue-300  disabled:bg-blue-400 block text-white p-2 rounded-xl w-full font-bold shadow">
          Submit
        </button>
      </div>
    )}
  </div>
);

export default SubmitButton;
