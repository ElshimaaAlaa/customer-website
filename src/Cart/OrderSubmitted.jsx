import { useTranslation } from "react-i18next";
import { IoArrowForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function OrderSubmitted() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="border rounded-md shadow-sm shadow-primary bg-customOrange-lightOrange p-5 flex justify-center flex-col items-center w-550 mx-auto my-10">
      <img
        src="/assets/svgs/done-checkmark_svgrepo.com.svg"
        alt="check icon"
        className="w-16 h-1w-16 my-4"
      />
      <h1 className="font-bold text-xl">{t("orderSubmitted")}</h1>
      <section className=" flex flex-col gap-5 w-250 my-7">
        <div className="flex items-center justify-between">
          <p className="text-15 text-gray-500">{t("orderId")} :</p>
          <span className="font-bold">#000959</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-15 text-gray-500">{t("date")} :</p>
          <span className="font-bold">25/5/2025</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-15 text-gray-500">{t("total")} :</p>
          <span className="font-bold">19003 $</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-15 text-gray-500">{t("paymentMethod")} :</p>
          <span className="font-bold">Visa</span>
        </div>
      </section>
      <button
        className="flex items-center gap-3 bg-primary text-white rounded-md py-3 px-6 my-5"
        onClick={() => navigate("/Home/OrderRating")}
      >
        {t("trackOrder")}
        <IoArrowForward size={22} />
      </button>
    </div>
  );
}
export default OrderSubmitted;
