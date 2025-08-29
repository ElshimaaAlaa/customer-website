import axios from "axios";

export const getProducts = async () => {
  try {
    const response = await axios({
      url: `https://demo.vrtex.duckdns.org/api/products`,
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
    console.error(error);
  }
};
