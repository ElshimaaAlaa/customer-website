import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { useShoppingCart } from "../Context/CartContext";
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
  const { t } = useTranslation();
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
            <h3>{t("cart")}</h3>
            <div>
              <section>
                <div>
                  <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 px-4 py-2">
                          Item
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                          Price
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                          Quantity
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-2">
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
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-24 h-24 p-3"
                              />
                            )}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 font-bold">
                            {item.price} $
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <div className="flex items-center justify-center gap-5">
                              <button
                                className="font-bold bg-sky-400 p-3 w-12 rounded"
                                onClick={() => AddProductToCart(item)}
                              >
                                +
                              </button>
                              <p className="font-bold">{item.quantity}</p>
                              <button
                                className="font-bold p-3 w-12 bg-sky-400 rounded"
                                onClick={() => RemoveProductFromCart(item.id)}
                              >
                                -
                              </button>
                            </div>
                          </td>
                          <td className="border border-gray-300 px-4 py-2 font-bold">
                            {(item.quantity * item.price).toFixed(2)} $
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
              <section></section>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Cart;
