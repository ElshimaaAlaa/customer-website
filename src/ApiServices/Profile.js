import axios from "axios";
export const Profile = async () => {
  try {
    const response = await axios({
      url: `https://demo.vrtex.duckdns.org/api/profile`,
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