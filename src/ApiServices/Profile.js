import axios from "axios";
const API_BASE_URL = "https://";
const live_customer_domain = localStorage.getItem("live_customer_domain");
export const Profile = async () => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}/${live_customer_domain}/api/profile`,
      method: "GET",
      headers: {
        "Accept-Language": "en",
        Authorization: `Bearer ${localStorage.getItem("user token")}`,
      },
    });
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    console.error("Failed to fetch profile data: ", error);
    throw error;
  }
};