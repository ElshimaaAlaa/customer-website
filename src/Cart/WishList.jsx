import { useState, useEffect, useContext } from "react";
import { ClipLoader } from "react-spinners";
import { IoIosArrowRoundForward, IoIosHeart } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CartContext } from "../Context/CartContext";
import { useWishlist } from "../Context/WishlistContext";

function WishList() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isToggling, setIsToggling] = useState({});
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  const cart = useContext(CartContext);
  
  const { 
    wishlistItems: wishlistData, 
    toggleWishlistItem,
    fetchWishlist 
  } = useWishlist();

  useEffect(() => {
    setIsRTL(i18n.language === "ar");
  }, [i18n.language]);

  const addToCart = (product) => {
    cart.AddProductToCart(product);
  };

  const clearWishlist = async () => {
    try {
      setIsLoading(true);
      // إنشاء مصفوفة من وعود الحذف
      const deletePromises = wishlistData.map(product => 
        toggleWishlistItem(product.id)
      );
      
      // انتظار اكتمال جميع عمليات الحذف
      await Promise.all(deletePromises);
      
      // إعادة جلب البيانات للتأكد من التحديث
      await fetchWishlist();
    } catch (error) {
      console.error("Error clearing wishlist:", error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleWishlist = async (productId) => {
    setIsToggling((prev) => ({ ...prev, [productId]: true }));
    try {
      // تحديث واجهة المستخدم فوراً بإزالة العنصر محلياً
      const updated = await toggleWishlistItem(productId);
      
      if (!updated) {
        // إذا فشلت العملية، نعيد جلب البيانات للحصول على الحالة الحقيقية
        await fetchWishlist();
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      setError(true);
      // في حالة الخطأ، نعيد جلب البيانات للتأكد من المزامنة
      await fetchWishlist();
    } finally {
      setIsToggling((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const getTranslatedField = (product, field) => {
    const language = i18n.language;
    const fieldName = `${field}_${language.split("-")[0]}`;
    return product[fieldName] || product[field] || "";
  };

  const getProductQuantity = (productId) => {
    const product = cart.cartItems.find((item) => item.id === productId);
    return product ? product.quantity : 0;
  };

  return (
    <div className="px-10 md:px-20 pt-5 pb-20 relative">
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

      <h1 className="text-2xl font-bold mb-5 rtl:text-[22px]">
        {t("wishlist")}
      </h1>

      {error ? (
        <div className="text-red-500 text-center mt-10">{t("error")}</div>
      ) : isLoading ? (
        <div className="text-gray-400 text-center mt-10">
          <ClipLoader color="#E0A75E" />
        </div>
      ) : wishlistData.length === 0 ? (
        <div className="text-gray-400 text-center mt-10 rtl:text-[18px]">
          {t("noWishlistProducts")}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlistData.map((product) => {
            const quantity = getProductQuantity(product.id);
            return (
              <div key={product.id} className="rounded-md group">
                <div className="relative bg-gray-50 border w-300 h-72 px-4 rounded-md flex justify-center">
                  <button
                    className="absolute top-1 right-1 p-1"
                    onClick={() => handleToggleWishlist(product.id)}
                    disabled={isToggling[product.id]}
                    aria-label={t("removeFromWishlist")}
                  >
                    {isToggling[product.id] ? (
                      <ClipLoader size={20} color="#E0A75E" />
                    ) : (
                      <IoIosHeart size={27} className="text-red-500" />
                    )}
                  </button>

                  {product.discount_percentage > 0 && (
                    <button className="absolute top-2 left-2 py-2 px-3 text-15 bg-red-600 text-white rounded-full">
                      {isRTL
                        ? `${product.discount_percentage}% -`
                        : `- ${product.discount_percentage}%`}
                    </button>
                  )}

                  {product.images?.[0]?.src && (
                    <img
                      src={
                        product.images[0].src || "/assets/images/product.png"
                      }
                      alt={product.name}
                      className="h-full w-full p-6 object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/assets/images/product.png";
                      }}
                    />
                  )}
                </div>

                <div className="px-3 rtl:px-0 w-300">
                  <h3 className="font-bold text-lg mt-2">
                    {getTranslatedField(product, "name")}
                  </h3>
                  <div className="flex items-center gap-3">
                    <img
                      src="/assets/svgs/rate.svg"
                      alt="rate"
                      className="w-20 h-6"
                    />
                  </div>
                  {isRTL ? (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-gray-400 line-through text-sm">
                        ${product.price}
                      </span>
                      <span className="text-primary text-lg font-bold">
                        ${product.price_after_discount}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-primary text-lg font-bold">
                        ${product.price_after_discount}
                      </span>
                      <span className="text-gray-400 line-through text-sm">
                        ${product.price}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-3">
                  {quantity === 0 ? (
                    <button
                      className={`flex-1 rtl:text-13 rtl:lg:text-16 rounded-md border-2 border-primary py-2 text-17 font-bold transition-colors ${
                        product.stock === 0
                          ? "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
                          : "text-primary hover:bg-primary hover:text-white"
                      }`}
                      disabled={product.stock === 0}
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      aria-label={t("addToCart")}
                    >
                      {t("addToCart")}
                    </button>
                  ) : (
                    <div className="flex flex-1  justify-between items-center border-2 border-primary rounded-md overflow-hidden">
                      <button
                        className="w-10 h-10 text-gray-500 font-bold text-xl hover:bg-primary-dark"
                        onClick={(e) => {
                          e.stopPropagation();
                          cart.RemoveProductFromCart(product.id);
                        }}
                        aria-label={t("decreaseQuantity")}
                      >
                        −
                      </button>
                      <span className="flex-1 text-center text-17 font-bold">
                        {quantity}
                      </span>
                      <button
                        className="w-10 h-10 text-gray-500 font-bold text-xl hover:bg-primary-dark"
                        onClick={(e) => {
                          e.stopPropagation();
                          cart.AddProductToCart(product);
                        }}
                        disabled={quantity >= product.stock}
                        aria-label={t("increaseQuantity")}
                      >
                        +
                      </button>
                    </div>
                  )}

                  <button
                    className={`flex-1 rtl:text-13 rtl:lg:text-16 rounded-md border-2 py-2 text-17 font-bold transition-colors disabled:opacity-30 ${
                      product.stock === 0
                        ? "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
                        : "bg-primary text-white border-primary hover:bg-primary-dark"
                    }`}
                    disabled
                    aria-label={t("buyNow")}
                  >
                    {t("buyNow")}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {wishlistData.length > 0 && (
        <div className="mt-16">
          <button
            onClick={clearWishlist}
            className="bg-gray-100 rtl:text-12 rtl:lg:text-16 text-gray-400 px-4 py-3 rounded-md"
            disabled={isLoading}
          >
            {isLoading ? <ClipLoader size={20} color="#E0A75E" /> : t("clearAll")}
          </button>
        </div>
      )}
    </div>
  );
}

export default WishList;