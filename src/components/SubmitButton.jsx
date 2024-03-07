// SubmitButton.jsx
import React from "react";
import axios from "axios";

const SubmitButton = ({ isDestinationMatched, selectedItem }) => {
  const handleSubmit = async () => {
    try {
      // Prepare the data to be sent in the POST request
      const postData = selectedItem.map((item) => ({
        id: item.value,
        item_name: item.label,
        location: item.location, // Assuming the location is part of the selected item data
      }));

      // Send the POST request to the server
      const response = await axios.post(
        "https://api-staging.inveesync.in/test/submit",
        postData
      );

      // Handle the response from the server as needed
      console.log("POST request successful:", response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="w-full">
      {isDestinationMatched ? (
        <div>
          <p className="text-green-500 mt-2 text-center">
            Destination verified!
          </p>
          <button
            className="bg-blue-500 block text-white p-2 rounded-xl w-full font-bold"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      ) : (
        <div>
          <p className="text-red-500 mt-2 text-center">
            Please verify the destination!
          </p>
          <button
            className="bg-blue-300 disabled:bg-blue-400 block text-white p-2 rounded-xl w-full font-bold shadow"
            disabled
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default SubmitButton;
