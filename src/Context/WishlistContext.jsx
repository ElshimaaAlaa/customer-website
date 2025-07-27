import { createContext, useState, useContext, useEffect } from "react";
import { getWishListData } from "../ApiServices/Wishlist";
const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("user token");
      setIsLoggedIn(!!token);

      if (token) {
        const response = await getWishListData();
        setWishlistCount(response.length);
      } else {
        setWishlistCount(0);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setWishlistCount(0);
    }
  };

  useEffect(() => {
    fetchWishlist();

    const handleStorageChange = () => {
      fetchWishlist();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const updateWishlist = (newCount) => {
    setWishlistCount(newCount);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlistCount, updateWishlist, isLoggedIn }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
