import axios from "axios";
export const SendSupport = async (email, name, phone, message) => {
  try {
    const response = await axios({
      method: "POST",
      url: `https://demo.vrtex.duckdns.org/api/send-contact`,
      data: { email, name, phone, message },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": "ar",
      },
    });
    if (response.status === 200) {
      console.log("Support sent successfully");
      return response.data;
    }
  } catch (error) {
    console.error("Failed to send support", error);
    throw error;
  }
};
