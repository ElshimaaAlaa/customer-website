import { useState, useEffect } from "react";
import { getHomeData } from "../../ApiServices/Home";
import { toggleWishlist } from "../../ApiServices/ToggleWishlist";
import { ClipLoader } from "react-spinners";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SuccessModal from "../../Components/Modal/Success Modal/SuccessModal";
import AuthModal from "../../Components/Modal/Success Modal/AuthModal";

function BestSalesProducts() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [bestProducts, setBestProducts] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isRtl, setIsRtl] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchBestProducts = async () => {
      setIsLoading(true);
      try {
        const response = await getHomeData();
        setBestProducts(response.best_selling_products || []);
        const storedWishlist = localStorage.getItem("wishlistItems");
        if (storedWishlist) {
          setWishlistItems(JSON.parse(storedWishlist));
        }
        const token = localStorage.getItem("user token");
        setIsLoggedIn(!!token);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBestProducts();
    const storedWishlist = localStorage.getItem("wishlistItems");
    if (storedWishlist) {
      setWishlistItems(JSON.parse(storedWishlist));
    }
    setIsRtl(i18n.language === "ar");
  }, [i18n.language]);

  const handleWishlistToggle = async (productId) => {
    if (!isLoggedIn) {
      setShowModal(true);
      return;
    }
    try {
      const stored = JSON.parse(localStorage.getItem("wishlistItems") || "[]");
      const isInWishlist = stored.includes(productId);
      const updatedWishlist = isInWishlist
        ? stored.filter((id) => id !== productId)
        : [...stored, productId];

      setWishlistItems(updatedWishlist);
      localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));

      const response = await toggleWishlist(productId);
      if (!response.success) throw new Error(response.message);
    } catch (error) {
      console.error("Wishlist toggle failed", error);
      const stored = JSON.parse(localStorage.getItem("wishlistItems") || "[]");
      setWishlistItems(stored);
    }
  };

  const getTranslatedField = (product, field) => {
    const language = i18n.language;
    const fieldName = `${field}_${language.split("-")[0]}`;
    return product[fieldName] || product[field] || "";
  };

  return (
    <div className="px-4 md:px-10 lg:px-20 py-10 relative">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-6 rtl:text-[22px]">
          {t("bestSale")}
        </h1>
        <button
          className="text-primary w-32 flex items-center font-bold gap-2"
          onClick={() => navigate("/Home/Products")}
        >
          {t("viewAll")}
          {isRtl ? (
            <IoIosArrowRoundBack size={25} />
          ) : (
            <IoIosArrowRoundForward size={25} />
          )}
        </button>
      </div>

      {error ? (
        <div className="text-red-500 text-center mt-10">
          {t("failedToFetchData")}
        </div>
      ) : isLoading ? (
        <div className="text-gray-400 text-center mt-10">
          <ClipLoader color="#E0A75E" />
        </div>
      ) : bestProducts.length === 0 ? (
        <div className="text-gray-400 text-center mt-10">
          {t("noProductsFound")}
        </div>
      ) : (
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={15}
            slidesPerView={1}
            navigation={{
              nextEl: ".custom-swiper-button-next",
              prevEl: ".custom-swiper-button-prev",
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {bestProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="rounded-lg h-full">
                  <div className="relative bg-gray-50 border rounded-lg h-full flex flex-col">
                    <button
                      className="absolute top-1 right-1 p-2"
                      onClick={() => handleWishlistToggle(product.id)}
                    >
                      {wishlistItems.includes(product.id) ? (
                        <IoIosHeart size={27} className="text-red-500" />
                      ) : (
                        <IoIosHeartEmpty
                          size={27}
                          className="text-black hover:text-red-500"
                        />
                      )}
                    </button>

                    {product.discount_percentage > 0 && (
                      <div className="absolute top-3 left-3 p-2 text-xs bg-red-600 text-white rounded-2xl">
                        {isRtl ? (
                          <>{product.discount_percentage}% - </>
                        ) : (
                          <>- {product.discount_percentage}%</>
                        )}
                      </div>
                    )}

                    <div className="h-56 flex justify-center py-5 flex-grow">
                      {product.images?.[0]?.src ? (
                        <img
                          src={product.images[0].src}
                          alt={getTranslatedField(product, "name")}
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/placeholder-product.png";
                          }}
                        />
                      ) : (
                        <div className="text-gray-400 flex items-center justify-center h-full">
                          {t("noImageAvailable")}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-3">
                    <h3 className="font-bold text-lg">
                      {getTranslatedField(product, "name")}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-lg font-bold text-primary">
                        $
                        {product.price_after_discount?.toFixed(2) ??
                          product.price.toFixed(2)}
                      </span>
                      {product.price_after_discount && (
                        <span className="line-through text-gray-400 text-sm">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex justify-end mt-6 gap-4">
            <button className="custom-swiper-button-prev bg-primary p-2 rounded-full text-white">
              <IoIosArrowRoundBack size={24} />
            </button>
            <button className="custom-swiper-button-next bg-primary p-2 rounded-full text-white">
              <IoIosArrowRoundForward size={24} />
            </button>
          </div>
        </div>
      )}
      <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <AuthModal initialMode="login" onClose={() => setShowModal(false)} />
      </SuccessModal>
    </div>
  );
}
export default BestSalesProducts;