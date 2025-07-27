import { Slider } from "@mui/material";
import { Search } from "lucide-react";

export default function FiltersSidebar({
  searchTerm,
  setSearchTerm,
  setCurrentPage,
  t,
  sortOption,
  setSortOption,
  categories,
  selectedCategories,
  handleCategoryToggle,
  priceRange,
  handlePriceChange,
  minRating,
  handleRatingChange,
}) {
  return (
    <section className="w-330 border-1 border-gray-200 rounded-xl p-6">
      <h3 className="font-bold text-2xl mb-4 rtl:text-[20px]">{t("findNeeds")}</h3>
      <div className="border-b-1 border-gray-200 mb-8"></div>

      <div className="mb-8">
        <h3 className="font-bold text-lg mb-5 rtl:text-[17px]">{t("search")}</h3>
        <div className="relative w-full">
          <Search
            className="absolute left-3 rtl:right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5"
            color="#E0A75E"
          />
          <input
            type="text"
            placeholder={t("search")}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full h-12 pl- rtl:pr-10 rtl:text-[16px] pr-4 py-5 bg-muted/50 rounded-lg text-sm focus:outline-none border-2 border-gray-200 bg-gray-50 placeholder:text-13 focus:border-primary"
          />
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-bold text-lg my-4">{t("sortBy")} : </h3>
        <ul className="grid grid-cols-2 gap-2">
          {[
            { id: "recent", label: t("mostRecent") },
            { id: "popular", label: t("popular") },
            { id: "priceHigh", label: t("priceHigh") },
            { id: "priceLow", label: t("priceLow") },
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

      <div className="mb-8">
        <h3 className="font-bold text-lg my-3">{t("categories")}</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.id} className="flex items-center">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category.id}`}
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleCategoryToggle(category.id)}
                  className="appearance-none h-5 w-5 border border-gray-300 rounded mr-2 rtl:ml-2 
                  checked:bg-primary checked:border-primary
                  focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {selectedCategories.includes(category.id) && (
                  <svg
                    className="absolute left-0 w-5 h-5 rtl:right-2 text-white pointer-events-none"
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

      <div className="mb-8">
        <h3 className="font-bold text-lg my-3">{t("price")}</h3>
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

      <div className="mb-8">
        <h3 className="font-bold text-lg my-3">{t("rate")}</h3>
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
              <span className="text-sm rtl:mr-2">
                {rating === 0
                  ? `0-1  ${t("star")}`
                  : `${rating} + ${t("star")}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
