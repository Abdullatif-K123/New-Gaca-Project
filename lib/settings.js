// settings.js
import axios from "axios";

export const fetchSettings = async () => {
  try {
    const response = await axios.get(
      "https://gaca.somee.com/api/landingpage/settings"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching settings:", error);
    return {};
  }
};
