import { useNavigate, useLocation } from "react-router-dom";
import { CiSearch, CiMenuBurger } from "react-icons/ci";
import { GoHeart } from "react-icons/go";
import { GrCart } from "react-icons/gr";
import { MdClose } from "react-icons/md";
import UserAcc from "../../Profile/User Acc/UserAcc";
import { useEffect, useState } from "react";
import { getWishListData } from "../../ApiServices/Wishlist";
import { useTranslation } from 'react-i18next';

function BottomSection({ onLanguageChange, currentLanguage }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [wishlistData, setWishlistData] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { t } = useTranslation();
  
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const fetchProductNumInWishlist = async () => {
      try {
        const response = await getWishListData();
        setWishlistData(response);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };
    fetchProductNumInWishlist();
  }, []);

  const navItems = [
    { path: "/Home/Homepage", name: t('home') },
    { path: "/Home/Products", name: t('products') },
    { path: "/Home/Faqs", name: t('faqs') },
    { path: "/Home/AboutUs", name: t('aboutUs') },
    { path: "/Home/ContactUs", name: t('contactUs') },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-20 sm:py-5 relative bg-white border-b-1 border-gray-100">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => navigate("/Home/HomePage")}
          className="cursor-pointer mb-2"
        >
          <img
            src="/assets/svgs/vertex.svg"
            alt="logo"
            className="w-32 sm:w-40 lg:w-40"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="list-none flex items-center gap-4 lg:gap-6 text-sm lg:text-base">
            {navItems.map((item) => (
              <li
                key={item.path}
                className={`cursor-pointer px-1 py-2 ${
                  isActive(item.path)
                    ? "text-primary font-semibold border-b-3 border-primary"
                    : "text-gray-400 hover:text-primary"
                }`}
                onClick={() => navigate(item.path)}
              >
                {item.name}
              </li>
            ))}
            
            {/* Language Switcher */}
            <li className="flex items-center gap-2 ml-4">
              <button 
                onClick={() => onLanguageChange('en')} 
                className={`text-sm ${currentLanguage === 'en' ? 'font-bold text-primary' : 'text-gray-400'}`}
              >
                EN
              </button>
              <span className="text-gray-300">|</span>
              <button 
                onClick={() => onLanguageChange('ar')} 
                className={`text-sm ${currentLanguage === 'ar' ? 'font-bold text-primary' : 'text-gray-400'}`}
              >
                AR
              </button>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <CiSearch
            size={22}
            className="cursor-pointer"
            onClick={() => setSearchOpen(!searchOpen)}
          />
          <CiMenuBurger
            size={24}
            className="cursor-pointer"
            onClick={() => setMobileMenuOpen(true)}
          />
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          <div className="flex gap-3 items-center">
            <CiSearch size={25} className="cursor-pointer hover:text-primary" />
            <div className="relative">
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                {wishlistData.length || 0}
              </span>
              <GoHeart
                size={25}
                className="cursor-pointer hover:text-primary"
                onClick={() => navigate("/Home/WishList")}
              />
            </div>
            <GrCart size={22} className="cursor-pointer hover:text-primary" onClick={()=>navigate('Cart')}/>
          </div>
          <UserAcc />
        </div>

        {/* Mobile Search */}
        {searchOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white px-4 py-3 shadow-md z-10">
            <input
              type="text"
              placeholder={t('navbar.search_placeholder')}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="bg-white h-full w-4/5 max-w-sm ml-auto p-6 overflow-y-auto">
            <div className="flex justify-end mb-6">
              <MdClose
                size={24}
                className="cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              />
            </div>

            <ul className="space-y-4">
              {navItems.map((item) => (
                <li
                  key={item.path}
                  className={`text-lg py-2 px-3 ${
                    isActive(item.path)
                      ? "text-primary font-bold bg-primary bg-opacity-10 rounded"
                      : "text-gray-700"
                  }`}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                >
                  {item.name}
                </li>
              ))}
              
              {/* Mobile Language Switcher */}
              <li className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-200">
                <span className="text-gray-500">{t('navbar.language')}:</span>
                <button 
                  onClick={() => { onLanguageChange('en'); setMobileMenuOpen(false); }} 
                  className={`px-3 py-1 rounded ${currentLanguage === 'en' ? 'bg-primary text-white' : 'bg-gray-100'}`}
                >
                  English
                </button>
                <button 
                  onClick={() => { onLanguageChange('ar'); setMobileMenuOpen(false); }} 
                  className={`px-3 py-1 rounded ${currentLanguage === 'ar' ? 'bg-primary text-white' : 'bg-gray-100'}`}
                >
                  العربية
                </button>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <div className="relative">
                  {wishlistData.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                      {wishlistData.length}
                    </span>
                  )}
                  <GoHeart
                    size={22}
                    className="cursor-pointer"
                    onClick={() => {
                      navigate("/Home/WishList");
                      setMobileMenuOpen(false);
                    }}
                  />
                </div>
                <GrCart size={20} className="cursor-pointer"  onClick={()=>navigate('Cart')}/>
                <UserAcc />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BottomSection;