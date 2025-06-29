import Header from "../../Components/Header/Header";
import { useEffect, useState, useMemo } from "react";
import { getProducts } from "../../ApiServices/Products";
import { ClipLoader } from "react-spinners";
import { Search } from "lucide-react";
import { getCategories } from "../../ApiServices/Categories";
import { Slider } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";
import { toggleWishlist } from "../../ApiServices/ToggleWishlist";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [isToggling, setIsToggling] = useState({});
  const navigate = useNavigate();
  const productsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [productData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        setProducts(productData);
        if (productData.length > 0) {
          const maxPrice = Math.max(...productData.map((p) => p.price));
          setPriceRange([0, Math.ceil(maxPrice)]);
        }
        setCategories(categoriesData);
        
        // Initialize wishlist items from product data
        const initialWishlist = productData
          .filter(product => product.is_fav)
          .map(product => product.id);
        setWishlistItems(initialWishlist);
      } catch (error) {
        console.error(error);
        setError(true);
        toast.error("Failed to load products", {
          position: "top-right",
          autoClose: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleWishlistToggle = async (productId) => {
    setIsToggling((prev) => ({ ...prev, [productId]: true }));
    try {
      const response = await toggleWishlist(productId);
      
      if (!response.success) {
        throw new Error(response.message);
      }

      setWishlistItems(prev => 
        response.action === "added" 
          ? [...prev, productId] 
          : prev.filter(id => id !== productId)
      );

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
      setIsToggling((prev) => ({ ...prev, [productId]: false }));
    }
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchTerm) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((product) =>
        selectedCategories.includes(product.category?.id)
      );
    }

    // Price filter
    result = result.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Rating filter
    if (minRating > 0) {
      result = result.filter((product) => (product.rating || 0) >= minRating);
    }

    // Sorting
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
  }, [products, searchTerm, selectedCategories, priceRange, minRating, sortOption]);

  // Handle category selection
  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
    setCurrentPage(1);
  };

  // Handle price range change
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    setCurrentPage(1);
  };

  // Handle rating filter
  const handleRatingChange = (rating) => {
    setMinRating(rating === minRating ? 0 : rating);
    setCurrentPage(1);
  };

  // Clear all filters
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

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Check if any filters are active
  const hasActiveFilters =
    searchTerm ||
    selectedCategories.length > 0 ||
    priceRange[0] > 0 ||
    (products.length > 0 && priceRange[1] < Math.max(...products.map((p) => p.price))) ||
    minRating > 0;

  return (
    <div className="products-page">
      <Header />
      <div className="px-4 lg:px-20 py-10 flex flex-col lg:flex-row gap-8">
        {/* Filters sidebar */}
        <section className="w-330 border-1 border-gray-200 rounded-xl p-6">
          <h3 className="font-bold text-2xl mb-4">Find Your Needs</h3>
          <div className="border-b-1 border-gray-200 mb-8"></div>
          
          {/* Search */}
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-5">Search</h3>
            <div className="relative w-full">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5"
                color="#E0A75E"
              />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full h-12 pl-10 pr-4 py-5 bg-muted/50 rounded-lg text-sm focus:outline-none border-2 border-gray-200 bg-gray-50 placeholder:text-13 focus:border-primary"
              />
            </div>
          </div>

          {/* Sort by */}
          <div className="mb-8">
            <h3 className="font-bold text-lg my-4">Sort by</h3>
            <ul className="grid grid-cols-2 gap-2">
              {[
                { id: "recent", label: "Most Recent" },
                { id: "popular", label: "Popular" },
                { id: "priceHigh", label: "Price High" },
                { id: "priceLow", label: "Price Low" },
              ].map((option) => (
                <li
                  key={option.id}
                  className={`rounded-md p-3 text-15 text-center cursor-pointer transition-colors ${
                    sortOption === option.id
                      ? "bg-primary text-white"
                      : "text-gray-400 border border-gray-200 bg-gray-50 hover:bg-gray-100"
                  }`}
                  onClick={() => setSortOption(option.id)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h3 className="font-bold text-lg my-3">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id} className="flex items-center">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleCategoryToggle(category.id)}
                      className="appearance-none h-5 w-5 border border-gray-300 rounded mr-2 
                      checked:bg-primary checked:border-primary
                      focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    {selectedCategories.includes(category.id) && (
                      <svg
                        className="absolute left-0 w-5 h-5 text-white pointer-events-none"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <label
                    htmlFor={`category-${category.id}`}
                    className="text-gray-600 cursor-pointer text-16 select-none"
                  >
                    {category.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Price */}
          <div className="mb-8">
            <h3 className="font-bold text-lg my-3">Price</h3>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={priceRange[1]}
              step={10}
              sx={{
                color: "#E0A75E",
                "& .MuiSlider-thumb": {
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: "0px 0px 0px 8px rgba(224, 167, 94, 0.16)",
                  },
                },
              }}
            />
            <div className="flex justify-between text-16">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          {/* Rating */}
          <div className="mb-8">
            <h3 className="font-bold text-lg my-3">Rate</h3>
            <div className="flex flex-col space-y-2">
              {[4, 3, 2, 1, 0].map((rating) => (
                <div
                  key={rating}
                  className={`flex items-center p-2 bg-gray-50 text-gray-400 cursor-pointer border border-gray-100 rounded-md ${
                    minRating === rating
                      ? "bg-primary/10 border border-primary"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleRatingChange(rating)}
                >
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm">
                    {rating === 0 ? "0-1 Stars" : `${rating}+ Stars`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products section */}
        <section className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-2xl mt-5">Products</h3>
            <p className="text-sm text-gray-600">
              Showing {indexOfFirstProduct + 1}-
              {Math.min(indexOfLastProduct, filteredProducts.length)} of{" "}
              {filteredProducts.length} items
            </p>
          </div>

          {/* Active filters */}
          <div className="flex items-center justify-between mb-6 p-3 rounded-md">
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <span className="bg-white px-3 py-1 rounded-full text-sm flex items-center border">
                  Search: "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm("")}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedCategories.length > 0 && (
                <span className="bg-white px-3 py-1 rounded-full text-sm flex items-center border">
                  Categories: {selectedCategories.length}
                  <button
                    onClick={() => setSelectedCategories([])}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </span>
              )}
              {(priceRange[0] > 0 ||
                (products.length > 0 && priceRange[1] < Math.max(...products.map((p) => p.price)))) && (
                <span className="bg-white px-3 py-1 rounded-full text-sm flex items-center border">
                  Price: ${priceRange[0]} - ${priceRange[1]}
                  <button
                    onClick={() =>
                      setPriceRange([
                        0,
                        Math.max(...products.map((p) => p.price)),
                      ])
                    }
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </span>
              )}
              {minRating > 0 && (
                <span className="bg-white px-3 py-1 rounded-full text-sm flex items-center border">
                  Rating: {minRating}+
                  <button
                    onClick={() => setMinRating(0)}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-sm underline text-primary hover:text-primary-dark"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Products grid */}
          {error ? (
            <div className="text-red-500 text-center mt-10">
              Failed to fetch data. Please try again.
            </div>
          ) : isLoading ? (
            <div className="flex justify-center items-center h-64">
              <ClipLoader color="#E0A75E" size={50} />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-15">
                No products match your filters.
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-4 text-14 px-3 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {currentProducts.map((product) => (
                  <div key={product.id} className="rounded-lg group relative">
                    {/* Wishlist button */}
                    <button
                      className="absolute top-1 right-1 p-2 rounded-full  z-10 "
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWishlistToggle(product.id);
                      }}
                      disabled={isToggling[product.id]}
                    >
                      {isToggling[product.id] ? (
                        <ClipLoader size={16} color="#E0A75E" />
                      ) : wishlistItems.includes(product.id) ? (
                        <IoIosHeart size={27} className="text-red-500" />
                      ) : (
                        <IoIosHeartEmpty
                          size={27}
                          className="text-black "
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
                          {product.stock} Left !
                        </p>
                      ) : (
                        <p className="absolute bottom-3 left-3 px-3 py-1 text-15 bg-red-400 text-white rounded-full">
                          Out of stock
                        </p>
                      )}
                      <div className="h-full flex justify-center items-center p-7">
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
                    <div className="p-3">
                      <h3 
                        className="font-bold text-lg mt-2 transition-colors cursor-pointer"
                        onClick={() => navigate(`/Home/Products/${product.id}`)}
                      >
                        {product.name}
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
                        {product.price_after_discount && product.price_after_discount !== product.price ? (
                          <>
                            <span className="text-lg font-bold text-primary">
                              ${product.price_after_discount.toFixed(2)}
                            </span>
                            <span className="text-15 font-light text-gray-400 line-through">
                              ${product.price.toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-bold text-primary">
                            ${product.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <button 
                          className={`flex-1 rounded-md border-2 border-primary py-3 text-17 font-bold transition-colors ${
                            product.stock === 0
                              ? "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
                              : "text-primary hover:bg-primary hover:text-white"
                          }`}
                          disabled={product.stock === 0}
                        >
                          Add To Cart
                        </button>
                        <button 
                          className={`flex-1 rounded-md border-2 py-3 text-17 font-bold transition-colors ${
                            product.stock === 0
                              ? "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
                              : "bg-primary text-white border-primary hover:bg-primary-dark"
                          }`}
                          disabled={product.stock === 0}
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-10">
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(event, page) => setCurrentPage(page)}
                    color="primary"
                    sx={{
                      "& .MuiPaginationItem-root": {
                        color: "#E0A75E",
                        borderColor: "#E0A75E",
                      },
                      "& .MuiPaginationItem-root.Mui-selected": {
                        backgroundColor: "#E0A75E",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#D19B54",
                        },
                      },
                      "& .MuiPaginationItem-root:hover": {
                        backgroundColor: "#F5E9D9",
                      },
                    }}
                  />
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default Products;