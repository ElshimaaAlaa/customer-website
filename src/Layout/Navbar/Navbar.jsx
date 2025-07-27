import { useEffect, useState } from "react";
import TopSection from "./TopSection";
import BottomSection from "./BottomSection";
import { useTranslation } from "react-i18next";

function Navbar() {
  const { i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(i18n.language === "ar");

  const handleLanguageChange = async (lng) => {
    try {
      localStorage.setItem("selectedLanguage", lng);
      await i18n.changeLanguage(lng);
      applyLanguageSettings(lng);
    } catch (error) {
      console.error("Failed to change language:", error);
      localStorage.setItem("selectedLanguage", "en");
      await i18n.changeLanguage("en");
      applyLanguageSettings("en");
    }
  };

  const applyLanguageSettings = (lng) => {
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lng;
    setIsRTL(lng === "ar");
  };

  useEffect(() => {
    const initializeLanguage = async () => {
      const savedLanguage = localStorage.getItem("selectedLanguage");
      const languageToUse = savedLanguage || i18n.language;
      
      try {
        if (savedLanguage && savedLanguage !== i18n.language) {
          await i18n.changeLanguage(savedLanguage);
        }
        applyLanguageSettings(languageToUse);
      } catch (error) {
        console.error("Language initialization failed:", error);
        // Fallback to English
        localStorage.setItem("selectedLanguage", "en");
        await i18n.changeLanguage("en");
        applyLanguageSettings("en");
      }
    };

    initializeLanguage();
  }, [i18n]);

  return (
    <div className={`navbar-container ${isRTL ? "rtl" : "ltr"}`}>
      <TopSection isRTL={isRTL} />
      <BottomSection
        onLanguageChange={handleLanguageChange}
        currentLanguage={i18n.language}
        isRTL={isRTL}
      />
    </div>
  );
}
export default Navbar;