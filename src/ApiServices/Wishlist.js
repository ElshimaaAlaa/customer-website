import axios from "axios";
const API_BASE_URL = "https://";
const live_shop_domain = localStorage.getItem("live_shop_domain");
export const getWishListData = async () => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}/${live_shop_domain}/api/wishlist`,
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
