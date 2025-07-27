import { useState, useEffect } from "react";
import { getHomeData } from "../../ApiServices/Home";
import { ClipLoader } from "react-spinners";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./Promotions.scss";
import { useTranslation } from "react-i18next";
import { useShoppingCart } from "../../Cart Context/CartContext";
import { toast, ToastContainer } from "react-toastify";
import { IoIosCart } from "react-icons/io";
import SuccessModal from "../../Components/Modal/Success Modal/SuccessModal";
import AuthModal from "../../Components/Modal/Success Modal/AuthModal";

function Promotions() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [promotions, setPromotions] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const { t, i18n } = useTranslation();
  const [isRtl, setIsRtl] = useState(false);
  const { AddProductToCart } = useShoppingCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("user token");
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await getHomeData();
        setPromotions(response.promotions || []);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
    setIsLoading(!!token);
    setIsRtl(i18n.language === "ar");
  }, [i18n.language, token]);

  const handleAddPromotionToCart = (promotion) => {
    if (!isLoggedIn) {
      setShowModal(true);
      return
    }
    const packageItem = {
      id: `promo-${promotion.id}`,
      title: getTranslatedField(promotion, "title") || t("promotionPackage"),
      price: promotion.total_price || 0,
      quantity: 1,
      image:
        promotion.promotion_items?.[0]?.product?.images?.[0]?.src ||
        "/placeholder.png",
      isPromotion: true,
      items: promotion.promotion_items.map((item) => ({
        id: item.product.id,
        name: getTranslatedField(item.product, "name"),
        price: item.product.price_after_discount || item.product.price,
        image: item.product.images?.[0]?.src,
      })),
    };

    AddProductToCart(packageItem);
    toast.success(t("successAdded"));
  };

  const getTranslatedField = (product, field) => {
    const language = i18n.language;
    const fieldName = `${field}_${language.split("-")[0]}`;
    return product[fieldName] || product[field] || "";
  };

  const renderRating = (rating) => {
    const starPath =
      "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

    if (!rating) {
      return (
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <svg
              key={`empty-${i}`}
              className="w-5 h-5 text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d={starPath} />
            </svg>
          ))}
        </div>
      );
    }

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <svg
            key={`full-${i}`}
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d={starPath} />
          </svg>
        ))}
        {hasHalfStar && (
          <svg
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <defs>
              <linearGradient id="half-star" x1="0" x2="100%" y1="0" y2="0">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#D1D5DB" />
              </linearGradient>
            </defs>
            <path d={starPath} fill="url(#half-star)" />
          </svg>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <svg
            key={`empty-${i}`}
            className="w-5 h-5 text-gray-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d={starPath} />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="px-4 md:px-10 lg:px-20 py-5 relative">
      <h1 className="text-2xl font-bold mb-6 rtl:text-[22px]">
        {t("promotions")}
      </h1>
      {error ? (
        <div className="text-red-500 text-15 text-center mt-10 rtl:text-[18px]">
          {t("error")}
        </div>
      ) : isLoading ? (
        <div className="text-gray-400 text-center mt-10">
          <ClipLoader color="#E0A75E" />
        </div>
      ) : promotions.length === 0 ? (
        <div className="text-gray-400 text-15 text-center mt-10">
          {t("noPromo")}
        </div>
      ) : (
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              nextEl: ".custom-swiper-button-next",
              prevEl: ".custom-swiper-button-prev",
            }}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {promotions.flatMap((promotion) =>
              promotion.promotion_items?.map((item) => (
                <SwiperSlide key={`${promotion.id}-${item.id}`}>
                  <div
                    className="relative group rounded-md overflow-hidden"
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div
                      className={`absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300 ${
                        hoveredItem === item.id ? "opacity-100" : "opacity-0"
                      }`}
                    ></div>

                    <div className="relative bg-gray-50 border rounded-md flex justify-center">
                      <div className="absolute rounded-md overlay-div">
                        <div className="flex justify-end mx-2 my-2">
                          <p className="bg-red-600 text-14 text-white rounded-full p-2 text-center">
                            {isRtl
                              ? `${t("offer")} ${
                                  item.product.discount_percentage
                                }% -`
                              : `${t("offer")} - ${
                                  item.product.discount_percentage
                                }%`}
                          </p>
                        </div>
                        <div className="flex h-56 mx-3 items-end">
                          <div>
                            <h3 className="font-bold text-white text-xl mt-3">
                              {getTranslatedField(item.product, "name")}
                            </h3>
                            <div className="flex items-center gap-3">
                              {renderRating(item.product.rate)}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              {item.product.price_after_discount &&
                              item.product.price_after_discount !==
                                item.product.price ? (
                                isRtl ? (
                                  <>
                                    <span className="text-gray-300 mt-1 text-15 line-through">
                                      ${item.product.price}
                                    </span>
                                    <span className="text-white text-lg font-bold">
                                      ${item.product.price_after_discount}
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span className="text-white text-lg font-bold">
                                      ${item.product.price_after_discount}
                                    </span>
                                    <span className="text-gray-300 mt-1 text-15 line-through">
                                      ${item.product.price}
                                    </span>
                                  </>
                                )
                              ) : (
                                <span className="text-white text-lg font-bold">
                                  ${item.product.price}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      {item.product.images?.[0]?.src && (
                        <img
                          src={item.product.images[0].src}
                          alt={item.product.name}
                          className="w-full h-72 rounded-md object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/path/to/placeholder-image.png";
                          }}
                        />
                      )}
                    </div>

                    {/* Add to Cart Button - Large Screens */}
                    <div
                      className={`absolute bottom-4 hidden lg:flex transition-all duration-300 transform ${
                        hoveredItem === item.id
                          ? "translate-y-0 opacity-100"
                          : "translate-y-4 opacity-0"
                      } lg:right-4 lg:rtl:right-auto lg:rtl:left-4`}
                    >
                      <button
                        onClick={() => handleAddPromotionToCart(promotion)}
                        className="bg-primary hover:bg-primary-dark text-white px-5 py-3 text-base rounded-md font-semibold shadow-lg"
                      >
                        + {t("addToCart")}
                      </button>
                    </div>

                    {/* Add to Cart Button - Small & Medium Screens */}
                    <div
                      className={`absolute top-4 right-4 flex lg:hidden transition-all duration-300 transform ${
                        hoveredItem === item.id
                          ? "translate-y-0 opacity-100"
                          : "translate-y-4 opacity-0"
                      }`}
                    >
                      <button
                        onClick={() => handleAddPromotionToCart(promotion)}
                        className="bg-primary hover:bg-primary-dark text-white p-3 rounded-full shadow-md"
                        aria-label="Add to cart"
                      >
                        <IoIosCart size={22} />
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>
      )}
      <ToastContainer />
      <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <AuthModal initialMode="login" onClose={() => setShowModal(false)} />
      </SuccessModal>
    </div>
  );
}
export default Promotions;
