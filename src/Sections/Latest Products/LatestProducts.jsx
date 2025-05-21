import { useState, useEffect } from "react";
import { getHomeData } from "../../ApiServices/Home";
import { ClipLoader } from "react-spinners";
import { IoIosHeartEmpty } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";

function LatestProducts() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await getHomeData();
        setLatestProducts(response.latest_products || []);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="px-4 md:px-20 py-10 relative">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold mb-6">Latest Products</h1>
        <button className="text-primary w-32 flex items-center rounded-md justify-center font-bold p-3 gap-2">
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
      ) : latestProducts.length === 0 ? (
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
            {latestProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="rounded-md">
                  <div className="relative bg-gray-50 border rounded-md flex justify-center">
                    <button className="absolute top-1 right-1 p-1">
                      <IoIosHeartEmpty size={23} className="text-black" />
                    </button>
                    {product.images?.[0]?.src && (
                      <img
                        src={product.images[0].src}
                        alt={product.name}
                        className="w-48 h-72 py-3 rounded-md"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/path/to/placeholder-image.png";
                        }}
                      />
                    )}
                  </div>
                  <div className="text-left ms-1">
                    <h3 className="font-bold text-16 mt-3">{product.name}</h3>
                    <div className="flex items-center gap-3">
                      <img
                        src="/assets/svgs/rate.svg"
                        alt="rate"
                        className="w-20 h-6"
                      />
                      <p className="text-12 ">4.5 / 5 </p>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      {product.price_after_discount ? (
                        <>
                          <span className="text-primary text-17 font-bold">
                            ${product.price}
                          </span>
                          <span className="text-gray-500 text-14 line-through">
                            ${product.price_after_discount}
                          </span>
                        </>
                      ) : (
                        <span className="text-primary font-bold">
                          ${product.price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom navigation buttons */}
          <div className="flex justify-end mt-4 gap-6">
            <button className="custom-swiper-button-prev bg-primary p-2 rounded-full text-white">
              <IoIosArrowRoundBack size={25} />
            </button>
            <button className="custom-swiper-button-next bg-primary p-2 rounded-full text-white">
              <IoIosArrowRoundForward size={25} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default LatestProducts;
