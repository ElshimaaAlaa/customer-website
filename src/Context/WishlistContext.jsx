import { createContext, useState, useContext, useEffect } from "react";
import { getWishListData } from "../ApiServices/Wishlist";
import { toggleWishlist } from "../ApiServices/ToggleWishlist";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("user token");
      setIsLoggedIn(!!token);

      if (token) {
        const response = await getWishListData();
        setWishlistItems(response || []);
        setWishlistCount(response.length);
      } else {
        setWishlistItems([]);
        setWishlistCount(0);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setWishlistItems([]);
      setWishlistCount(0);
    }
  };

  const handleToggleWishlist = async (productId) => {
    try {
      const result = await toggleWishlist(productId);
      if (result.success) {
        // تحديث القائمة بعد التغيير
        await fetchWishlist();
        return true;
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    }
    return false;
  };

  useEffect(() => {
    fetchWishlist();

    // الاستماع للتغييرات في localStorage
    const handleStorageChange = () => {
      fetchWishlist();
    };

    window.addEventListener("storage", handleStorageChange);
    
    // أيضًا نتحقق من التغييرات كل بضع ثوانٍ للاحتياط
    const interval = setInterval(fetchWishlist, 5000);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const updateWishlist = (newCount) => {
    setWishlistCount(newCount);
  };

  return (
    <WishlistContext.Provider
      value={{ 
        wishlistCount, 
        wishlistItems,
        updateWishlist, 
        isLoggedIn,
        fetchWishlist,
        toggleWishlistItem: handleToggleWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);