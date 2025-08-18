import axios from "axios";
export const checkoutOrder = async (
  order_id,
  payment_method,
  transaction_id,
  response
) => {
  try {
    const data = await axios({
      url: `https://demo.vrtex.duckdns.org/api/orders/checkout`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Language": "ar",
      },
      data: {
        order_id,
        payment_method,
        transaction_id,
        response,
      },
    });
    if (data.status === 200) {
      console.log("checkout done successfully");
      return true;
    }
  } catch (error) {
    console.error("Failed to make checkout ", error);
    return false;
  }
};
