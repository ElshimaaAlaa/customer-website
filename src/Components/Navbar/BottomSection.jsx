import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { GoHeart } from "react-icons/go";
import { GrCart } from "react-icons/gr";
import UserAcc from "../../Profile/User Acc/UserAcc";

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
              isActive("/Home/Homepage")
                ? "text-primary font-bold border-b-3 border-primary"
                : ""
            }`}
            onClick={() => navigate("/Home/Homepage")}
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
              isActive("/Home/Faqs")
                ? "text-primary font-bold border-b-3 border-primary"
                : ""
            }`}
            onClick={() => navigate("/Home/Faqs")}
          >
            Faqs
          </li>
          <li
            className={`cursor-pointer ${
              isActive("/Home/AboutUs")
                ? "text-primary font-bold border-b-3 border-primary"
                : ""
            }`}
            onClick={() => navigate("/Home/AboutUs")}
          >
            About us
          </li>
          <li
            className={`cursor-pointer ${
              isActive("/Home/ContactUs")
                ? "text-primary font-bold border-b-3 border-primary"
                : ""
            }`}
            onClick={() => navigate("/Home/ContactUs")}
          >
            Contact us
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex gap-3 items-center">
          <CiSearch size={21} />
          <GoHeart size={20}  className="cursor-pointer"  onClick={()=>navigate('/Home/WishList')}/>
          <GrCart size={18} />
        </div>
        <UserAcc/>
      </div>
    </div>
  );
}

export default BottomSection;