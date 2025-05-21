import { useState, useEffect } from "react";
import { getHomeData } from "../../ApiServices/Home";
import { ClipLoader } from "react-spinners";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./offerStyle.scss";

function Offers() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [SalesProducts, setSalesProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await getHomeData();
        setSalesProducts(response.latest_products || []);
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
      <h1 className="text-xl font-bold mb-6">Offers</h1>

      {error ? (
        <div className="text-red-500 text-15 text-center mt-10">
          Failed to fetch data. Please try again.
        </div>
      ) : isLoading ? (
        <div className="text-gray-400 text-center mt-10">
          <ClipLoader color="#E0A75E" />
        </div>
      ) : SalesProducts.length === 0 ? (
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
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {SalesProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="rounded-md">
                  <div className="relative bg-gray-50 border rounded-md flex justify-center">
                    <div className="absolute rounded-md overlay-div">
                      <div className="flex justify-end mx-2 my-2">
                        <p className="bg-red-600 text-white rounded-2xl p-2 text-center ">
                          Offer - {product.discount_percentage}%
                        </p>
                      </div>
                      <div className="flex h-56 mx-3 items-end">
                        <div>
                          <h3 className="font-bold text-white text-xl mt-3">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-3">
                            <img
                              src="/assets/svgs/rate.svg"
                              alt="rate"
                              className="w-20 h-6"
                            />
                            <p className="text-12 text-white">4.5 / 5 </p>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            {product.price_after_discount ? (
                              <>
                                <span className="text-white text-lg font-bold">
                                  ${product.price}
                                </span>
                                <span className="text-gray-300 mt-1 text-14 line-through">
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
                    </div>
                    {product.images?.[0]?.src && (
                      <img
                        src={product.images[0].src}
                        alt={product.name}
                        className="w-full h-72 rounded-md"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/path/to/placeholder-image.png";
                        }}
                      />
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}
export default Offers;