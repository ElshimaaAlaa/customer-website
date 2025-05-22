import { useNavigate, useLocation } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { GoHeart } from "react-icons/go";
import { GrCart } from "react-icons/gr";
import UserAcc from "../../Profile/User Acc/UserAcc";
import { useEffect, useState } from "react";
import { getWishListData } from "../../ApiServices/Wishlist";

function BottomSection() {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const isActive = (path) => {
    if (path === "/Main") {
      return location.pathname === "/Main";
    }
    if (path === "/Main/Faqs") {
      return location.pathname === "/Main/Faqs";
    }
    return location.pathname === path;
  };
  useEffect(() => {
    const fetchProductNumInWishlist = async () => {
      try {
        const response = await getWishListData();
        setData(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProductNumInWishlist();
  }, []);
  return (
    <div className="flex items-center justify-between py-5 px-20">
      <div onClick={()=>navigate('/Home/HomePage')} className="cursor-pointer">
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
            onClick={() => navigate("/Home/Products")}
          >
            Products
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
          <div className=" relative">
            <p className="bg-red-600 absolute text-white text-10 h-4 w-4 -top-2 -right-2  rounded-full text-center">{data.length}</p>
            <GoHeart
              size={20}
              className="cursor-pointer"
              onClick={() => navigate("/Home/WishList")}
            />
          </div>
          <GrCart size={18} />
        </div>
        <UserAcc />
      </div>
    </div>
  );
}
export default BottomSection;
