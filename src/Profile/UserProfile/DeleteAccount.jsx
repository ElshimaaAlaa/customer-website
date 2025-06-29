import { useState } from "react";
import FailedModal from "../../Components/Modal/Failed Modal/FailedModal";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./style.scss";
function DeleteAccount() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handelDeleteAccount = async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        url: "https://demo.vrtex.duckdns.org/api/delete-account",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user token")} `,
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Language": "ar",
        },
      });
      if (response.status === 200) {
        setShowModal(true);
        setIsLoading(false);
        console.log("Account deleted successfully");
      } else {
        console.error("Failed to delete account");
        setShowModal(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Failed to delete account", error);
      setShowModal(true);
      setIsLoading(false);
    }
  };
  if (showModal) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }

  return (
    <div>
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <RiDeleteBin6Line color="#DC2626" size={22} className="me-2" />
        <p className="font-bold text-6 mt-1 text-red-600">
          Delete Account
        </p>
      </div>
      <FailedModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="p-5">
          <img
            src="/assets/images/delete_svgrepo.com.png"
            alt="delete-img"
            className="h-14 w-14 p-1"
          />
        </div>
        <p className="font-bold w-72 text-center">
          Are You Sure You Want To Delete Your Account ?
        </p>
        <div className="flex gap-3 mt-5 mb-3">
          <button
            className="rounded p-3 text-17 bg-gray-100 text-gray-400 font-bold w-32"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            className="rounded text-white text-17 bg-customred font-bold p-3 w-32"
            onClick={handelDeleteAccount}
          >
            {isLoading ? (
              <ClipLoader color="#fff" size={"22px"} className="text-center" />
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </FailedModal>
    </div>
  );
}
export default DeleteAccount;