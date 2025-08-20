import { useEffect, useState } from "react";
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

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate("/Home/UserProfile");
  };

  return (
    <div 
      className="flex items-center gap-2" 
      onClick={handleNavigate}
      dir="auto" 
    >
      <img
        src={data.image || "/assets/images/userPic.jpg"}
        alt="user profile"
        className="rounded-full w-12 h-12 object-cover cursor-pointer"
      />
    </div>
  );
}

export default UserAcc;