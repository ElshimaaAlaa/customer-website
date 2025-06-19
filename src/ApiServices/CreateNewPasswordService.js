import axios from "axios";
export const CreateNewPasswordService = async (
  password,
  password_confirmation,
  email
) => {
  try {
    const response = await axios({
      url: `https://demo.vrtex.duckdns.org/api/reset-password`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Language": "ar",
      },
      data: {
        password,
        password_confirmation,
        email,
      },
    });
    if (response.status === 200) {
      console.log("Password reset successfully");
      return true;
    }
  } catch (error) {
    console.error("Failed to reset password: ", error);
    return false;
  }
};
