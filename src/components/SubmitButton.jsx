// SubmitButton.jsx
import React from "react";
import axios from "axios";

const SubmitButton = ({ isDestinationMatched, selectedItem, quantity }) => {
  const handleSubmit = async () => {
    try {
      // Check if destination is matched and at least one item is selected
      if (isDestinationMatched && selectedItem.length > 0) {
        const selectedItemId = selectedItem[0].value;
        const itemName = selectedItem[0].label;
        console.log("Selected Item:", selectedItem);
        const scannedDestination = document.getElementById("dest").value;
        console.log("Scanned Destination:", scannedDestination);  
        // Prepare data to be submitted
        const dataToSubmit = {
          id: selectedItemId,
          itemName: itemName,
          scannedDestination: scannedDestination,
          quantity: quantity,
          // Add other data you want to submit
        };
  
        // Make a POST request to the server
        const response = await axios.post(
          "https://api-staging.inveesync.in/test/submit",
          dataToSubmit
        );
  
        // Handle the server response as needed
        console.log("Server response:", response.data);
      } else {
        console.log("Destination not matched or no item selected");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  }

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
