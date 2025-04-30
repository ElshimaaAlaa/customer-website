import React from "react";
import "./headerStyle.scss";
import { IoArrowForward } from "react-icons/io5";

const Header = () => {
  return (
    <header className="header">
      <div className="overlay">
        <div className="content">
          <h1 className="text-white font-bold text-3xl leading-10 text-center">
            Winter Collection For Creative <br /> People
          </h1>
          <div className="flex justify-center">
            <button className="text-white bg-primary p-3 rounded-md flex items-center gap-2 mt-6">
              Explore Now <IoArrowForward />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;