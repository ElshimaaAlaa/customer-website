import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { GoHeart } from "react-icons/go";
import { GrCart } from "react-icons/gr";

function BottomSection() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/Main") {
      return location.pathname === "/Main";
    }
    if (path === "/Main/Faqs") {
      return location.pathname === "/Main/Faqs";
    }
    return location.pathname === path;
  };

  return (
    <div className="flex items-center justify-between py-5 px-20">
      <div>
        <img src="/assets/svgs/vertex.svg" alt="logo" className="w-36" />
      </div>
      <div>
        <ul className="list-none flex items-center gap-4 text-14 text-gray-400">
          <li
            className={`cursor-pointer ${
              isActive("/Main")
                ? "text-primary font-bold border-b-3 border-primary"
                : ""
            }`}
            onClick={() => navigate("/Main")}
          >
            Home
          </li>
          <li
            className={`cursor-pointer ${
              isActive("/Categories")
                ? "text-primary font-bold border-b-3 border-primary"
                : ""
            }`}
            onClick={() => navigate("/Categories")}
          >
            Categories
          </li>
          <li
            className={`cursor-pointer ${
              isActive("/Main/Faqs")
                ? "text-primary font-bold border-b-3 border-primary"
                : ""
            }`}
            onClick={() => navigate("/Main/Faqs")}
          >
            Faqs
          </li>
          <li
            className={`cursor-pointer ${
              isActive("/Main/AboutUs")
                ? "text-primary font-bold border-b-3 border-primary"
                : ""
            }`}
            onClick={() => navigate("/Main/AboutUs")}
          >
            About us
          </li>
          <li
            className={`cursor-pointer ${
              isActive("/Main/ContactUs")
                ? "text-primary font-bold border-b-3 border-primary"
                : ""
            }`}
            onClick={() => navigate("/Main/ContactUs")}
          >
            Contact us
          </li>
        </ul>
      </div>
      <div>
        <div className="flex gap-3 items-center">
          <CiSearch size={20} />
          <GoHeart size={20} />
          <GrCart size={18} />
        </div>
      </div>
    </div>
  );
}

export default BottomSection;
