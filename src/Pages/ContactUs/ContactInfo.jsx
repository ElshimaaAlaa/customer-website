import { useEffect, useState } from "react";
import { settings } from "../../ApiServices/GeneralSettings";
import EmailAddress from "../../Svgs/EmailAddress";
import PhoneNum from "../../Svgs/PhoneNum";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Facebook from "../../Svgs/facebook";
import Instegram from "../../Svgs/instegram";
import WhatsApp from "../../Svgs/WhatsApp";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
function ContactInfo() {
  const [settingData, setSettingData] = useState([]);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  useEffect(() => {
    const getSettings = async () => {
      const data = await settings();
      console.log("settings data", data);
      setSettingData(data);
    };
    getSettings();
  }, []);
  const ContactCard = ({ icon, title, value, link }) => (
    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md mb-6">
      <div className="flex gap-4">
        <div className="w-10 h-10 flex items-center justify-center">{icon}</div>
        <div>
          <h3 className="font-bold text-17 mb-1 rtl:text-[15px]">{title}</h3>
          <a href={link} className="text-gray-400 mt-3 text-15">
            {value}
          </a>
        </div>
      </div>
      {isRTL ? (
        <BsArrowLeft size={25} color="#E0A75E" />
      ) : (
        <BsArrowRight size={25} color="#E0A75E" />
      )}
    </div>
  );
  return (
    <div>
      <section className="bg-white border rounded-md drop-shadow-lg w-[320px] md:w-[400px] lg:w-500 p-5 h-72 mt-10">
        <h2 className="font-bold text-lg mb-3 mt-2 relative pb-1 gradient-border-bottom rtl:text-[18px]">
          {t("contactInfo")}
        </h2>
        <ContactCard
          icon={<PhoneNum />}
          title={t("callUs")}
          value={settingData.phone}
        />
        <ContactCard
          icon={<EmailAddress />}
          title={t("email")}
          value={settingData.email}
          link="mailto:Vertex@gmail.com"
        />
      </section>
      <section className="bg-white rounded-md border drop-shadow-lg w-[320px] md:w-[400px] lg:w-500 p-5 h-32 mt-3">
        <h2 className="font-bold text-lg mb-3 mt-2 relative pb-1 gradient-border-bottom rtl:text-[17px]">
          {t("followSocial")}
        </h2>
        <div className="flex  items-center gap-3">
          <FaSquareXTwitter size={28} />
          <WhatsApp />
          <Facebook />
          <Instegram />
        </div>
      </section>
    </div>
  );
}
export default ContactInfo;
