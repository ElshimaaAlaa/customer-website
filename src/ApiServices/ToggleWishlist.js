import axios from "axios";
export const toggleWishlist = async (productId) => {
  try {
    const response = await axios({
      method: "GET",
      url: `https://demo.vrtex.duckdns.org/api/wishlist/toggle/${productId}`,
      headers: {
        "Accept-Language": "en",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("user token")}`,
      },
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
