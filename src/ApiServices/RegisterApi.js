import axios from "axios";
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
      `https://demo.vrtex.duckdns.org/api/register`,
      payload,
      {
        headers: {
          Accept: "application/json",
          "Accept-Language": "ar",
        },
      }
    );

    if (response.status === 200) {
      localStorage.setItem("register token", response.data.token);
      return response.data.data;
    }
  } catch (error) {
    console.error("API Response Error:", error.response?.data || error);
    throw error;
  }
};
