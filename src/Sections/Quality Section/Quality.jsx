import Delivary from "../../Svgs/delivary";
import Pay from "../../Svgs/pay";
import Qualityicon from "../../Svgs/quality";
import { useTranslation } from "react-i18next";

function Quality() {
  const { t } = useTranslation();
  return (
    <section className="grid grid-cols-1 px-4 lg:grid-cols-3 gap-3 md:grid-cols-2 md:px-10 lg:px-20 py-6">
      <div className="flex gap-3 bg-customOrange-lightOrange rounded-xl py-7  px-8 w-full ">
        <Delivary />
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-17 mt-1">{t("quickDelivery")}</h2>     
          <p className="text-darkGray text-14 leading-5">
            {t("quickDeliveryp")}
          </p>
        </div>
      </div>
      <div className="flex gap-3 bg-customOrange-lightOrange rounded-xl py-7 px-8 w-full">
        <Pay />
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-17 mt-1">{t("flexiablePayment")}</h2>
          <p className="text-darkGray text-14 leading-5">
            {t("flexiablePaymentp")}
          </p>
        </div>
      </div>
      <div className="flex gap-3 bg-customOrange-lightOrange rounded-xl py-7 px-8 w-full">
        <Qualityicon />
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-17  mt-1">{t("allTimeSupport")}</h2>
          <p className="text-darkGray text-14">{t("allTimeSupportp")}</p>
        </div>
      </div>
    </section>
  );
}
export default Quality;