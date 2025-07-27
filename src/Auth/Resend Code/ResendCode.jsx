import axios from "axios";
import { useTranslation } from "react-i18next";
function ResendCode() {
  const { t } = useTranslation();
  const resndCode = async () => {
    const email = localStorage.getItem("user email");
    const response = await axios({
      url: `https://demo.vrtex.duckdns.org/api/send-otp`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "en",
        Authorization: `Bearer ${localStorage.getItem("user token")}`,
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
        className="font-bold text-primary text-15 cursor-pointer rtl:text-[14px]"
      >
        {t("resend")}
      </p>
    </div>
  );
}
export default ResendCode;