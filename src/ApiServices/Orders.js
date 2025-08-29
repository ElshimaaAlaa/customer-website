import axios from "axios";

export const Orders = async () => {
  try {
    const response = await axios.get(
      `https://demo.vrtex.duckdns.org/api/orders`,
      {
        headers: {
          "Accept-Language": "en",
          Authorization: `Bearer ${localStorage.getItem("user token")}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    console.error("Failed to fetch data: ", error);
    throw error;
  }
};