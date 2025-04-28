import React from "react";
import { Helmet } from "react-helmet";
import "./style.scss";
import { FaCircleDollarToSlot } from "react-icons/fa6";

function UserProfile() {
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
      <section>

      </section>
      <section></section>
    </div>
  );
}

export default UserProfile;
