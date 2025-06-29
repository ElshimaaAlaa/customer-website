import axios from "axios";

export const getCategories = async () => {
  try {
    const response = await axios.get(
      `https://demo.vrtex.duckdns.org/api/categories`,
      {
        headers: {
          "Accept-Language": "en",
          Authorization: `Bearer ${localStorage.getItem("user token")}`,
        },
      }
    );
    if (response.status === 200) {
      console.log("cats data", response.data.data);
      return response.data.data;
    }
  } catch (error) {
    console.error("Failed to fetch data: ", error);
    throw error;
  }
};
