import { useEffect, useState } from "react";
import { Profile } from "../../ApiServices/Profile";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

function UserAcc() {
  //on navbar to go to user profile.
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
    <div className="flex items-center gap-2" onClick={() => navigate("/Home/UserProfile")}>
      <img
        src={data.image}
        alt="user profile"
        className="rounded-full w-11 h-11 object-contain cursor-pointer"
      />
      <IoIosArrowDown color="#000" size={22}/>
    </div>
  );
}
export default UserAcc;
