import axios from "axios";
export const getWishListData = async () => {
  try {
    const response = await axios({
      url: `https://demo.vrtex.duckdns.org/api/wishlist`,
      method: "GET",
      headers: {
        "Accept-Language": "en",
        Authorization: `Bearer ${localStorage.getItem("user token")}`,
      },
    });
    if (response.status === 200) {
      console.log("success get wishlist data");
      console.log("wishlist data",response.data.data)
      return response.data.data;
    }
  } catch (error) {
    console.error("Failed to fetch Wishlist data: ", error);
    throw error;
  }
};
