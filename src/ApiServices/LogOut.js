import axios from "axios";
export const handleLogOut = async () => {
  try {
    const response = await axios({
      url: `https://demo.vrtex.duckdns.org/api/logout`,
      method: "POST",
    });
    if (response.status === 200) {
      console.log("Logged out successfully");
      localStorage.clear();
      return true;
    } else {
      console.error("Failed to log out");
    }
  } catch (error) {
    console.error("Failed to log out", error);
  }
};
