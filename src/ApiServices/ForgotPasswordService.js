import axios from "axios";
export const ForgotPasswordService = async (email) => {
  try {
    const response = await axios({
      method: "POST",
      url: `https://demo.vrtex.duckdns.org/api/send-otp`,
      data: { email },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      localStorage.setItem("Email", email);
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error("Email not found. Please check your email address.");
    } else {
      throw new Error("Failed to send OTP. Please try again.");
    }
  }
};
