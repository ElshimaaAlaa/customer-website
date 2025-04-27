import React, { useEffect, useState } from "react";
import PhoneNum from "../../Svgs/PhoneNum";
import EmailAddress from "../../Svgs/EmailAddress";
import Location from "../../Svgs/Location";
import Facebook from "../../Svgs/facebook";
import Instegram from "../../Svgs/instegram";
import WhatsApp from "../../Svgs/WhatsApp";
import { FaXTwitter } from "react-icons/fa6";
import { Settings } from "../../ApiServices/GeneralSettings";

function Footer() {
  const [shopData, setShopData] = useState([]);
  useEffect(() => {
    const getVertexData = async () => {
      const response = await Settings();
      setShopData(response);
    };
    getVertexData();
  }, []);
  return (
    <section className="bg-black text-white py-8 px-20">
      {/* footer items */}
      <div className="grid grid-cols-4 gap-4 px-4 container mx-auto">
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
          <h2 className="font-bold text-lg mb-2">Support</h2>
          <ul className="list-none text-sm space-y-2">
            <li>Safety Tips</li>
            <li>Contact us</li>
            <li>Privacy Policy</li>
            <li>Terms and Conditions</li>
            <li>FAQs</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="font-bold text-lg mb-2">Company</h2>
          <ul className="list-none text-sm space-y-2">
            <li>About us</li>
            <li>Blogs</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="font-bold text-lg mb-2">Get in touch</h2>
          <ul className="list-none text-sm space-y-2">
            <li className="flex items-center gap-2">
              <PhoneNum /> {shopData.phone}
            </li>
            <li className="flex items-center gap-2">
              <EmailAddress /> {shopData.email}
            </li>
            <li className="flex items-center gap-2">
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