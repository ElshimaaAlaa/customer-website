import { Formik, Form, Field } from "formik";
import { useTranslation } from "react-i18next";
import {
  IoIosArrowRoundBack,
  IoIosArrowRoundForward,
} from "react-icons/io";
import { useState } from "react";
import { RateOrder } from "../ApiServices/OrderRating";
// import { RateOrder } from "../../services/RateOrderService"; // تأكد من المسار الصحيح

function OrderRating({ order_id, onRatingComplete }) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'
  
  const rates = [
    t("excellent"),
    t("good"),
    t("avarage"),
    t("poor"),
    t("veryPoor"),
  ];
  
  const initialValues = {
    product_quality: "",
    shipping_speed: "",
    customer_service: "",
    comment: ""
  };
  
  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const success = await RateOrder(
        order_id,
        values.product_quality,
        values.shipping_speed,
        values.customer_service,
        values.comment
      );
      
      if (success) {
        setSubmitStatus('success');
        if (onRatingComplete) {
          onRatingComplete();
        }
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="px-20 my-10">
      <div className="border rounded-md p-5 shadow-md shadow-gray-100 bg-gray-50">
        <h1 className="font-bold text-xl text-center mt-5">{t("rateOrder")}</h1>
        <p className="text-gray-400 text-14 text-center my-3">
          {t("rateRecentOrder")}
        </p>
        
        {submitStatus === 'success' && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {t("ratingSubmittedSuccess")}
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {t("ratingSubmittedError")}
          </div>
        )}
        
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, setFieldValue, errors, touched }) => (
            <Form className="mt-8">
              <div>
                <h3 className="my-6">{t("productQuality")}</h3>
                <div className="flex gap-5">
                  {rates.map((item, index) => (
                    <label key={index} className="flex items-center gap-2 text-14 text-gray-400 cursor-pointer">
                      <Field
                        type="radio"
                        name="product_quality"
                        value={item}
                        className="hidden peer"
                        disabled={isSubmitting}
                      />
                      <span
                        className={`w-4 h-4 border-2 rounded flex items-center justify-center transition-all duration-200 ${
                          values.product_quality === item
                            ? "border-primary bg-primary"
                            : "border-gray-300"
                        } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        {values.product_quality === item && (
                          <svg
                            className="w-3 h-3 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                          </svg>
                        )}
                      </span>
                      {item}
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="border-t my-5">
                <h3 className="my-6">{t("shippingSpeed")}</h3>
                <div className="flex gap-5">
                  {rates.map((item, index) => (
                    <label key={index} className="flex items-center gap-2 text-14 text-gray-400 cursor-pointer">
                      <Field
                        type="radio"
                        name="shipping_speed"
                        value={item}
                        className="hidden peer"
                        disabled={isSubmitting}
                      />
                      <span
                        className={`w-4 h-4 border-2 rounded flex items-center justify-center transition-all duration-200 ${
                          values.shipping_speed === item
                            ? "border-primary bg-primary"
                            : "border-gray-300"
                        } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        {values.shipping_speed === item && (
                          <svg
                            className="w-3 h-3 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                          </svg>
                        )}
                      </span>
                      {item}
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-b my-5">
                <h3 className="my-6">{t("customerService")}</h3>
                <div className="flex gap-5 mb-5">
                  {rates.map((item, index) => (
                    <label key={index} className="flex items-center gap-2 text-14 text-gray-400 cursor-pointer">
                      <Field
                        type="radio"
                        name="customer_service"
                        value={item}
                        className="hidden peer"
                        disabled={isSubmitting}
                      />
                      <span
                        className={`w-4 h-4 border-2 rounded flex items-center justify-center transition-all duration-200 ${
                          values.customer_service === item
                            ? "border-primary bg-primary"
                            : "border-gray-300"
                        } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        {values.customer_service === item && (
                          <svg
                            className="w-3 h-3 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                          </svg>
                        )}
                      </span>
                      {item}
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="mt-10 mb-4">{t("additionalComment")}</h3>
                <Field
                  as="textarea"
                  placeholder={t("comment")}
                  name="comment"
                  disabled={isSubmitting}
                  className={`w-[640px] bg-white outline-none border-2 rounded-md p-2 h-24 block placeholder:text-14 
                              ${
                                errors.comment && touched.comment
                                  ? "border-red-500 focus:border-red-500"
                                  : touched.comment
                                  ? "border-green-500 focus:border-green-500"
                                  : "border-gray-200 focus:border-primary"
                              } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                />
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`flex items-center gap-3 bg-primary text-white rounded-md py-3 px-6 mt-8 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-primary-dark"
                }`}
              >
                {isSubmitting ? (
                  <span>{t("submitting")}...</span>
                ) : isRTL ? (
                  <>
                    <IoIosArrowRoundForward size={25} />
                    {t("sendFeedback")}
                  </>
                ) : (
                  <>
                    {t("sendFeedback")}
                    <IoIosArrowRoundBack size={25} />
                  </>
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}

export default OrderRating;