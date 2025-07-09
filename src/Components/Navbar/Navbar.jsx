import React, { useEffect, useState } from "react";
import TopSection from "./TopSection";
import BottomSection from "./BottomSection";
import { useTranslation } from "react-i18next";

function Navbar() {
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);

  // Set initial language from localStorage or default to 'en'
  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
    const applyLanguageSettings = (lng) => {
      document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lng;
      setIsRTL(lng === "ar");
    };

    if (savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage).then(() => {
        applyLanguageSettings(savedLanguage);
      });
    } else {
      applyLanguageSettings(savedLanguage);
    }
  }, [i18n]);

  const handleLanguageChange = (lng) => {
    localStorage.setItem("selectedLanguage", lng);
    i18n.changeLanguage(lng).then(() => {
      document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lng;
      setIsRTL(lng === "ar");
    });
  };

  return (
    <div className={isRTL ? "rtl" : "ltr"}>
      <TopSection />
      <BottomSection onLanguageChange={handleLanguageChange} currentLanguage={i18n.language} />
    </div>
  );
}

export default Navbar;