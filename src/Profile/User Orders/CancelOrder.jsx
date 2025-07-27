import { useState } from "react";
import FailedModal from "../../Components/Modal/Failed Modal/FailedModal";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import "./style.scss";
import { useTranslation } from "react-i18next";
import { IoMdCloseCircle } from "react-icons/io";

function CancelOrder() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const handelDeletePayement = async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        url: "https://demo.vrtex.duckdns.org/api/",
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
        <p className="flex items-center gap-2 bg-red-50 rounded-md px-6 py-2 border-1 border-red-600 font-bold text-6 mt-1 text-red-600">
          <IoMdCloseCircle />
          {t("cancel")}
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
        <p className="font-bold w-72 text-center">{t("cancelOrder")}</p>
        <div className="flex gap-3 mt-5 mb-3 rtl:flex-row-reverse">
          <button
            className="rounded p-3 text-17 bg-gray-100 text-gray-400 font-bold w-32"
            onClick={() => setShowModal(false)}
          >
            {t("no")}
          </button>
          <button
            className="rounded text-white text-17 bg-customred font-bold p-3 w-32"
            onClick={handelDeletePayement}
          >
            {isLoading ? (
              <ClipLoader color="#fff" size={"22px"} className="text-center" />
            ) : (
              t("yesCancel")
            )}
          </button>
        </div>
      </FailedModal>
    </div>
  );
}
export default CancelOrder;