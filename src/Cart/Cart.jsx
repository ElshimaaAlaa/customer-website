import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { useShoppingCart } from "../Context/CartContext";
import { RiDeleteBinFill } from "react-icons/ri";
import { Field, Form, Formik } from "formik";
import InputField from "../Components/InputFields/InputField";
import { FaCheckCircle } from "react-icons/fa";

// import { useShoppingCart } from "../../../Cart Context/CartContext";
const Cart = () => {
  const {
    cartItems,
    AddProductToCart,
    RemoveProductFromCart,
    RemoveAllProductsFromCart,
  } = useShoppingCart();

  const handleClearCart = () => {
    RemoveAllProductsFromCart();
    toast.success(t("clearCart"));
  };
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  return (
    <div className="px-4 md:px-20 pt-5 pb-20 relative">
      <button
        className="text-primary underline flex items-center rounded-md -ms-4 p-3 gap-2 mb-3"
        onClick={() => navigate("/Home/HomePage")}
      >
        <IoIosArrowRoundBack size={25} /> {t("backToHome")}
      </button>

      {/* cart items */}
      <div>
        {cartItems.length === 0 ? (
          <p className="text-center text-17 font-bold">{t("noCartItems")}</p>
        ) : (
          <>
            <h3 className="text-[17px]">{t("cart")}</h3>
            <div className="flex gap-10">
              <section className="w-full">
                <div className=" rounded-lg mt-2 overflow-y-scroll lg:overflow-hidden">
                  <table className="bg-white min-w-full table">
                    <thead>
                      <tr className="bg-gray-100 py-4">
                        <th className="px-3 py-3  text-center cursor-pointer text-11 md:text-14 lg:text-14">
                          {t("product")}
                        </th>
                        <th className="px-3 py-3  text-center cursor-pointer text-11 md:text-14 lg:text-14">
                          {t("qyt")}
                        </th>
                        <th className="px-3 py-3  text-center cursor-pointer text-11 md:text-14 lg:text-14">
                          {t("price")}
                        </th>
                        <th className="px-3 py-3  text-center cursor-pointer text-11 md:text-14 lg:text-14">
                          {t("total")}
                        </th>
                        <th className="px-3 py-3  text-center cursor-pointer text-11 md:text-14 lg:text-14">
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
                                  {item.items.map((prod, index) => (
                                    <li key={index}>
                                      {prod.name} - ${prod.price}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ) : (
                              <div className="flex items-center">
                                <img
                                  src={item.images[0].src}
                                  alt={item.title}
                                  className="w-20 h-20 p-3 rounded-full"
                                />
                                <p className="font-bold text-black">
                                  {item.name}
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
                              <p className="font-bold">{item.quantity}</p>
                              <button
                                className="font-bold text-primary"
                                onClick={() => RemoveProductFromCart(item.id)}
                              >
                                -
                              </button>
                            </div>
                          </td>
                          <td className="px-3 py-3 text-center">
                            {item.price} $
                          </td>
                          <td className="px-3 py-3 text-center">
                            {item.price_after_discount} $
                          </td>
                          <td className="px-3 py-3 text-center cursor-pointer ">
                            <RiDeleteBinFill
                              className="text-red-600 text-center"
                              size={23}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
              {/* cart summary */}
              <div>
                <section className="border-2 rounded-md p-4 border-primary w-400 h-80">
                  <h3 className="p-3 bg-gray-100 text-primary text-lg rtl:text-[17px] font-bold rounded-lg">
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
                {/* add coupon */}
                <section className="border rounded-md my-4 p-4">
                  <p>{t("haveCoupon")}</p>
                  <p className="text-gray-400 text-14 mt-2 mb-4">
                    {t("addCoupon")}
                  </p>
                  <Formik>
                    <Form>
                      <div>
                        <span className=" absolute z-10 bg-gray-100 rounded-md p-2 h-14 ">
                          <img
                            src="/assets/svgs/ticket-percent.svg"
                            alt="coupon percent"
                            className="w-6 mt-2"
                          />
                        </span>
                        <div className="px-7">
                          <InputField name={""} placeholder={t("couponCode")} />
                        </div>
                      </div>
                      <button
                        className="text-primary font-bold flex items-center gap-2 mt-4"
                        type="submit"
                      >
                        <FaCheckCircle size={20} />
                        {t("apply")}
                      </button>
                    </Form>
                  </Formik>
                </section>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="flex items-center gap-4 mt-7 ltr:justify-end rtl:flex-row-reverse rtl:justify-end">
        <button
          className="bg-gray-100 text-gray-400 p-3 rounded-md font-bold w-48"
          onClick={() => navigate("/Home/Products")}
        >
          {t("continueShopping")}
        </button>
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
              {t("processedCheckout")}
              <IoIosArrowRoundForward size={25} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
export default Cart;