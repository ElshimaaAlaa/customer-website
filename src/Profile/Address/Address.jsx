import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Profile } from "../../ApiServices/Profile";

function Address() {
  const navigate = useNavigate();
  const [addressData, setAddressData] = useState([]);
  //fetch address data from profile service
  useEffect(() => {
    const getInfo = async () => {
      try {
        const data = await Profile();
        setAddressData(data);
      } catch (error) {
        console.error("Failed to fetch personal info:", error);
      }
    };
    getInfo();
  }, []);
  const handleEditClick = () => {
    navigate("/Home/UserProfile/EditAddress", { state: addressData });
  };
  return (
    <section>
      <div className="flex flex-col md:flex-row items-center justify-between mb-2">
        <h1 className="font-bold text-xl">Address</h1>
        <button
          onClick={handleEditClick}
          className="text-white font-semibold flex items-center justify-center gap-3 bg-primary p-3 w-24 rounded-md"
          aria-label="Edit personal information"
        >
          <img src="/assets/svgs/edit.svg" alt="Edit" className="w-7" />
          Edit
        </button>
      </div>
      <div className="border rounded-md p-3 w-full bg-gray-50">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-96">
          <div>
            <p className="text-gray-400 text-15">Country</p>
            <p className="text-15">{addressData?.country || "Egypt"}</p>
          </div>
          <div>
            <p className="text-gray-400 text-15">Street Address</p>
            <p className="text-15">
              {addressData?.address || "Street name , Street num"}
            </p>
          </div>
        </div>
        <div className="mt-3">
          <p className="text-gray-400 text-15">City</p>
          <p className="text-15">{addressData?.city || "Damietta"}</p>
        </div>
      </div>
    </section>
  );
}
export default Address;