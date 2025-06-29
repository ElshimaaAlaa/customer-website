import { useEffect, useState } from "react";
import Quality from "../../Sections/Quality Section/Quality";
import {
  IoIosArrowRoundBack,
  IoIosHeart,
  IoIosHeartEmpty,
} from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import UserRating from "./UserRating";
import RelatedProduct from "./RelatedProduct";
import axios from "axios";
import { toggleWishlist } from "../../ApiServices/ToggleWishlist";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";

function ViewProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isTogglingWishlist, setIsTogglingWishlist] = useState(false);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios({
          url: `https://demo.vrtex.duckdns.org/api/products/${id}`,
          method: "GET",
          headers: {
            "Accept-Language": "en",
            Authorization: `Bearer ${localStorage.getItem("user token")}`,
          },
        });

        setProduct(response.data.data);
        setIsWishlisted(response.data.data?.is_fav || false);
        if (response.data.data?.images?.length > 0) {
          setMainImage(response.data.data.images[0].src);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product details", {
          position: "top-right",
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  const handleWishlistToggle = async () => {
    if (!product) return;

    setIsTogglingWishlist(true);
    try {
      const response = await toggleWishlist(product.id);

      if (!response.success) {
        throw new Error(response.message);
      }

      setIsWishlisted(response.action === "added");

      toast.success(
        response.action === "added"
          ? "Added to wishlist"
          : "Removed from wishlist",
        { position: "top-right", autoClose: 2000 }
      );
    } catch (error) {
      toast.error(
        error.message.includes("locale")
          ? "Language settings issue"
          : error.message || "Failed to update wishlist",
        { position: "top-right", autoClose: 3000 }
      );
    } finally {
      setIsTogglingWishlist(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#E0A75E" size={50} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20 text-red-500">
        Product not found or failed to load
      </div>
    );
  }

  return (
    <div className="">
      <section className="px-4 md:px-20 py-8">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/Home/Products")}
        >
          <IoIosArrowRoundBack size={25} color="#E0A75E" />
          <p className="text-primary text-16 underline">Back to menu</p>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          {/* Product Images */}
          <div className="lg:w-500px ">
            {/* Main Image */}
            <div className="bg-gray-50 rounded-lg p-10 mb-3 relative">
              {product.discount_percentage > 0 && (
                <p className="absolute top-3 left-3 rounded-full text-white bg-red-600 py-2 px-3 text-15">
                  -{product.discount_percentage}%
                </p>
              )}
              {product.stock > 0 ? (
                <p className="absolute bottom-3 left-3 rounded-full py-1 px-3 text-15 bg-yellow-300">
                  {product.stock} Left !
                </p>
              ) : (
                <p className="absolute bottom-3 left-3 rounded-full py-1 px-3 text-15 bg-red-400">
                  Out of stock
                </p>
              )}

              {mainImage && (
                <img
                  src={mainImage}
                  alt={product.name}
                  className="w-full h-auto lg:p-8 max-h-96 object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder-product.png";
                  }}
                />
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images?.length > 0 && (
              <div className="flex gap-2 overflow-x-auto py-2 px-2 bg-gray-50 border-1 border-gray-200 rounded-lg">
                {product.images.map((image) => (
                  <div
                    key={image.id}
                    className={`cursor-pointer border-2 bg-gray-50 ${
                      mainImage === image.src
                        ? "border-primary"
                        : "border-transparent"
                    } rounded-md`}
                    onClick={() => setMainImage(image.src)}
                  >
                    <img
                      src={image.src}
                      alt={`Thumbnail ${image.id}`}
                      className="w-16 h-16 object-cover rounded-md"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder-product.png";
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1">
            {/* product category */}
            <div className="flex flex-row-reverse justify-between items-center">
              <div>
                {/* Wishlist Button */}
                <button
                  className="p-2 rounded-full z-10"
                  onClick={handleWishlistToggle}
                  disabled={isTogglingWishlist}
                >
                  {isTogglingWishlist ? (
                    <ClipLoader size={22} color="#E0A75E" />
                  ) : isWishlisted ? (
                    <IoIosHeart size={27} className="text-red-500" />
                  ) : (
                    <IoIosHeartEmpty
                      size={27}
                      className=" hover:text-red-500"
                    />
                  )}
                </button>
              </div>

              <div>
                <p className="text-gray-600 text-16 mt-6">
                  {product.category?.name || "Category not specified"}
                </p>
                <h1 className="text-2xl font-bold mt-3">{product.name}</h1>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rate || 0)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rate !== null && product.rate !== undefined
                  ? `(${product.rate.toFixed(1)})`
                  : ""}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 mt-6">
              {product.price_after_discount &&
              product.price_after_discount !== product.price ? (
                <>
                  <span className="text-xl text-primary font-bold">
                    ${product.price_after_discount.toFixed(2)}
                  </span>
                  <span className="text-gray-500 text-15 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-xl text-primary font-bold">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* description */}
            <p className="text-gray-600 text-14 md:w-450 mt-6">
              {product.description || "No description available"}
            </p>

            {/* product colors select - You'll need to implement this based on your product data */}
            {product.colors?.length > 0 && (
              <div className="my-8">
                <p className="text-lg mb-2">Select Color</p>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.id}
                      className="w-8 h-8 rounded-full border-2 border-gray-200"
                      style={{ backgroundColor: color.hex_code }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* product sizes select - You'll need to implement this based on your product data */}
            {product.sizes?.length > 0 && (
              <div className="my-4">
                <p className="text-lg mb-2">Select Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size.id}
                      className={`px-4 py-2 border rounded-md ${
                        size.stock > 0
                          ? "border-gray-300 hover:border-primary"
                          : "border-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                      disabled={size.stock <= 0}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 my-8">
              <button
                className={`w-44 px-3 rounded-md border-2 border-primary text-primary py-4 text-17 font-bold transition-colors ${
                  product.stock > 0
                    ? "hover:bg-primary hover:text-white"
                    : "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
                }`}
                disabled={product.stock <= 0}
              >
                Add to cart
              </button>
              <button
                className={`px-3 w-44 bg-primary text-white rounded-md py-4 border-2 border-primary text-17 font-bold transition-colors ${
                  product.stock > 0
                    ? "hover:bg-primary-dark"
                    : "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
                }`}
                disabled={product.stock <= 0}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Client opinion section */}
      <UserRating productId={id} />

      {/* Related product */}
      <RelatedProduct currentProductId={id} categoryId={product.category?.id} />

      {/* quality section */}
      <Quality />
    </div>
  );
}

export default ViewProductDetails;
