import { useEffect, useState } from "react";
import PhoneNum from "../../Svgs/PhoneNum";
import EmailAddress from "../../Svgs/EmailAddress";
import Location from "../../Svgs/Location";
import Facebook from "../../Svgs/facebook";
import Instegram from "../../Svgs/instegram";
import WhatsApp from "../../Svgs/WhatsApp";
import { FaXTwitter } from "react-icons/fa6";
import { settings } from "../../ApiServices/GeneralSettings";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
function Footer() {
  const [shopData, setShopData] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    const getVertexData = async () => {
      const response = await settings();
      setShopData(response);
    };
    getVertexData();
  }, []);
  return (
    <section className="bg-black text-white pt-10 pb-6 mt-5 px-10 lg:px-20">
      {/* footer items */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4  ">
        <div className="space-y-5">
          <img
            src="/assets/svgs/Footer logo.svg"
            alt="footer logo"
            className="h-10"
          />
          <div className="flex items-center gap-3">
            <FaXTwitter size={21} />
            <WhatsApp />
            <Facebook />
            <Instegram />
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="font-bold text-17 mb-2">{t("support")}</h2>
          <ul className="list-none text-sm space-y-2">
            <li className="cursor-pointer hover:text-primary">{t("saftyTips")}</li>
            <li
              onClick={() => navigate("ContactUs")}
              className="cursor-pointer hover:text-primary text-14"
            >
              {t("contactUs")}
            </li>
            <li className="cursor-pointer hover:text-primary text-14">
              {t("privacy")}
            </li>
            <li className="cursor-pointer hover:text-primary text-14">
              {t("trems")}
            </li>
            <li
              className="cursor-pointer hover:text-primary text-14"
              onClick={() => navigate("Faqs")}
            >
              {t("faqs")}
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="font-bold text-17 mb-2">{t("company")}</h2>
          <ul className="list-none text-sm space-y-2">
            <li
              className="cursor-pointer hover:text-primary text-14"
              onClick={() => navigate("AboutUs")}
            >
              {t("aboutUs")}
            </li>
            <li className="cursor-pointer hover:text-primary text-14">{t("blogs")}</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="font-bold text-17 mb-2">{t("getInTouch")}</h2>
          <ul className="list-none text-sm space-y-2">
            <li className="flex items-center text-14 gap-2 underline">
              <PhoneNum /> {shopData.phone}
            </li>
            <li className="flex items-center gap-2 text-14 underline">
              <EmailAddress /> {shopData.email}
            </li>
            <li className="flex items-center gap-2 text-14 underline">
              <Location /> {shopData.address || "Saudi arabia , alreyad"}
            </li>
          </ul>
        </div>
      </div>
      {/* copyrights */}
      <div className="border-t-2 border-gray-400 mt-8 pt-6 text-sm text-center">
        {t("reservedCopy")}
      </div>
    </section>
  );
}
export default Footer;
