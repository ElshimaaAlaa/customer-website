import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PaymentMethod from "../../Svgs/PaymentMethod";
import Profile from "../../Svgs/Profile";
import DeleteAccount from "../UserProfile/DeleteAccount";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

function InfoSideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(null);
  const menuItems = [
    {
      IconComponent: Profile,
      alt: "Personal Information Icon",
      label: "Personal Information",
      path: "",
      exactMatch: true, 
    },
    {
      IconComponent: CiLocationOn,
      alt: "",
      label: "Manage Address",
      path: "Address",
    },
    {
      IconComponent: MdOutlineLocalGroceryStore,
      alt: "",
      label: "My Orders",
      path: "UserOrder",
    },
    {
      IconComponent: RiLockPasswordLine,
      alt: "",
      label: "Change password",
      path: "ChangePassword",
    },
    {
      IconComponent: PaymentMethod,
      alt: "Payment Information Icon",
      label: "Payment Information",
      path: "Payment",
    },
  ];

  const handleItemClick = (path) => {
    navigate(path || ".");
    setActiveItem(path);
  };

  const isActive = (path, exactMatch = false) => {
    if (exactMatch) {
      return location.pathname === "/Home/UserProfile";
    }
    const currentPath = location.pathname.split("/").pop();
    return currentPath === path;
  };

  return (
    <aside className="w-full">
      <div className="flex flex-col gap-7 border-r p-4 md:p-8">
        {menuItems.map(({ IconComponent, alt, label, path, exactMatch }, index) => (
          <button
            key={index}
            className={`flex items-center gap-1 ${
              isActive(path, exactMatch) ? "text-primary" : ""
            }`}
            aria-label={label}
            onClick={() => handleItemClick(path)}
          >
            <div
              className={`w-6 h-6 me-3 ${
                isActive(path, exactMatch) ? "text-primary" : "text-gray-600"
              }`}
            >
              <IconComponent
                className="w-full h-full"
                stroke={isActive(path, exactMatch) ? "#E0A75E" : "#000"}
              />
            </div>
            <p
              className={`font-semibold text-14 mt-1 ${
                isActive(path, exactMatch) ? "text-primary" : ""
              }`}
            >
              {label}
            </p>
          </button>
        ))}
        <DeleteAccount/>
      </div>
    </aside>
  );
}
export default InfoSideBar;