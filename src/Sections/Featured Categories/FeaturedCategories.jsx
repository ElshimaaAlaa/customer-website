import { useEffect, useState } from "react";
import { getHomeData } from "../../ApiServices/Home";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
function FeaturedCategories() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await getHomeData();
        setFeaturedCategories(response.categories || []);
      } catch (error) {
        setError(error.message || "Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-8 md:py-10 lg:py-14">
      <h1 className="font-bold text-2xl mb-4 md:mb-5">{t("featuredCats")}</h1>

      <div className="mt-6 md:mt-7">
        {error ? (
          <div className="text-red-500 text-sm sm:text-base text-center py-10">
            {error}
          </div>
        ) : isLoading ? (
          <div className="flex justify-center py-10">
            <ClipLoader color="#E0A75E" size={30} />
          </div>
        ) : featuredCategories.length === 0 ? (
          <div className="text-gray-400 text-sm sm:text-base text-center py-10">
            No Featured Categories found.
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-10 gap-4 sm:gap-6">
            {featuredCategories.map((cat, index) => (
              <div key={cat.id || index} className="flex flex-col items-center">
                <div
                  onClick={() => navigate("/Home/Products")}
                  className="group cursor-pointer"
                >
                  <img
                    src={cat?.image}
                    alt={cat.name || "Category image"}
                    className="w-20 h-20 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full object-cover border-2 border-transparent group-hover:border-primary transition-all duration-300"
                  />
                </div>
                <p className="text-14 text-center mt-2">{cat.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FeaturedCategories;
