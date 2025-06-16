import axios from "axios";
export const settings = async () => {
  try {
    const response = await axios({
      url: `https://demo.vrtex.duckdns.org/api/settings`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": "ar",
      },
    });
    if (response.status === 200) {
      console.log("get general settings success");
      return response.data.data;
    }
  } catch (error) {
    console.error("Failed to add FAQ", error);
    throw error;
  }
};
