import axios from "axios";
export const getHomeData = async () => {
  try {
    const response = await axios({
      url: `https://demo.vrtex.duckdns.org/api/home`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Accept-Language": "en",
      },
    });
    if (response.status === 200) {
      console.log("success get home data");
      console.log("home data",response)
      return response.data.data;
    }
  } catch (error) {
    console.error("Failed to fetch home data: ", error);
    throw error;
  }
};
