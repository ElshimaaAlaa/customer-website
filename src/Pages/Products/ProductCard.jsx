import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
export default function ProductCard({
  product,
  wishlistItems,
  handleWishlistToggle,
  addToCart,
  cart,
  navigate,
  t,
  isRTL,
  getTranslatedField,
}) {
  return (
    <div className="rounded-lg group relative">
      <button
        className="absolute top-1 right-1 p-2 rounded-full z-10 hover:bg-gray-100 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          handleWishlistToggle(product.id);
        }}
      >
        {wishlistItems.includes(product.id) ? (
          <IoIosHeart size={27} className="text-red-500" />
        ) : (
          <IoIosHeartEmpty
            size={27}
            className="text-gray-600 hover:text-red-500"
          />
        )}
      </button>

      <div
        className="relative bg-gray-50 border-1 border-gray-100 rounded-lg h-64 cursor-pointer"
        onClick={() => navigate(`/Home/Products/${product.id}`)}
      >
        {product.discount_percentage > 0 && (
          <div className="absolute top-3 left-3 px-3 py-1 text-15 bg-red-600 text-white rounded-full">
            -{product.discount_percentage}%
          </div>
        )}
        {product.stock > 0 ? (
          <p className="absolute bottom-3 left-3 px-3 py-1 text-15 bg-yellow-300 rounded-full">
            {product.stock} {t("left")}
          </p>
        ) : (
          <p className="absolute bottom-3 left-3 px-3 py-1 text-15 bg-red-400 text-white rounded-full">
            {t("outOfStock")}
          </p>
        )}
        <div className="h-full flex justify-center items-center p-7">
          {product.images?.[0]?.src && (
            <img
              src={product.images[0].src || "/assets/images/product.png"}
              alt={product.name}
              className="max-h-full max-w-full object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/assets/images/product.png";
              }}
            />
        )}
        </div>
      </div>
      <div className="p-3">
        <h3
          className="font-bold text-lg mt-2 transition-colors cursor-pointer"
          onClick={() => navigate(`/Home/Products/${product.id}`)}
        >
          {getTranslatedField(product, "name")}
        </h3>
        <div className="flex items-center gap-2 mt-1">
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
        <div className="flex items-center gap-2 mt-2">
          {isRTL ? (
            <>
              <span className="text-15 font-light text-gray-400 line-through">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-lg font-bold text-primary">
                ${product.price_after_discount.toFixed(2)}
              </span>
            </>
          ) : (
            <>
              <span className="text-lg font-bold text-primary">
                ${product.price_after_discount.toFixed(2)}
              </span>
              <span className="text-15 font-light text-gray-400 line-through">
                ${product.price.toFixed(2)}
              </span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2 mt-3">
          {cart.getProductQuantity(product) === 0 ? (
            <button
              className={`flex-1 rounded-md border-2 border-primary py-2 text-17 font-bold transition-colors ${
                product.stock === 0
                  ? "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
                  : "text-primary hover:bg-primary hover:text-white"
              }`}
              disabled={product.stock === 0}
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
            >
              {t("addToCart")}
            </button>
          ) : (
            <div className="flex flex-1 justify-between items-center border-2 border-primary rounded-md overflow-hidden">
              <button
                className="w-10 h-10 text-gray-500 font-bold text-xl hover:bg-primary-dark"
                onClick={(e) => {
                  e.stopPropagation();
                  cart.RemoveProductFromCart(product.id);
                }}
              >
                −
              </button>
              <span className="flex-1 text-center text-17 font-bold">
                {cart.getProductQuantity(product)}
              </span>
              <button
                className="w-10 h-10 text-gray-500 font-bold text-xl hover:bg-primary-dark"
                onClick={(e) => {
                  e.stopPropagation();
                  cart.AddProductToCart(product);
                }}
              >
                +
              </button>
            </div>
          )}

          <button
            className={`flex-1 rounded-md border-2 py-2 text-17 font-bold transition-colors disabled:opacity-30 ${
              product.stock === 0
                ? "bg-gray-200 text-gray-500 border-gray-300 "
                : "bg-primary text-white border-primary hover:bg-primary-dark"
            }`}
            disabled
          >
            {t("buyNow")}
          </button>
        </div>
      </div>
    </div>
  );
}