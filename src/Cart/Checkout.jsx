import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import InputField from "../Components/InputFields/InputField";
import CreditCard from "../Svgs/CreditCard";
import GooglePay from "../Svgs/GooglePay";
import Paypal from "../Svgs/Paypal";
import Visa from "../Svgs/Visa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { checkoutOrder } from "../ApiServices/Checkout";
function Checkout() {
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    payment_method: "",
    card_cvv: "",
    expiration_date: "",
    card_holder_name: "",
    card_number: "",
    order_id: "",
    transaction_id: "",
    response: "",
  };

  const validationSchema = Yup.object({
    payment_method: Yup.string().required("Payment method is required"),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      await checkoutOrder(
        values.payment_method,
        values.card_cvv,
        values.card_holder_name,
        values.card_number,
        values.order_id,
        values.transaction_id,
        values.response
      );
      console.log("success checkout");
    } catch (error) {
      console.log("faild checkout", error);
    }
  };

  const paymentMethods = [
    {
      id: "credit_card",
      label: "Credit Card",
      icon: <CreditCard />,
    },
    { id: "paypal", label: "PayPal", icon: <Paypal /> },
    { id: "visa", label: "Visa", icon: <Visa /> },
    {
      id: "google_pay",
      label: "Google Pay",
      icon: <GooglePay />,
    },
  ];
  useEffect(() => {
    setIsRTL(i18n.language === "ar");
  }, [i18n.language]);
  return (
    <div className="px-20 py-4">
      <h3 className="font-bold text-xl mb-4">{t("checkout")}</h3>
      <div className="flex gap-11">
        <section className="p-5 w-760">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form>
                {/* 1- contact info */}
                <div className="border-2 border-gray-200 rounded-md p-5 w-760">
                  <h3 className="font-bold mb-3 text-lg">{t("contact")}</h3>

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <InputField name="name" placeholder={t("name")} />
                      <InputField name="email" placeholder={t("email")} />
                    </div>
                    <InputField name="phone" placeholder={t("phone")} />
                  </div>

                  {/* 2 - Shipping Address */}
                  <div className="my-3">
                    <h3 className="font-bold text-lg mb-3">
                      2 - {t("shippingAddress")}
                    </h3>
                    <div className="flex items-center gap-3">
                      <InputField name="country" placeholder={t("country")} />
                      <InputField
                        name="address_line2"
                        placeholder={t("government")}
                      />
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                      <InputField name="city" placeholder={t("city")} />
                      <InputField
                        name="zip_code"
                        placeholder={t("streetName")}
                      />
                    </div>
                  </div>

                  {/* 3 - Payment Method */}
                  <div className="my-3">
                    <h3 className="font-bold mb-3 text-lg">
                      3 - {t("PaymentMethod")}
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {paymentMethods.map((method) => (
                        <label
                          key={method.id}
                          className={`rounded-lg p-2 flex items-center gap-2 font-bold text-14 cursor-pointer transition-colors ${
                            values.payment_method === method.id
                              ? "bg-primary-light border border-primary bg-customOrange-mediumOrange"
                              : "bg-gray-50 hover:bg-gray-100"
                          }`}
                        >
                          <Field
                            type="radio"
                            name="payment_method"
                            value={method.id}
                            className="hidden"
                            onChange={() =>
                              setFieldValue("payment_method", method.id)
                            }
                          />
                          <span className="w-10 h-10 flex items-center justify-center">
                            {method.icon}
                          </span>
                          {method.label}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 mt-7 rtl:flex-row-reverse ">
                  <button className="bg-gray-50 text-gray-400 p-3 w-32 rounded-md font-bold flex items-center justify-center gap-2">
                    {isRTL ? (
                      <>
                        {t("back")}

                        <IoIosArrowRoundBack size={24} />
                      </>
                    ) : (
                      <>
                        <IoIosArrowRoundBack size={24} />
                        {t("back")}
                      </>
                    )}
                  </button>
                  <button className="bg-primary text-white font-bold w-48 rounded-md p-3 flex items-center justify-center gap-2">
                    {isRTL ? (
                      <>
                        <IoIosArrowRoundForward size={24} />
                        {t("completeOrder")}
                      </>
                    ) : (
                      <>
                        {t("completeOrder")}
                        <IoIosArrowRoundForward size={24} />
                      </>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </section>
        {/* cart summary */}
        <section className="border-2 rounded-md p-4 border-primary w-400 h-80">
          <h3 className="p-4 bg-gray-100 text-primary text-lg font-bold rounded-lg">
            {t("cartSummary")}
          </h3>
          <div className="flex items-center justify-between mt-5">
            <h3 className="font-bold">{t("subTotal")}</h3>
            <p className="text-gray-500">$ 0</p>
          </div>
          <div className="flex items-center justify-between mt-7">
            <h3 className="font-bold">{t("shipping")}</h3>
            <p className="text-gray-500">$ 0</p>
          </div>
          <div className="flex items-center justify-between mt-7">
            <h3 className="font-bold">{t("tax")} (%) </h3>
            <p className="text-gray-500">$ 0</p>
          </div>
          <hr className="my-5" />
          <div className="flex items-center justify-between">
            <h3 className="font-bold">{t("total")}</h3>
            <p className="text-gray-500">$ 0</p>
          </div>
        </section>
      </div>
    </div>
  );
}
export default Checkout;
