export default function ActiveFilters({
  searchTerm,
  setSearchTerm,
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange,
  products,
  minRating,
  setMinRating,
  hasActiveFilters,
  clearAllFilters,
  t,
}) {
  return (
    <div className="flex items-center justify-between mb-6 p-3 rounded-md">
      <div className="flex flex-wrap gap-2">
        {searchTerm && (
          <span className="bg-white px-3 py-1 rounded-full text-sm flex items-center border">
            {t("search")} : "{searchTerm}"
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
            {t("categories")}: {selectedCategories.length}
            <button
              onClick={() => setSelectedCategories([])}
              className="ml-1 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </span>
        )}
        {(priceRange[0] > 0 ||
          (products.length > 0 &&
            priceRange[1] < Math.max(...products.map((p) => p.price)))) && (
          <span className="bg-white px-3 py-1 rounded-full text-sm flex items-center border">
            {t("price")}: ${priceRange[0]} - ${priceRange[1]}
            <button
              onClick={() =>
                setPriceRange([0, Math.max(...products.map((p) => p.price))])
              }
              className="ml-1 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </span>
        )}
        {minRating > 0 && (
          <span className="bg-white px-3 py-1 rounded-full text-sm flex items-center border">
            {t("rating")}: {minRating}+
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
          {t("clearAll")}
        </button>
      )}
    </div>
  );
}
