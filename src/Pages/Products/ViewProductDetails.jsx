import { useContext, useEffect, useState, useCallback } from "react";
import Quality from "../../Sections/Quality Section/Quality";
import {
  IoIosArrowRoundBack,
  IoIosArrowRoundForward,
  IoIosHeart,
  IoIosHeartEmpty,
} from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import UserRating from "./UserRating";
import RelatedProduct from "./RelatedProduct";
import axios from "axios";
import { toggleWishlist } from "../../ApiServices/ToggleWishlist";
import { ClipLoader } from "react-spinners";
import { useTranslation } from "react-i18next";
import { CartContext } from "../../Context/CartContext";

function ViewProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState([]);
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  const cart = useContext(CartContext);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const fetchProductDetail = useCallback(async () => {
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
      setMainImage(response.data.data.images?.[0]?.src || "");
      setSelectedColor(null);
      setSelectedSize(null);

      const storedWishlist = localStorage.getItem("wishlistItems");
      if (storedWishlist) {
        setWishlistItems(JSON.parse(storedWishlist));
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProductDetail();
    setIsRTL(i18n.language === "ar");
  }, [fetchProductDetail, i18n.language]);

  const getTranslatedField = (product, field) => {
    const language = i18n.language;
    const fieldName = `${field}_${language.split("-")[0]}`;
    return product[fieldName] || product[field] || "";
  };

  const handleWishlistToggle = async (productId) => {
    try {
      const isInWishlist = wishlistItems.includes(productId);
      const updatedWishlist = isInWishlist
        ? wishlistItems.filter((id) => id !== productId)
        : [...wishlistItems, productId];

      setWishlistItems(updatedWishlist);
      localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));

      const response = await toggleWishlist(productId);
      if (!response.success) {
        throw new Error(response.message || t("wishlistUpdateError"));
      }
    } catch (error) {
      setWishlistItems((prev) =>
        prev.includes(productId)
          ? prev.filter((id) => id !== productId)
          : [...prev, productId]
      );
    }
  };

  const addToCart = (product) => {
    // Create a product object with selected options
    const productWithOptions = {
      ...product,
      selectedColor,
      selectedSize,
    };

    cart.AddProductToCart(productWithOptions);
  };

  // Function to handle color selection with toggle behavior
  const handleColorSelect = (color) => {
    if (selectedColor?.id === color.id) {
      // If the same color is clicked again, deselect it
      setSelectedColor(null);
    } else {
      // Otherwise select the new color
      setSelectedColor(color);
    }
  };

  // Function to handle size selection with toggle behavior
  const handleSizeSelect = (size) => {
    if (size.stock <= 0) return; // Don't allow selection if out of stock

    if (selectedSize?.id === size.id) {
      // If the same size is clicked again, deselect it
      setSelectedSize(null);
    } else {
      // Otherwise select the new size
      setSelectedSize(size);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <ClipLoader color="#E0A75E" size={35} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20 text-red-500 h-[50vh]">
        {t("error")}
      </div>
    );
  }

  const isWishlisted = wishlistItems.includes(product.id);
  const productQuantity = cart.getProductQuantity(product);

  return (
    <div className="">
      <section className="px-4 md:px-20 py-8">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/Home/Products")}
        >
          {isRTL ? (
            <IoIosArrowRoundForward size={25} color="#E0A75E" />
          ) : (
            <IoIosArrowRoundBack size={25} color="#E0A75E" />
          )}
          <p className="text-primary text-16 underline">{t("backToMenu")}</p>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          {/* Product Images */}
          <div className="lg:w-500px">
            {/* Main Image */}
            <div className="bg-gray-50 rounded-lg p-10 mb-3 relative">
              {product.discount_percentage > 0 && (
                <p className="absolute top-3 left-3 rounded-full text-white bg-red-600 py-2 px-3 text-15">
                  {isRTL ? (
                    <> {product.discount_percentage}% -</>
                  ) : (
                    <>-{product.discount_percentage} %</>
                  )}
                </p>
              )}
              {product.stock > 0 ? (
                <p className="absolute bottom-3 left-3 rounded-full py-1 px-3 text-15 bg-yellow-300">
                  {product.stock} {t("left")}
                </p>
              ) : (
                <p className="absolute bottom-3 left-3 rounded-full py-1 px-3 text-15 bg-red-400">
                  {t("outOfStock")}
                </p>
              )}

              <img
                src={mainImage || "/assets/images/product.png"}
                alt={product.name}
                className="w-full h-auto lg:p-8 max-h-96 object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/assests/images/product.png";
                }}
              />
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
            <div className="flex flex-row-reverse justify-end gap-56 items-center">
              <div>
                <button
                  className="p-2 rounded-full z-10"
                  onClick={() => handleWishlistToggle(product.id)}
                  aria-label={
                    isWishlisted ? t("removeFromWishlist") : t("addToWishlist")
                  }
                >
                  {isWishlisted ? (
                    <IoIosHeart size={27} className="text-red-500" />
                  ) : (
                    <IoIosHeartEmpty
                      size={27}
                      className="text-black hover:text-red-500"
                    />
                  )}
                </button>
              </div>

              <div>
                <p className="text-gray-600 text-16 mt-6">
                  {product.category?.name || t("noCat")}
                </p>
                <h1 className="text-xl font-bold mt-3">
                  {getTranslatedField(product, "name")}
                </h1>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 mt-6">
              {product.price_after_discount && (
                <>
                  {isRTL ? (
                    <>
                      <span className="text-gray-500 text-15 mt-1 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-xl text-primary font-bold">
                        ${product.price_after_discount.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-xl text-primary font-bold">
                        ${product.price_after_discount.toFixed(2)}
                      </span>
                      <span className="text-gray-500 text-15 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                    </>
                  )}
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-14 md:w-450 mt-6">
              {product.description || t("noDescription")}
            </p>

            {/* Product Colors */}
            {product.colors?.length > 0 && (
              <div className="my-8">
                <p className="text-17 mb-2">{t("selectColor")}</p>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.id}
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                        selectedColor?.id === color.id
                          ? "border-primary border-2"
                          : "border-gray-200"
                      }`}
                      style={{ backgroundColor: color.hex_code }}
                      title={color.name}
                      aria-label={color.name}
                      onClick={() => handleColorSelect(color)}
                    >
                      {selectedColor?.id === color.id && (
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Product Sizes */}
            {product.sizes?.length > 0 && (
              <div className="my-8">
                <p className="text-15 mb-2">{t("selectSize")}</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size.id}
                      className={`px-4 py-2 border rounded-md font-medium transition-all ${
                        size.stock > 0
                          ? selectedSize?.id === size.id
                            ? " bg-gray-600 text-white shadow-md"
                            : "border-gray-300 bg-gray-50 hover:border-primary hover:bg-gray-100"
                          : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                      disabled={size.stock <= 0}
                      aria-label={`${size.name} ${
                        size.stock <= 0 ? t("outOfStock") : ""
                      }`}
                      onClick={() => handleSizeSelect(size)}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-2 mt-3 md:w-400 lg:w-400">
              {productQuantity === 0 ? (
                <button
                  className={`flex-1 rounded-md border-2 bg-primary text-white border-primary py-2 text-17 font-bold transition-colors 
                   `}
                  // disabled
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  aria-label={t("addToCart")}
                >
                  {t("addToCart")}
                </button>
              ) : (
                <div className="flex flex-1 justify-between items-center border-2 border-primary rounded-md overflow-hidden">
                  <button
                    className="w-10 h-10 text-gray-500 font-bold text-xl hover:bg-primary-dark "
                    onClick={(e) => {
                      e.stopPropagation();
                      cart.RemoveProductFromCart(product.id);
                    }}
                    aria-label={t("decreaseQuantity")}
                  >
                    −
                  </button>
                  <span className="flex-1 text-center text-17 font-bold">
                    {productQuantity}
                  </span>
                  <button
                    className="w-10 h-10 text-gray-500 font-bold text-xl hover:bg-primary-dark "
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    aria-label={t("increaseQuantity")}
                  >
                    +
                  </button>
                </div>
              )}

              <button
                className={`flex-1 rounded-md border-2 py-2 bg-primary text-white text-17 font-bold transition-colors  disabled:bg-primary disabled:opacity-30 disabled:text-white`}
                disabled
                aria-label={t("buyNow")}
              >
                {t("buyNow")}
              </button>
            </div>
          </div>
        </div>
      </section>
      <UserRating productId={id} />
      <RelatedProduct currentProductId={id} categoryId={product.category?.id} />
      <Quality />
    </div>
  );
}
export default ViewProductDetails;