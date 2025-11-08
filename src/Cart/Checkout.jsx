import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import InputField from "../Components/InputFields/InputField";
import CreditCard from "../Svgs/CreditCard";
import GooglePay from "../Svgs/GooglePay";
import Paypal from "../Svgs/Paypal";
import Visa from "../Svgs/Visa";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { checkoutOrder } from "../ApiServices/Checkout";
import { useShoppingCart } from "../Context/CartContext";
import { FaSpinner } from "react-icons/fa";
import { Profile } from "../ApiServices/Profile";

function Checkout() {
  const { cartItems } = useShoppingCart();
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [initialFormValues, setInitialFormValues] = useState({
    payment_method: "",
    card_cvv: "",
    expiration_date: "",
    card_holder_name: "",
    card_number: "",
    order_id: "",
    transaction_id: "",
    response: "",
    name: "",
    email: "",
    phone: "",
    country: "",
    address_line2: "",
    city: "",
    zip_code: "",
  });

  // استرجاع حالة الكوبون من localStorage إذا كانت موجودة
  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    const savedCoupon = localStorage.getItem("appliedCoupon");
    return savedCoupon ? JSON.parse(savedCoupon) : null;
  });

  const [couponDiscount, setCouponDiscount] = useState(() => {
    const savedDiscount = localStorage.getItem("couponDiscount");
    return savedDiscount ? parseFloat(savedDiscount) : 0;
  });

  //get data of logged in user
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await Profile();
        setProfileData(response);
        
        // تحديث القيم الأولية للنموذج ببيانات المستخدم
        setInitialFormValues(prev => ({
          ...prev,
          name: response.name || "",
          email: response.email || "",
          phone: response.phone || "",
          country: response.country || "",
          address_line2: response.government || "",
          city: response.city || "",
          zip_code: response.street || "",
        }));
      } catch (error) {
        console.error(error);
      }
    };
    getUserData();
  }, []);

  const validationSchema = Yup.object({
    payment_method: Yup.string().required("Payment method is required"),
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    country: Yup.string().required("Country is required"),
    address_line2: Yup.string().required("Government is required"),
    city: Yup.string().required("City is required"),
    zip_code: Yup.string().required("Street name is required"),
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
    } finally {
      setIsLoading(false);
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

  // حساب المجموع الفرعي
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return (
        total +
        (item.price_after_discount || item.price || 0) * (item.quantity || 1)
      );
    }, 0);
  };

  // حساب الضريبة (افتراضي 5%)
  const calculateTax = () => {
    return calculateSubtotal() * 0.05;
  };

  // حساب الشحن (افتراضي 5% أو 5$ كحد أدنى)
  const calculateShipping = () => {
    const shipping = calculateSubtotal() * 0.05;
    return shipping < 5 ? 5 : shipping;
  };

  // حساب الإجمالي النهائي
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax();
    const shipping = calculateShipping();

    // If we have an applied coupon with a total from API, use that
    if (appliedCoupon && appliedCoupon.total !== undefined) {
      return appliedCoupon.total;
    }

    // Otherwise calculate normally
    return subtotal + tax + shipping - couponDiscount;
  };

  useEffect(() => {
    setIsRTL(i18n.language === "ar");
  }, [i18n.language]);

  return (
    <div className="px-4 md:px-20 py-4">
      <h3 className="font-bold text-xl mb-4">{t("checkout")}</h3>
      <div className="flex flex-col lg:flex-row gap-6">
        <section className="w-full lg:w-2/3">
          <Formik
            initialValues={initialFormValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true} // هذا يسمح بإعادة تهيئة القيم عند تغيير initialValues
          >
            {({ values, setFieldValue, isSubmitting }) => (
              <Form>
                {/* 1- contact info */}
                <div className="border-2 border-gray-200 rounded-md p-5 mb-6">
                  <h3 className="font-bold mb-3 text-17">{t("contact")}</h3>

                  <div>
                    <div className="flex flex-col md:flex-row items-center gap-3 mb-3">
                      <Field
                        as={InputField}
                        name="name"
                        placeholder={t("name")}
                      />
                      <Field
                        as={InputField}
                        name="email"
                        placeholder={t("email")}
                      />
                    </div>
                    <Field
                      as={InputField}
                      name="phone"
                      placeholder={t("phone")}
                    />
                  </div>

                  {/* 2 - Shipping Address */}
                  <div className="my-6">
                    <h3 className="font-bold text-17 mb-3">
                      2 - {t("shippingAddress")}
                    </h3>
                    <div className="flex flex-col md:flex-row items-center gap-3">
                      <Field
                        as={InputField}
                        name="country"
                        placeholder={t("country")}
                      />
                      <Field
                        as={InputField}
                        name="address_line2"
                        placeholder={t("government")}
                      />
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-3 mt-3">
                      <Field
                        as={InputField}
                        name="city"
                        placeholder={t("city")}
                      />
                      <Field
                        as={InputField}
                        name="zip_code"
                        placeholder={t("streetName")}
                      />
                    </div>
                  </div>

                  {/* 3 - Payment Method */}
                  <div className="my-6">
                    <h3 className="font-bold mb-3 text-17">
                      3 - {t("PaymentMethod")}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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

                <div className="flex items-center justify-end gap-3 mt-7 rtl:flex-row-reverse">
                  <button
                    type="button"
                    className="bg-gray-50 text-gray-400 p-3 w-32 rounded-md font-bold flex items-center justify-center gap-2"
                    onClick={() => window.history.back()}
                  >
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
                  <button
                    type="submit"
                    disabled={isLoading || isSubmitting}
                    className="bg-primary text-white font-bold w-48 rounded-md p-3 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <FaSpinner className="animate-spin" size={20} />
                    ) : isRTL ? (
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
        <section className="w-full lg:w-1/3">
          <div className="border-2 rounded-md p-4 border-primary h-auto mb-4">
            <h3 className="p-3 bg-gray-100 text-primary text-lg rtl:text-[17px] font-bold rounded-lg">
              {t("cartSummary")}
            </h3>

            <div className="flex items-center justify-between mt-5">
              <h3 className="font-bold text-15">{t("subTotal")}</h3>
              <p className="text-gray-500 text-14">
                ${calculateSubtotal().toFixed(2)}
              </p>
            </div>

            <div className="flex items-center justify-between mt-3">
              <h3 className="font-bold text-15">{t("shipping")}</h3>
              <p className="text-gray-500 text-14">
                ${calculateShipping().toFixed(2)}
              </p>
            </div>

            <div className="flex items-center justify-between mt-3">
              <h3 className="font-bold text-15">{t("tax")} (5%)</h3>
              <p className="text-gray-500 text-14">
                ${calculateTax().toFixed(2)}
              </p>
            </div>

            {appliedCoupon && (
              <div className="flex items-center justify-between mt-3 bg-green-50 rounded">
                <p className="flex items-center gap-2 text-14 rtl:flex-row-reverse">
                  {t("coupon")}
                  <img
                    src="/assets/svgs/ticket-percent.svg"
                    alt=""
                    className="w-5"
                  />
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-[#28A513] text-14">
                    {isRTL ? (
                      <> ${appliedCoupon.discount.toFixed(2)} -</>
                    ) : (
                      <> -${appliedCoupon.discount.toFixed(2)}</>
                    )}
                  </p>
                </div>
              </div>
            )}

            <hr className="my-5" />
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-15">{t("total")}</h3>
              <p className="text-gray-500 text-14">
                ${calculateTotal().toFixed(2)}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Checkout;