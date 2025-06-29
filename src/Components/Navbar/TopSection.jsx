import { useState, useEffect } from "react";
import { MdPhone } from "react-icons/md";
import Facebook from "../../Svgs/facebook";
import Instegram from "../../Svgs/instegram";
import WhatsApp from "../../Svgs/WhatsApp";
import { FaXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { settings } from "../../ApiServices/GeneralSettings";

function TopSection() {
  const navigate = useNavigate();
  const [shopData, setShopData] = useState({});

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
  }, []);

  return (
    <section className="bg-black text-white px-4 sm:px-6 lg:px-20 py-2 sm:py-3">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
        {/* Contact Info */}
        <div className="flex items-center gap-2 text-sm sm:text-base">
          <MdPhone size={18} />
          <p className="font-medium">
            Contact us:
            <span className="underline font-light ml-1">{shopData.phone}</span>
          </p>
        </div>

        {/* Login/Signup */}
        <div className="text-center sm:text-left">
          <p className="text-xs sm:text-sm lg:text-17 md:text-17 font-light">
            Submit your first order.
            <span
              className="text-primary lg:text-15 md:text-15 font-light underline ml-1 sm:ml-2 cursor-pointer"
              onClick={() => navigate("/Login")}
            >
              Login
            </span>
            <span
              className="text-primary lg:text-15 md:text-15 font-light underline ml-1 sm:ml-2 cursor-pointer"
              onClick={() => navigate("/Register")}
            >
              Sign Up Now
            </span>
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <FaXTwitter size={22} className="hover:text-gray-300 cursor-pointer" />
          <WhatsApp className=" hover:text-gray-300 cursor-pointer" />
          <Facebook className=" hover:text-gray-300 cursor-pointer" />
          <Instegram className=" hover:text-gray-300 cursor-pointer" />
        </div>
      </div>
    </section>
  );
}

export default TopSection;