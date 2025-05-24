import axios from "axios";
const API_BASE_URL = "https://";
const live_customer_domain = localStorage.getItem("live_customer_domain");
export const getHomeData = async () => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}demo.vrtex.duckdns.org/api/home`,
      method: "GET",
      headers: {
        "Accept-Language": "en",
        Authorization: `Bearer ${localStorage.getItem("user token")}`,
      },
    });
    if (response.status === 200) {
        console.log('success get home data')
      return response.data.data;
    }
  } catch (error) {
    console.error("Failed to fetch home data: ", error);
    throw error;
  }
};