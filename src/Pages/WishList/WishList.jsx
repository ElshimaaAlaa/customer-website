import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { IoIosHeart } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";
import { getWishListData } from "../../ApiServices/Wishlist";
import { useNavigate } from "react-router-dom";
import { toggleWishlist } from "../../ApiServices/ToggleWishlist";
import { IoCart } from "react-icons/io5";

function WishList() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [wishlistData, setWishListData] = useState([]);
  const [isToggling, setIsToggling] = useState({});
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

  const handleToggleWishlist = async (productId) => {
    setIsToggling((prev) => ({ ...prev, [productId]: true }));
    try {
      const result = await toggleWishlist(productId);
      if (result.success) {
        setWishListData((prev) => prev.filter((item) => item.id !== productId));
      } else {
        console.error("Failed to toggle wishlist:", result.message);
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    } finally {
      setIsToggling((prev) => ({ ...prev, [productId]: false }));
    }
  };

  return (
    <div className="px-4 md:px-20 pt-5 pb-20 relative">
      <button
        className="text-primary underline flex items-center rounded-md -ms-4 p-3 gap-2 mb-3"
        onClick={() => navigate("/Home/HomePage")}
      >
        <IoIosArrowRoundBack size={25} /> Back to home
      </button>
      <h1 className="text-2xl font-bold mb-5">Wishlist</h1>
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
          No products found in your wishlist.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlistData.map((product) => (
            <div key={product.id} className="rounded-md group">
              <div className="relative bg-gray-50 border w-300 h-72 px-4 rounded-md flex justify-center">
                <button
                  className="absolute top-1 right-1 p-1"
                  onClick={() => handleToggleWishlist(product.id)}
                  disabled={isToggling[product.id]}
                >
                  {isToggling[product.id] ? (
                    <></>
                  ) : (
                    <IoIosHeart size={27} className="text-red-500" />
                  )}
                </button>
                {product.discount_percentage > 0 && (
                  <button className="absolute top-2 left-2 py-2 px-3 text-15 bg-red-600 text-white rounded-full">
                    - {product.discount_percentage}%
                  </button>
                )}
                {product.stock > 0 ? (
                  <p className="absolute bottom-3 left-3 rounded-full bg-yellow-300 text-14 py-1 px-2">
                    {product.stock} Left !
                  </p>
                ) : (
                  <p className="absolute bottom-3 left-3 rounded-full bg-red-600 text-14 py-1 px-2">
                    Out of stock
                  </p>
                )}
                {product.images?.[0]?.src ? (
                  <img
                    src={product.images[0].src}
                    alt={product.name}
                    className="h-full w-full p-6 cursor-pointer"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder-product.png";
                    }}
                  />
                ) : (
                  <div className="text-gray-400 text-14 flex items-center justify-center h-full">
                    No image available
                  </div>
                )}
              </div>
              <div className="px-3 w-300">
                <h3 className="font-bold text-lg mt-2">{product.name}</h3>
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/svgs/rate.svg"
                    alt="rate"
                    className="w-20 h-6"
                  />
                  <p className="text-13">{product.rate} / 5</p>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-primary text-lg font-bold">
                      ${product.price_after_discount}
                    </span>
                    <span className="text-gray-400 font-light text-15 line-through">
                      ${product.price}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex-1 rounded-md border-2 border-primary text-primary  py-3 text-17 font-bold hover:bg-primary hover:text-white transition-colors">
                    Add To Cart
                  </button>
                  <button className="flex-1 bg-primary text-white rounded-md py-3 border-2 border-primary text-17 font-bold hover:bg-primary-dark hover:bg-transparent hover:border-primary hover:text-primary transition-colors">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* <div className="flex mt-5 lg:justify-end gap-3">
        <button className="rounded-md p-3 font-bold bg-gray-100 text-gray-400 w-32 text-center">
          Clear All
        </button>
        <button className="bg-primary font-bold text-white p-3 rounded-md w-44 text-center">
          Add All To Cart
        </button>
      </div> */}
    </div>
  );
}
export default WishList;
