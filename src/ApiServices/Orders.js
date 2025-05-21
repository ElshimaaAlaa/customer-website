import axios from "axios";
const API_BASE_URL = "https://";
const live_shop_domain = localStorage.getItem("live_shop_domain");
export const Orders = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}${live_shop_domain}/api/orders`,
      {
        headers: {
          "Accept-Language": "en",
          Authorization: `Bearer ${localStorage.getItem("user token")}`,
        },
      }
    );
    if (response.status === 200) {
      console.log("orders data",response.data.data);
      return response.data.data;
    }
  } catch (error) {
    console.error("Failed to fetch data: ", error);
    throw error;
  }
};