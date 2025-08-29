import axios from "axios";
export const applyCoupon = async (coupon, price) => {
  try {
    const data = await axios({
      url: `https://demo.vrtex.duckdns.org/api/orders/apply-coupon`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Language": "ar",
        Authorization: `Bearer ${localStorage.getItem("user token")}`,
      },
      data: {
        coupon,
        price,
      },
    });
    if (data.status === 200) {
      return true;
    }
  } catch (error) {
    console.error("Failed to apply coupon ", error);
    return false;
  }
};
