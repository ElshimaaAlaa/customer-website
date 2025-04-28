import axios from "axios";
const API_BASE_URL = "https://";
const live_shop_domain = localStorage.getItem("live_shop_domain");
export const Profile = async () => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}/${live_shop_domain}/api/profile`,
      method: "GET",
      headers: {
        "Accept-Language": "en",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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