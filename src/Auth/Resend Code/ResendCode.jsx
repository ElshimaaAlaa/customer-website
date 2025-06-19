import axios from "axios";
function ResendCode() {
  const resndCode = async () => {
    const email = localStorage.getItem("Email");
    const response = await axios({
      url: `https://https://demo.vrtex.duckdns.org/api/send-otp`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Language": "ar",
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
