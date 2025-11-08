import axios from "axios";
export const RateOrder = async (
  order_id,
  product_quality,
  shipping_speed,
  customer_service,
  comment
) => {
  try {
    const response = await axios({
      url: `https://demo.vrtex.duckdns.org/api/rate-order`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Language": "ar",
        Authorization: `Bearer ${localStorage.getItem("user token")}`,
      },
      data: {
        order_id,
        product_quality,
        shipping_speed,
        customer_service,
        comment,
      },
    });
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    console.error("Failed to send rate  ", error);
    return false;
  }
};
