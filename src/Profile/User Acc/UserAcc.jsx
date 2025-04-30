import React, { useEffect, useState } from "react";
import { Profile } from "../../ApiServices/Profile";
import { useNavigate } from "react-router-dom";

function UserAcc() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await Profile();
        setData(response);
      } catch (error) {
        console.error(error);
      }
    };
    getUserData();
  }, []);
  return (
    <div onClick={() => navigate("/Home/UserProfile")}>
      <img
        src={data.image}
        alt="user profile"
        className="rounded-full w-9 h-9 object-contain cursor-pointer"
      />
    </div>
  );
}
export default UserAcc;