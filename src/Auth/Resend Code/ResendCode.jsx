import axios from "axios";
import React from "react";
function ResendCode() {
  const API_BASE_URL = "https://";
  const live_shop_domain = localStorage.getItem("live_shop_domain");
  const resndCode = async () => {
    const email = localStorage.getItem("Email");
    const response = await axios({
      url: `${API_BASE_URL}${live_shop_domain}/api/send-otp`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: { email },
    });
    if (response.status === 200) {
      console.log("Resend code successfully");
    } else {
      console.error("Failed to resend code");
    }
  };
  return (
    <div>
      <p
        onClick={resndCode}
        className="font-bold text-primary text-15 cursor-pointer"
      >
        Resend
      </p>
    </div>
  );
}
export default ResendCode;