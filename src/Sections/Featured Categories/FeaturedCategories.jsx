import { useEffect, useState } from "react";
import { getHomeData } from "../../ApiServices/Home";
import { ClipLoader } from "react-spinners";
function FeaturedCategories() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [featuredCategories, setFeaturedCategories] = useState([]);
  useEffect(() => {
    const fetchCatgories = async () => {
      setIsLoading(true);
      try {
        const response = await getHomeData();
        console.log(response);
        setIsLoading(false);
        setFeaturedCategories(response.categories);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchCatgories();
  }, []);
  return (
    <div className=" px-20 py-10">
      <h1 className="font-bold text-xl mb-3">Featured Categories</h1>
      <div>
        {error ? (
          <div className="text-red-500 text-15 text-center mt-10">
            Failed to fetch data. Please try again.
          </div>
        ) : isLoading ? (
          <div className="text-gray-400 text-center mt-10">
            <ClipLoader color="#E0A75E" />
          </div>
        ) : featuredCategories.length === 0 ? (
          <div className="text-gray-400 text-15 text-center mt-10">
            No Featured Categories founded.
          </div>
        ) : (
          <div className="flex items-center justify-between mt-5">
            {featuredCategories?.map((cat) => (
              <div>
                <div>
                  <img
                    src={cat?.image}
                    alt="category-image"
                    className="w-28 h-28 rounded-full"
                  />
                </div>
                <p className="text-13 text-center mt-1">{cat.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FeaturedCategories;
