import axios from "axios";
const API_BASE_URL = "https://";
const live_customer_domain = localStorage.getItem("live_customer_domain");
export const toggleWishlist = async (productId) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${API_BASE_URL}${live_customer_domain}/api/wishlist/toggle/${productId}`,
      headers: {
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
