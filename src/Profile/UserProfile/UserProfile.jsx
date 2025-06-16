import { Helmet } from "react-helmet";
import "./style.scss";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { TbCirclePlus } from "react-icons/tb";
import InfoSideBar from "../MainInfo/InfoSideBar";
import { Outlet } from "react-router-dom";
import { Profile } from "../../ApiServices/Profile";
import { useState } from "react";
function UserProfile() {
  const [data, setData] = useState([]);
  const getUserData = async () => {
    try {
      const response = await Profile();
      setData(response);
    } catch (error) {
      console.error(error);
    }
  };
  getUserData();
  return (
    <div className="bg-white pb-10">
      <Helmet>
        <title>User Profile | VERTEX</title>
      </Helmet>
      <section className="userHeader w-full h-[65vh] flex flex-col justify-center items-center text-center text-white">
        <h1 className="text-3xl font-bold mb-4">My Account</h1>
        <p className="text-14 font-light ">
          Manage your account , and view your orders ...
        </p>
      </section>
      <section className="p-8 bg-customOrange-lightOrange flex items-center justify-between px-28">
        <div className="flex items-center gap-2">
          <FaCircleDollarToSlot color="#E0A75E" size={22} />
          <p className="text-gray-600 text-15">
            Current Balance:
            <span className="text-black text-[18px] font-bold ms-2">
              $ {data.balance}
            </span>
          </p>
        </div>
        <p className="font-bold text-primary flex items-center gap-1">
          <TbCirclePlus size={23} />
          Add To your balance
        </p>
      </section>
      <section className="flex flex-col md:flex-row px-4 md:px-20 mt-10 gap-10">
        <div className="md:w-1/4">
          <InfoSideBar />
        </div>
        <div className="md:w-3/4 w-full">
          <Outlet />
        </div>
      </section>
    </div>
  );
}
export default UserProfile;
