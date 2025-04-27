import axios from "axios";
const API_BASE_URL = "https://";
const live_shop_domain = localStorage.getItem("live_shop_domain");
export const register = async (
  name,
  password,
  email,
  password_confirmation,
  agreeToTerms,
  domain
) => {
  try {
    const payload = {
      name,
      password,
      email,
      password_confirmation,
      agreeToTerms,
      domain,
    };
    console.log("Request Payload:", payload);
    const response = await axios.post(
      `${API_BASE_URL}${live_shop_domain}/api/register`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("API Response Error:", error.response?.data || error);
    throw error;
  }
};
