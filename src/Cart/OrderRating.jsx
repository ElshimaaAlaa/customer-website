import { Formik, Form, Field } from "formik";
import { useTranslation } from "react-i18next";
import { IoArrowForward } from "react-icons/io5";
function OrderRating() {
  const { t } = useTranslation();
  const rates = [
    t("excellent"),
    t("good"),
    t("avarage"),
    t("poor"),
    t("veryPoor"),
  ];
  return (
    <section className="px-20 my-10">
      <div className="border rounded-md p-5 shadow-md shadow-gray-100 bg-gray-50">
        <h1 className="font-bold text-2xl text-center">{t("rateOrder")}</h1>
        <p className="text-gray-400 text-14 text-center my-3">
          {t("rateRecentOrder")}
        </p>
        <Formik>
          {({ errors, touched }) => (
            <Form>
              <div>
                <h3 className="font-bold my-3">{t("productQuality")}</h3>
                <div className="flex gap-5">
                  {rates.map((item) => (
                    <p className="flex items-center gap-2">
                      <input type="checkbox" />
                      {item}
                    </p>
                  ))}
                </div>
              </div>
              {/* 2 */}
              <div className="border-t my-5">
                <h3 className="font-bold my-3">{t("shippingSpeed")}</h3>
                <div className="flex gap-5">
                  {rates.map((item) => (
                    <p className="flex items-center gap-2">
                      <input type="checkbox" />
                      {item}
                    </p>
                  ))}
                </div>
              </div>
              {/* 3 */}
              <div className="border-t border-b my-5">
                <h3 className="font-bold my-3">{t("customerService")}</h3>
                <div className="flex gap-5 mb-5">
                  {rates.map((item) => (
                    <p className="flex items-center gap-2">
                      <Field type="checkbox" />
                      {item}
                    </p>
                  ))}
                </div>
              </div>
              {/* comments */}
              <div>
                <h3 className="font-bold my-3">{t("additionalComment")}</h3>
                <Field
                  as="textarea"
                  placeholder={t("comment")}
                  name="message"
                  className={`w-[640px] bg-white outline-none border-2 rounded-md p-2 h-32 block placeholder:text-14 
                              ${
                                errors.message && touched.message
                                  ? "border-red-500 focus:border-red-500"
                                  : touched.message
                                  ? "border-green-500 focus:border-green-500"
                                  : "border-gray-200 focus:border-primary"
                              }`}
                />
              </div>
              <button
                className="flex items-center gap-3 bg-primary text-white rounded-md py-3 px-6 mt-8"
                // onClick={() => navigate("/Home/OrderRating")}
              >
                <IoArrowForward size={22} />
                {t("sendFeedback")}
              </button>
            </Form>
          )}
        </Formik>
        {/* 1 */}
      </div>
    </section>
  );
}

export default OrderRating;
