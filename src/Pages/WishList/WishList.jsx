import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";
import { getWishListData } from "../../ApiServices/Wishlist";
import { useNavigate } from "react-router-dom";

function WishList() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [wishlistData, setWishListData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishListData = async () => {
      setIsLoading(true);
      try {
        const response = await getWishListData();
        setWishListData(response || []);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWishListData();
  }, []);

  return (
    <div className="px-4 md:px-20 py-10 relative">
      <button
        className="text-primary underline flex items-center rounded-md -ms-4 p-3 gap-2"
        onClick={() => navigate("/Home/HomePage")}
      >
        <IoIosArrowRoundBack size={25} /> Back to home
      </button>
      <h1 className="text-lg font-bold mb-6">Wishlist</h1>
      {error ? (
        <div className="text-red-500 text-15 text-center mt-10">
          Failed to fetch data. Please try again.
        </div>
      ) : isLoading ? (
        <div className="text-gray-400 text-center mt-10">
          <ClipLoader color="#E0A75E" />
        </div>
      ) : wishlistData.length === 0 ? (
        <div className="text-gray-400 text-15 text-center mt-10">
          No products found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistData.map((product) => (
            <div key={product.id} className="rounded-md">
              <div className="relative bg-gray-50 border rounded-md flex justify-center">
                <button className="absolute top-1 right-1 p-1">
                  <IoIosHeartEmpty size={23} className="text-black" />
                </button>
                {product.discount_percentage > 0 && (
                  <button className="absolute top-2 left-2 p-1 text-13 bg-red-600 text-white rounded-xl">
                    - {product.discount_percentage}%
                  </button>
                )}
                {product.images?.[0]?.src && (
                  <img
                    src={product.images[0].src}
                    alt={product.name}
                    className="w-48 h-72 py-3 rounded-lg object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/path/to/placeholder-image.png";
                    }}
                  />
                )}
              </div>
              <div className="text-left ms-1">
                <h3 className="font-bold text-16 mt-3 line-clamp-2">{product.name}</h3>
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/svgs/rate.svg"
                    alt="rate"
                    className="w-20 h-6"
                  />
                  <p className="text-12">{product.rate || 0} / 5</p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  {product.price_after_discount && product.price_after_discount < product.price ? (
                    <>
                      <span className="text-primary text-17 font-bold">
                        ${product.price_after_discount}
                      </span>
                      <span className="text-gray-500 text-14 line-through">
                        ${product.price}
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
          ))}
        </div>
      )}
    </div>
  );
}
export default WishList;