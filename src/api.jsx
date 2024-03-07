
import axios from "axios";

export const getItems = async () => {
    const API_ENDPOINT = "https://api-staging.inveesync.in/test/get-items";

  try {
    const response = await axios.get(API_ENDPOINT);
    return response.data.map((item) => ({
      value: item.id,
      label: item.item_name,
      allowedLocations: item.allowed_locations || [],
      unit: item.unit || "",
    }));
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error; 
  }
};