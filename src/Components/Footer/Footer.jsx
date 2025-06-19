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

function Footer() {
  const [shopData, setShopData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getVertexData = async () => {
      const response = await settings();
      setShopData(response);
    };
    getVertexData();
  }, []);
  return (
    <section className="bg-black text-white pt-10 pb-6 mt-5 px-20">
      {/* footer items */}
      <div className="grid grid-cols-4 gap-4  ">
        <div className="space-y-5">
          <img
            src="/assets/svgs/Footer logo.svg"
            alt="footer logo"
            className="h-10"
          />
          <div className="flex items-center gap-4">
            <FaXTwitter size={21} />
            <WhatsApp />
            <Facebook />
            <Instegram />
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="font-bold text-17 mb-2">Support</h2>
          <ul className="list-none text-sm space-y-2">
            <li className="cursor-pointer hover:text-primary">Safety Tips</li>
            <li onClick={() => navigate("ContactUs")} className="cursor-pointer hover:text-primary text-13">Contact us</li>
            <li className="cursor-pointer hover:text-primary text-13">Privacy Policy</li>
            <li className="cursor-pointer hover:text-primary text-13">Terms and Conditions</li>
            <li className="cursor-pointer hover:text-primary text-13" onClick={()=>navigate("Faqs")}>FAQs</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="font-bold text-17 mb-2">Company</h2>
          <ul className="list-none text-sm space-y-2">
            <li className="cursor-pointer hover:text-primary text-13" onClick={()=>navigate("AboutUs")}>About us</li>
            <li className="cursor-pointer hover:text-primary text-13">Blogs</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="font-bold text-17 mb-2">Get in touch</h2>
          <ul className="list-none text-sm space-y-2">
            <li className="flex items-center text-13 gap-2 underline">
              <PhoneNum /> {shopData.phone}
            </li>
            <li className="flex items-center gap-2 text-13 underline">
              <EmailAddress /> {shopData.email}
            </li>
            <li className="flex items-center gap-2 text-13 underline">
              <Location /> {shopData.address || "Saudi arabia , alreyad"}
            </li>
          </ul>
        </div>
      </div>
      {/* copyrights */}
      <div className="border-t-2 border-gray-400 mt-8 pt-6 text-sm text-center">
        © 2024 Cadet UI. All Rights Reserved.
      </div>
    </section>
  );
}
export default Footer;