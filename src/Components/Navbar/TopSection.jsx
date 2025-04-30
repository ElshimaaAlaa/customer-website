import React, { useState, useEffect } from "react";
import { MdPhone } from "react-icons/md";
import Facebook from "../../Svgs/facebook";
import Instegram from "../../Svgs/instegram";
import WhatsApp from "../../Svgs/WhatsApp";
import { FaXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { settings } from "../../ApiServices/GeneralSettings";
function TopSection() {
  const navigate = useNavigate();
  const [shopData, setShopData] = useState([]);
  useEffect(() => {
    const getVertexData = async () => {
      const response = await settings();
      setShopData(response);
    };
    getVertexData();
  }, []);
  return (
    <section className="bg-black text-white px-20 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MdPhone size={20} />
        <p className="text-15 font-bold">
          Contact us :{" "}
          <span className="underline font-light ms-1">{shopData.phone}</span>{" "}
        </p>
      </div>
      <div>
        <p className="text-14 font-light">
          Sign up to submit your first order.
          <span
            className="text-primary font-light underline ms-2 cursor-pointer"
            onClick={() => navigate("/Register")}
          >
            Sign Up Now
          </span>
        </p>
      </div>
      <div className="flex items-center gap-3">
        <FaXTwitter size={21} />
        <WhatsApp />
        <Facebook />
        <Instegram />
      </div>
    </section>
  );
}
export default TopSection;
