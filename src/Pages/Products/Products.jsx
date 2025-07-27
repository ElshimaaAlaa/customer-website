import Header from "../../Components/Header/Header";
import { useEffect, useState, useMemo, useContext } from "react";
import { getProducts } from "../../ApiServices/Products";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { toggleWishlist } from "../../ApiServices/ToggleWishlist";
import { useTranslation } from "react-i18next";
import { CartContext } from "../../Cart Context/CartContext";
import FiltersSidebar from "./FiltersSidebar";
import ProductCard from "./ProductCard";
import ActiveFilters from "./ActiveFilters";
import ProductsPagination from "./ProductsPagination";
import { getCategories } from "../../ApiServices/Categories";
import SuccessModal from "../../Components/Modal/Success Modal/SuccessModal";
import AuthModal from "../../Components/Modal/Success Modal/AuthModal";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minRating, setMinRating] = useState(0);
  const [sortOption, setSortOption] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();
  const productsPerPage = 6;
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  const cart = useContext(CartContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("user token");
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [productData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        setProducts(productData);

        const maxPrice = Math.max(...productData.map((p) => p.price));
        setPriceRange([0, Math.ceil(maxPrice)]);
        setCategories(categoriesData);

        const storedWishlist = localStorage.getItem("wishlistItems");
        if (storedWishlist) {
          setWishlistItems(JSON.parse(storedWishlist));
        }
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    setIsLoggedIn(!!token);
    setIsRTL(i18n.language === "ar");
  }, [i18n.language, token]);

  const handleWishlistToggle = async (productId) => {
    if (!isLoggedIn) {
      setShowModal(true);
      return;
    }
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
    if (!isLoggedIn) {
      setShowModal(true);
      return;
    }
    cart.AddProductToCart(product);
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchTerm) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter(
        (product) =>
          product.category && selectedCategories.includes(product.category.id)
      );
    }

    result = result.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (minRating > 0) {
      result = result.filter((product) => (product.rate || 0) >= minRating);
    }

    switch (sortOption) {
      case "recent":
        result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case "popular":
        result.sort((a, b) => (b.rate || 0) - (a.rate || 0));
        break;
      case "priceHigh":
        result.sort((a, b) => b.price - a.price);
        break;
      case "priceLow":
        result.sort((a, b) => a.price - b.price);
        break;
      default:
        break;
    }

    return result;
  }, [
    products,
    searchTerm,
    selectedCategories,
    priceRange,
    minRating,
    sortOption,
  ]);

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
    setCurrentPage(1);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    setCurrentPage(1);
  };

  const handleRatingChange = (rating) => {
    setMinRating(rating === minRating ? 0 : rating);
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    if (products.length > 0) {
      setPriceRange([0, Math.max(...products.map((p) => p.price))]);
    }
    setMinRating(0);
    setSortOption("recent");
    setCurrentPage(1);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const hasActiveFilters =
    searchTerm ||
    selectedCategories.length > 0 ||
    priceRange[0] > 0 ||
    (products.length > 0 &&
      priceRange[1] < Math.max(...products.map((p) => p.price))) ||
    minRating > 0;

  const getTranslatedField = (product, field) => {
    const language = i18n.language;
    const fieldName = `${field}_${language.split("-")[0]}`;
    return product[fieldName] || product[field] || "";
  };

  return (
    <div className="products-page">
      <Header />
      <div className="px-4 lg:px-20 py-10 flex flex-col lg:flex-row gap-8">
        <FiltersSidebar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setCurrentPage={setCurrentPage}
          t={t}
          sortOption={sortOption}
          setSortOption={setSortOption}
          categories={categories}
          selectedCategories={selectedCategories}
          handleCategoryToggle={handleCategoryToggle}
          priceRange={priceRange}
          handlePriceChange={handlePriceChange}
          minRating={minRating}
          handleRatingChange={handleRatingChange}
        />

        <section className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-2xl mt-5">{t("products")}</h3>
            <p className="text-sm text-gray-600">
              {t("showing")} {indexOfFirstProduct + 1}-
              {Math.min(indexOfLastProduct, filteredProducts.length)} {t("of")}{" "}
              {filteredProducts.length} {t("items")}
            </p>
          </div>

          <ActiveFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            products={products}
            minRating={minRating}
            setMinRating={setMinRating}
            hasActiveFilters={hasActiveFilters}
            clearAllFilters={clearAllFilters}
            t={t}
          />

          {error ? (
            <div className="text-red-500 text-center mt-10">{t("error")}</div>
          ) : isLoading ? (
            <div className="flex justify-center items-center h-64">
              <ClipLoader color="#E0A75E" size={50} />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-15 rtl:text-[19px]">
                {t("noSearchResults")}
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-4 text-14 px-3 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
              >
                {t("clearFilters")}
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {currentProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    wishlistItems={wishlistItems}
                    handleWishlistToggle={handleWishlistToggle}
                    addToCart={addToCart}
                    cart={cart}
                    navigate={navigate}
                    t={t}
                    isRTL={isRTL}
                    getTranslatedField={getTranslatedField}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <ProductsPagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  isRTL={isRTL}
                />
              )}
            </>
          )}
        </section>
      </div>
      <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <AuthModal initialMode="login" onClose={() => setShowModal(false)} />
      </SuccessModal>
    </div>
  );
}
export default Products;
