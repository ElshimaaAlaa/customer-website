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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function BestSalesProducts() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [bestProducts, setBestProducts] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

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
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBestProducts();
  }, []);

  const handleWishlistToggle = async (productId) => {
    try {
      // Optimistic UI update
      const isInWishlist = wishlistItems.includes(productId);
      const updatedWishlist = isInWishlist
        ? wishlistItems.filter((id) => id !== productId)
        : [...wishlistItems, productId];

      setWishlistItems(updatedWishlist);
      localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));

      const response = await toggleWishlist(productId);
      if (!response.success) {
        throw new Error(response.message || "Failed to update wishlist");
      }

      toast.success(
        isInWishlist
          ? t("productRemovedFromWishlist")
          : t("productAddedToWishlist"),
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    } catch (error) {
      setWishlistItems((prev) =>
        prev.includes(productId)
          ? prev.filter((id) => id !== productId)
          : [...prev, productId]
      );
      console.error("Wishlist error:", error);
    }
  };

  const renderRating = (rating) => {
    if (!rating)
      return (
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <svg
              key={`empty-${i}`}
              className="w-5 h-5 text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      );

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
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        {hasHalfStar && (
          <svg
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              fill="url(#half-star)"
            />
            <defs>
              <linearGradient id="half-star" x1="0" x2="100%" y1="0" y2="0">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#D1D5DB" />
              </linearGradient>
            </defs>
          </svg>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <svg
            key={`empty-${i}`}
            className="w-4 h-4 text-gray-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="text-13 text-gray-600 ml-1">{rating}</span>
      </div>
    );
  };

  const getTranslatedField = (product, field) => {
    const language = i18n.language;
    const fieldName = `${field}_${language.split("-")[0]}`;
    return product[fieldName] || product[field] || "";
  };

  return (
    <div className="px-4 md:px-20 py-10 relative">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-6">{t("bestSale")}</h1>
        <button
          className="text-primary w-32 flex items-center rounded-lg justify-center font-bold p-3 gap-2"
          onClick={() => navigate("/Home/Products")}
        >
          {t("viewAll")} <IoIosArrowRoundForward size={25} />
        </button>
      </div>

      {error ? (
        <div className="text-red-500 text-15 text-center mt-10">
          {t("failedToFetchData")}
        </div>
      ) : isLoading ? (
        <div className="text-gray-400 text-center mt-10">
          <ClipLoader color="#E0A75E" />
        </div>
      ) : bestProducts.length === 0 ? (
        <div className="text-gray-400 text-15 text-center mt-10">
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
                      className="absolute top-1 right-1 p-2 rounded-full z-10"
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
                        -{product.discount_percentage}%
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
                    <div className="flex items-center gap-2 my-2">
                      {renderRating(product.rate)}
                    </div>
                    <div className="flex items-center gap-2">
                      {product.price_after_discount ? (
                        <>
                          <span className="text-lg font-bold text-primary">
                            ${product.price_after_discount.toFixed(2)}
                          </span>
                          <span className="text-14 font-light text-gray-400 line-through">
                            ${product.price.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-primary">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* </div> */}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex justify-end mt-6 gap-4">
            <button className="custom-swiper-button-prev bg-primary p-2 rounded-full text-white hover:bg-primary-dark transition-colors">
              <IoIosArrowRoundBack size={24} />
            </button>
            <button className="custom-swiper-button-next bg-primary p-2 rounded-full text-white hover:bg-primary-dark transition-colors">
              <IoIosArrowRoundForward size={24} />
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default BestSalesProducts;
