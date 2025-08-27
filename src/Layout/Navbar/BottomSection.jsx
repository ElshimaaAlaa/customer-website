import { useNavigate, useLocation } from "react-router-dom";
import { CiSearch, CiMenuBurger } from "react-icons/ci";
import { GoHeart } from "react-icons/go";
import { GrCart } from "react-icons/gr";
import { MdClose } from "react-icons/md";
import UserAcc from "../../Profile/User Acc/UserAcc";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useWishlist } from "../../Context/WishlistContext";

function BottomSection({ onLanguageChange, currentLanguage }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Add safety check for context
  const wishlistContext = useWishlist();
  const { wishlistCount = 0, isLoggedIn = false } = wishlistContext || {};
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [mobileLanguageDropdownOpen, setMobileLanguageDropdownOpen] = useState(false);
  const { t } = useTranslation();
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    // استعادة اللغة المحفوظة عند التحميل
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    if (savedLanguage !== currentLanguage) {
      handleLanguageChange(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (lang) => {
    localStorage.setItem('selectedLanguage', lang);
    onLanguageChange(lang);
    setLanguageDropdownOpen(false);
    setMobileLanguageDropdownOpen(false);
    setMobileMenuOpen(false);
    
    // تغيير اتجاه الصفحة حسب اللغة
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  const navItems = [
    { path: "/Home/Homepage", name: t("home") },
    { path: "/Home/Products", name: t("products") },
    { path: "/Home/Faqs", name: t("faqs") },
    { path: "/Home/AboutUs", name: t("aboutUs") },
    { path: "/Home/ContactUs", name: t("contactUs") },
  ];

  return (
    <div 
      className="px-4 sm:px-6 lg:px-20 sm:py-5 relative bg-white border-b border-gray-100"
      dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'}
    >
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
        <nav className="hidden lg:block">
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

            {/* Language Dropdown */}
            <li className="relative ml-4 bg-customOrange-lightOrange p-3 rounded-md text-primary">
              <button
                className="flex items-center gap-1 text-sm hover:text-primary"
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
              >
                {currentLanguage === "en" ? "English" : "العربية"}
                <svg
                  className={`w-4 h-4 transition-transform ${
                    languageDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {languageDropdownOpen && (
                <div className="absolute left-0 mt-2 w-20 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                  <button
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      currentLanguage === "en"
                        ? "bg-primary text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => handleLanguageChange("en")}
                  >
                    En
                  </button>
                  <button
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      currentLanguage === "ar"
                        ? "bg-primary text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => handleLanguageChange("ar")}
                  >
                    ع
                  </button>
                </div>
              )}
            </li>
          </ul>
        </nav>

        {/* Mobile Controls */}
        <div className="flex lg:hidden items-center gap-4">
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
        <div className="hidden lg:flex items-center gap-4 lg:gap-6">
          <div className="flex gap-3 items-center">
            <div className="relative">
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                {wishlistCount || 0}
              </span>
              <GoHeart
                size={25}
                className="cursor-pointer hover:text-primary"
                onClick={() => navigate("/Home/WishList")}
              />
            </div>
            <GrCart
              size={22}
              className="cursor-pointer hover:text-primary"
              onClick={() => navigate("Cart")}
            />
          </div>
          {isLoggedIn && <UserAcc />}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
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

              {/* Mobile Language Dropdown */}
              <li className="relative mt-4">
                <button
                  className="flex items-center justify-between w-full px-3 py-2 text-lg bg-gray-100 rounded"
                  onClick={() => setMobileLanguageDropdownOpen(!mobileLanguageDropdownOpen)}
                >
                  {currentLanguage === "en" ? "English" : "العربية"}
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      mobileLanguageDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {mobileLanguageDropdownOpen && (
                  <div className="mt-1 space-y-1">
                    <button
                      className={`block w-full text-left px-3 py-2 text-lg ${
                        currentLanguage === "en"
                          ? "bg-primary text-white"
                          : "bg-gray-100"
                      } rounded`}
                      onClick={() => handleLanguageChange("en")}
                    >
                      English
                    </button>
                    <button
                      className={`block w-full text-left px-3 py-2 text-lg ${
                        currentLanguage === "ar"
                          ? "bg-primary text-white"
                          : "bg-gray-100"
                      } rounded`}
                      onClick={() => handleLanguageChange("ar")}
                    >
                      العربية
                    </button>
                  </div>
                )}
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <div className="relative">
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                      {wishlistCount}
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
                <GrCart
                  size={20}
                  className="cursor-pointer"
                  onClick={() => {
                    navigate("Cart");
                    setMobileMenuOpen(false);
                  }}
                />
                {isLoggedIn && <UserAcc />}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BottomSection;