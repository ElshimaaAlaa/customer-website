import { useState, useEffect } from "react";
import { getHomeData } from "../../ApiServices/Home";
import { toggleWishlist } from "../../ApiServices/ToggleWishlist";
import { ClipLoader } from "react-spinners";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function BestSalesProducts() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [bestProducts, setBestProducts] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();
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
          ? "Product removed from wishlist"
          : "Product added to wishlist",
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
      toast.error(error.message || "Failed to update wishlist", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error("Wishlist error:", error);
    }
  };

  return (
    <div className="px-4 md:px-20 py-10 relative">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold mb-6">Best Selling Products</h1>
        <button
          className="text-primary w-32 flex items-center rounded-md justify-center font-bold p-3 gap-2"
          onClick={() => navigate("/Home/Products")}
        >
          View All <IoIosArrowRoundForward size={25} />
        </button>
      </div>

      {error ? (
        <div className="text-red-500 text-15 text-center mt-10">
          Failed to fetch data. Please try again.
        </div>
      ) : isLoading ? (
        <div className="text-gray-400 text-center mt-10">
          <ClipLoader color="#E0A75E" />
        </div>
      ) : bestProducts.length === 0 ? (
        <div className="text-gray-400 text-15 text-center mt-10">
          No products found.
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
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {bestProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="rounded-md">
                  <div className="relative bg-gray-50 border rounded-md flex justify-center h-80">
                    <button
                      className="absolute top-3 right-3 p-2 bg-white rounded-full "
                      onClick={() => handleWishlistToggle(product.id)}
                    >
                      {wishlistItems.includes(product.id) ? (
                        <IoIosHeart size={20} className="text-red-500" />
                      ) : (
                        <IoIosHeartEmpty
                          size={20}
                          className="text-gray-600 hover:text-red-500"
                        />
                      )}
                    </button>

                    {product.discount_percentage > 0 && (
                      <div className="absolute top-3 left-3 p-2 text-xs bg-red-600 text-white rounded-2xl">
                        -{product.discount_percentage}%
                      </div>
                    )}
                    <div className="flex items-center justify-center h-full p-4">
                      {product.images?.[0]?.src ? (
                        <img
                          src={product.images[0].src}
                          alt={product.name}
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/placeholder-product.png";
                          }}
                        />
                      ) : (
                        <div className="text-gray-400 flex items-center justify-center h-full">
                          No image available
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="ms-2">
                    <h3 className="font-semibold text-16 mt-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${
                              i < 4.5 ? "text-yellow-400" : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-13">4.5</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {product.price_after_discount ? (
                        <>
                          <span className="text-17 font-bold text-primary">
                            ${product.price_after_discount.toFixed(2)}
                          </span>
                          <span className="text-14 font-light text-gray-400 line-through">
                            ${product.price.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-17 font-bold text-primary">
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
            <button className="custom-swiper-button-prev bg-primary p-2 rounded-full text-white hover:bg-primary-dark transition-colors">
              <IoIosArrowRoundBack size={24} />
            </button>
            <button className="custom-swiper-button-next bg-primary p-2 rounded-full text-white hover:bg-primary-dark transition-colors">
              <IoIosArrowRoundForward size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default BestSalesProducts;
