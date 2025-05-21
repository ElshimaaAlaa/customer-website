import React from "react";
import { Helmet } from "react-helmet";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";

function WishList() {
  return (
    <div className="px-20 py-5">
      <Helmet>
        <title>WishList | vertex</title>
      </Helmet>
      <button className="flex items-center gap-2 text-primary text-14">
        <IoIosArrowRoundBack size={22} /> Back to home
      </button>
      <div className="mt-5">
        <h3 className="font-bold text-[19px]">Wishlist</h3>
        <section className="grid grid-cols-3">
          <div className="border-1 border-gray-300">
            <div className="flex items-center justify-between">
              <p className="bg-red-600 text-white rounded-lg p-3">-30%</p>
              <FaHeart size={25} className="text-red-600" />
            </div>
            <div>
              <img src="/assets/images/user.png" alt="" />
            </div>
            <div>
              <h3>Item Name</h3>
              <p className="flex items-center gap-2 font-light text-12">
                <img
                  src="/assets/images/rate.png"
                  className="w-40"
                  alt="rate"
                />
                4.5
              </p>
            </div>
            <div>
              <h2>
                $ 130 <span>$160</span>
              </h2>
              <div className="bg-primary text-white rounded-lg p-3">
                <FaCartShopping size={25} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default WishList;
