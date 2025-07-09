import { useState } from "react";
import FailedModal from "../../Components/Modal/Failed Modal/FailedModal";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
function DeleteAccount() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handelDeleteAccount = async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        url: "https://demo.vrtex.duckdns.org/api/delete-account",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user token")} `,
          Accept: "application/json",
          "Accept-Language": "ar",
        },
      });
      if (response.status === 200) {
        setShowModal(true);
        setIsLoading(false);
        //clear all current user data saved in storage if user delete it's account
        localStorage.clear();
        console.log("Account deleted successfully");
        navigate("/Home/HomePage");
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
        <p className="font-bold text-6 mt-1 text-red-600">{t("deleteAcc")}</p>
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
          {t("confirmDelete")}
        </p>
        <div className="flex gap-3 mt-5 mb-3 rtl:flex-row-reverse">
          <button
            className="rounded p-3 text-17 bg-gray-100 text-gray-400 font-bold w-32"
            onClick={() => setShowModal(false)}
          >
            {t("cancel")}
          </button>
          <button
            className="rounded text-white text-17 bg-customred font-bold p-3 w-32"
            onClick={handelDeleteAccount}
          >
            {isLoading ? (
              <ClipLoader color="#fff" size={"22px"} className="text-center" />
            ) : (
              t("delete")
            )}
          </button>
        </div>
      </FailedModal>
    </div>
  );
}
export default DeleteAccount;
