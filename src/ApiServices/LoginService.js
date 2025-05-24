import axios from "axios";
const API_BASE_URL = "https://";
const live_customer_domain = localStorage.getItem("live_customer_domain");
export const loginService = async (email, password) => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}${live_customer_domain}/api/login`,
      method: "POST",
      data: {
        email,
        password,
      },
    });
    if (response.status === 200) {
      localStorage.setItem("user token", response.data.data.token);
      localStorage.setItem("user email", response.data.data.email);
      localStorage.setItem("user name", response.data.data.name);
      console.log(response.data.data);
      return response.data.data;
    }
  } catch (error) {
    throw new Error("Failed to login");
  }
};
