import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useShoppingCart } from "../Context/CartContext";
import { RiDeleteBinFill } from "react-icons/ri";
import { Field, Form, Formik } from "formik";
import InputField from "../Components/InputFields/InputField";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";

const Cart = () => {
  const { cartItems, AddProductToCart, RemoveProductFromCart } =
    useShoppingCart();

  // استرجاع حالة الكوبون من localStorage إذا كانت موجودة
  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    const savedCoupon = localStorage.getItem("appliedCoupon");
    return savedCoupon ? JSON.parse(savedCoupon) : null;
  });

  const [couponDiscount, setCouponDiscount] = useState(() => {
    const savedDiscount = localStorage.getItem("couponDiscount");
    return savedDiscount ? parseFloat(savedDiscount) : 0;
  });

  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  // حفظ حالة الكوبون في localStorage عند تغييرها
  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem("appliedCoupon", JSON.stringify(appliedCoupon));
      localStorage.setItem("couponDiscount", couponDiscount.toString());
    } else {
      localStorage.removeItem("appliedCoupon");
      localStorage.removeItem("couponDiscount");
    }
  }, [appliedCoupon, couponDiscount]);

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  // دالة للحصول على صورة المنتج بشكل آمن
  const getProductImage = (item) => {
    if (
      !item.images ||
      !Array.isArray(item.images) ||
      item.images.length === 0
    ) {
      return "/assets/images/product.png";
    }

    if (!item.images[0] || !item.images[0].src) {
      return "/assets/images/product.png";
    }

    return item.images[0].src;
  };

  // حساب المجموع الفرعي
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return (
        total +
        (item.price_after_discount || item.price || 0) * (item.quantity || 1)
      );
    }, 0);
  };

  // حساب الضريبة (افتراضي 10%)
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

  // تطبيق الكوبون باستخدام API
  const applyCoupon = async (couponCode) => {
    setIsApplyingCoupon(true);
    try {
      const subtotal = calculateSubtotal();
      const response = await axios({
        url: `https://demo.vrtex.duckdns.org/api/orders/apply-coupon`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-Language": i18n.language || "ar",
          Authorization: `Bearer ${localStorage.getItem("user token")}`,
        },
        data: {
          coupon: couponCode,
          price: subtotal,
        },
      });

      if (response.data.status && response.data.code === 200) {
        const couponData = response.data.data;

        const newCoupon = {
          code: couponCode.toUpperCase(),
          discount: couponData.discount,
          total: couponData.total,
        };

        setAppliedCoupon(newCoupon);
        setCouponDiscount(couponData.discount);
      } else {
        // يمكن إضافة toast للخطأ هنا إذا كنت تستخدمينها
        console.error("Failed to apply coupon:", response.data.message);
      }
    } catch (error) {
      console.error("Failed to apply coupon ", error);
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  // إزالة الكوبون
  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
  };

  return (
    <div className="px-4 md:px-20 pt-5 pb-20 relative">
      <button
        className="text-primary underline flex items-center rounded-md -ms-4 p-3 gap-2 mb-3"
        onClick={() => navigate("/Home/HomePage")}
      >
        {isRTL ? (
          <IoIosArrowRoundForward size={25} />
        ) : (
          <IoIosArrowRoundBack size={25} />
        )}
        {t("backToHome")}
      </button>

      {/* cart items */}
      <div>
        {cartItems.length === 0 ? (
          <p className="text-center text-17 font-bold">{t("noCartItems")}</p>
        ) : (
          <>
            <h3 className="text-[17px]">{t("cart")}</h3>
            <div className="flex flex-col lg:flex-row gap-10">
              <section className="w-full lg:w-2/3">
                <div className="rounded-lg mt-2 overflow-x-auto">
                  <table className="bg-white min-w-full table">
                    <thead>
                      <tr className="bg-gray-100 py-4">
                        <th className="px-3 py-3 text-center  text-gray-400 text-11 md:text-14 lg:text-14">
                          {t("product")}
                        </th>
                        <th className="px-3 py-3 text-center  text-gray-400 text-11 md:text-14 lg:text-14">
                          {t("qyt")}
                        </th>
                        <th className="px-3 py-3 text-center  text-gray-400 text-11 md:text-14 lg:text-14">
                          {t("price")}
                        </th>
                        <th className="px-3 py-3 text-center  text-gray-400 text-11 md:text-14 lg:text-14">
                          {t("total")}
                        </th>
                        <th className="px-3 py-3 text-center  text-gray-400 text-11 md:text-14 lg:text-14">
                          {t("actions")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item.id}>
                          <td className="px-3 py-3 text-gray-600 text-13">
                            {item.isPromotion ? (
                              <div>
                                <strong>{item.title}</strong>
                                <ul className="text-sm text-gray-600 list-disc pl-5">
                                  {item.items &&
                                    item.items.map((prod, index) => (
                                      <li key={index}>
                                        {prod.name} - ${prod.price}
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            ) : (
                              <div className="flex items-center">
                                <img
                                  src={getProductImage(item)}
                                  alt={item.name || item.title || "Product"}
                                  className="w-16 h-16 p-3 rounded-full object-cover"
                                  onError={(e) => {
                                    e.target.src = "/assets/images/product.png";
                                  }}
                                />
                                <p className="font-bold text-black">
                                  {item.name || item.title}
                                </p>
                              </div>
                            )}
                          </td>
                          <td className="px-3 py-3 ">
                            <div className="flex items-center justify-center gap-5">
                              <button
                                className="font-bold text-primary "
                                onClick={() => AddProductToCart(item)}
                              >
                                +
                              </button>
                              <p className="font-bold">{item.quantity || 1}</p>
                              <button
                                className="font-bold text-primary"
                                onClick={() => RemoveProductFromCart(item.id)}
                              >
                                -
                              </button>
                            </div>
                          </td>
                          <td className="px-3 py-3 text-center">
                            {item.price || 0} $
                          </td>
                          <td className="px-3 py-3 text-center">
                            {(item.price_after_discount || item.price || 0) *
                              (item.quantity || 1)}{" "}
                            $
                          </td>
                          <td className="px-3 py-3 text-center cursor-pointer ">
                            <RiDeleteBinFill
                              className="text-red-600 text-center mx-auto"
                              size={23}
                              onClick={() => RemoveProductFromCart(item.id)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
              {/* cart summary */}
              <div className="w-full lg:w-1/3">
                <section className="border-2 rounded-md p-4 border-primary h-auto mb-4">
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
                    <div className="flex items-center justify-between mt-3 bg-green-50  rounded">
                      <p className=" flex items-center gap-2 text-14 rtl:flex-row-reverse">
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
                        <button
                          onClick={removeCoupon}
                          className="text-[#28A513] text-14"
                        >
                          [{t("remove")}]
                        </button>
                      </div>
                    </div>
                  )}

                  <hr className="my-5" />
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-15">{t("total")}</h3>
                    <p className="text-gray-500  text-14">
                      ${calculateTotal().toFixed(2)}
                    </p>
                  </div>
                </section>

                {/* add coupon */}
                <section className="border rounded-md my-4 p-4">
                  <p className="font-medium">{t("haveCoupon")}</p>
                  <p className="text-gray-400 text-14 mt-2 mb-4">
                    {t("addCoupon")}
                  </p>
                  <Formik
                    initialValues={{ couponCode: "" }}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                      if (values.couponCode.trim()) {
                        applyCoupon(values.couponCode);
                        resetForm();
                      }
                      setSubmitting(false);
                    }}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <div>
                          <div>
                            <Field
                              name="couponCode"
                              as={InputField}
                              placeholder={t("couponCode")}
                              disabled={
                                appliedCoupon !== null || isApplyingCoupon
                              }
                            />
                          </div>
                        </div>
                        <button
                          className={`text-primary text-14 flex items-center gap-2 mt-4 disabled:text-[#28A513] `}
                          type="submit"
                          disabled={
                            isSubmitting ||
                            appliedCoupon !== null ||
                            isApplyingCoupon
                          }
                        >
                          {isApplyingCoupon ? (
                            <>
                              <FaSpinner className="animate-spin" size={20} />
                              {t("applying")}
                            </>
                          ) : (
                            <>
                              {appliedCoupon ? (
                                <FaCheckCircle size={20} color="#28A513" />
                              ) : (
                                <FaCheckCircle size={20} />
                              )}
                              {appliedCoupon ? t("couponApplied") : t("apply")}
                            </>
                          )}
                        </button>
                      </Form>
                    )}
                  </Formik>
                </section>
              </div>
            </div>
          </>
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="flex items-center gap-4">
          <button
            className="bg-primary text-white p-3 rounded-md font-bold flex items-center gap-2"
            onClick={() => navigate("/Home/Checkout")}
          >
            {isRTL ? (
              <>
                <IoIosArrowRoundForward size={25} />
                {t("processedCheckout")}
              </>
            ) : (
              <>
                <IoIosArrowRoundBack size={25} />
                {t("processedCheckout")}
              </>
            )}
          </button>
          <button
            className="bg-gray-100 text-gray-400 w-44 p-3 rounded-md font-bold"
            onClick={() => navigate("/Home/Products")}
          >
            {t("continueShopping")}
          </button>
        </div>
      )}
    </div>
  );
};
export default Cart;
