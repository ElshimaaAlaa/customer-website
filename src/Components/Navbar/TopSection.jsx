import { useState, useEffect } from "react";
import { MdPhone } from "react-icons/md";
import Facebook from "../../Svgs/facebook";
import Instegram from "../../Svgs/instegram";
import WhatsApp from "../../Svgs/WhatsApp";
import { FaXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { settings } from "../../ApiServices/GeneralSettings";
import { useTranslation } from "react-i18next";

function TopSection() {
  const navigate = useNavigate();
  const [shopData, setShopData] = useState({});
  const { t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getVertexData = async () => {
      try {
        const response = await settings();
        setShopData(response);
      } catch (error) {
        console.error("Error fetching shop data:", error);
      }
    };
    getVertexData();

    // Check if user is logged in (example using localStorage)
    const token = localStorage.getItem("user token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <section className="bg-black text-white px-4 sm:px-6 lg:px-20 py-2 sm:py-3">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
        {/* Contact Info */}
        <div className="flex items-center gap-2 text-sm sm:text-base">
          <MdPhone size={18} className="mt-1" />
          <p className="font-medium ">
            {t("contactUs")} :
            <span className="underline font-light ml-1 rtl:ms-2">
              {shopData.phone}
            </span>
          </p>
        </div>

        {/* Login/Signup*/}
        <div className="text-center sm:text-left">
          <p className="flex items-center text-xs sm:text-sm lg:text-17 md:text-17 font-light rtl:ms-3">
            {!isLoggedIn && (
              <>
                <p className="text-17 rtl:mx-2">{t("sendFirstOrder")}</p>
                <span
                  className="text-primary lg:text-15 md:text-15 font-light underline ml-1 sm:ml-2 cursor-pointer "
                  onClick={() => navigate("/Login")}
                >
                  {t("logIn")}
                </span>
                <span
                  className="text-primary lg:text-15 md:text-15 font-light underline ml-1 sm:ml-2 cursor-pointer"
                  onClick={() => navigate("/Register")}
                >
                  {t("signUp")}
                </span>
              </>
            )}
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <FaXTwitter
            size={22}
            className="hover:text-gray-300 cursor-pointer"
          />
          <WhatsApp className=" hover:text-gray-300 cursor-pointer" />
          <Facebook className=" hover:text-gray-300 cursor-pointer" />
          <Instegram className=" hover:text-gray-300 cursor-pointer" />
        </div>
      </div>
    </section>
  );
}

export default TopSection;
