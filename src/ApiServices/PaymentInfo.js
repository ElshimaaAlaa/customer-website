import axios from "axios";

export const addPaymentInfo = async (
  card_cvv,
  card_exp_date,
  card_number,
  card_holder_name,
  payment_method
) => {
  try {
    const response = await axios({
      url: `https://demo.vrtex.duckdns.org/api/update-payment-info`,
      method: "POST",
      headers: {
        "Accept-Language": "en",
        Authorization: `Bearer ${localStorage.getItem("user token")}`,
      },
      data: {
        card_cvv,
        card_exp_date,
        card_number,
        card_holder_name,
        payment_method,
      },
    });
    if (response.status === 200) {
      console.log("success add payment info for user data");
    } else {
      console.error("failed to add payment info for user data");
    }
  } catch (error) {
    console.error(error);
  }
};
