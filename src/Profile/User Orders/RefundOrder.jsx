import { useState } from "react";
import FailedModal from "../../Components/Modal/Failed Modal/FailedModal";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { IoMdCloseCircle } from "react-icons/io";
import { Field, Form, Formik } from "formik";
import { RiArrowGoBackLine } from "react-icons/ri";

function RefundOrder({ order_id }) {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleRefundOrder = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios({
        url: `https://demo.vrtex.duckdns.org/api/orders/refund`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user token")}`,
          "Accept-Language": "en",
        },
        data: {
          reason: values.reason,
          order_id: order_id,
        },
      });

      if (response.status === 200) {
        setShowModal(false);
        console.log("success refund oredr");
      }
    } catch (error) {
      console.error("Failed to refund order", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <p className="flex items-center gap-2 bg-customOrange-lightOrange rounded-md px-6 py-2 border-1 border-primary font-bold text-6 mt-1 text-primary">
          {t("requestRefund")}
          <RiArrowGoBackLine />
        </p>
      </div>

      <FailedModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="p-5">
          <img
            src="/assets/images/success.png"
            alt="success"
            className="w-24 mt-4"
          />
        </div>
        <p className="font-bold w-72 text-center">{t("refundOrder")}</p>

        <div className="mt-4">
          <Formik initialValues={{ reason: "" }} onSubmit={handleRefundOrder}>
            {({ errors, touched }) => (
              <Form>
                <Field
                  as="textarea"
                  placeholder={t("refundReason")}
                  name="reason"
                  className={`w-full bg-white outline-none border-2 rounded-md p-2 h-32 block placeholder:text-14 
                              ${
                                errors.reason && touched.reason
                                  ? "border-red-500 focus:border-red-500"
                                  : touched.reason
                                  ? "border-green-500 focus:border-green-500"
                                  : "border-gray-200 focus:border-primary"
                              }`}
                />
                <div className="flex gap-3 mt-5 mb-3 rtl:flex-row-reverse">
                  <button
                    type="button"
                    className="rounded p-3 text-17 bg-gray-100 text-gray-400 font-bold w-32"
                    onClick={() => setShowModal(false)}
                  >
                    {t("no")}
                  </button>
                  <button
                    type="submit"
                    className="rounded text-white text-17 bg-primary font-bold p-3 w-32"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <ClipLoader
                        color="#fff"
                        size={"22px"}
                        className="text-center"
                      />
                    ) : (
                      t("yesRefund")
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </FailedModal>
    </div>
  );
}

export default RefundOrder;
