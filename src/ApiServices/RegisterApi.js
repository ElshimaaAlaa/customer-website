import axios from "axios";
const API_BASE_URL = "https://";
const live_customer_domain = localStorage.getItem("live_customer_domain");
export const register = async (
  name,
  password,
  email,
  password_confirmation,
  agreeToTerms
) => {
  try {
    const payload = {
      name,
      password,
      email,
      password_confirmation,
      agreeToTerms,
    };
    console.log("Request Payload:", payload);
    const response = await axios.post(
      `${API_BASE_URL}demo.vrtex.duckdns.org/api/register`,
      payload
    );
    if (response.status === 200) {
      localStorage.setItem("register token", response.data.token);
      console.log("register token", response.data.data.token);
      return response.data.data;
    }
  } catch (error) {
    console.error("API Response Error:", error.response?.data || error);
    throw error;
  }
};
