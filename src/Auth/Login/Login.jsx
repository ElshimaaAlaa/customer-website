import { useState, useEffect, useCallback } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ClipLoader } from "react-spinners";
import "./login.scss";
import OAuth from "../OAuth/OAuth";
import MainBtn from "../../Components/Main Button/MainBtn";
import { loginService } from "../../ApiServices/LoginService";
import AuthInputField from "../../Components/AuthInput Field/AuthInputField";
import PasswordInput from "../../Components/Password Input/PasswordInput";
import { IoIosArrowDown } from "react-icons/io";
import { useTranslation } from "react-i18next";

function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  const [initialValues, setInitialValues] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem("user email");
    const savedPassword = localStorage.getItem("user password");
    if (savedEmail && savedPassword) {
      setInitialValues({
        email: savedEmail,
        password: savedPassword,
        rememberMe: true,
      });
    }
    setIsRTL(i18n.language === "ar");
  }, [i18n.language]);

  const validationSchema = Yup.object({
    email: Yup.string().email(t("emailInvalid")).required(t("emailRequired")),
    password: Yup.string()
      .min(8, t("passwordLenght"))
      .required(t("passwordRequired")),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    setError(null);
    try {
      if (values.rememberMe) {
        localStorage.setItem("user email", values.email);
        localStorage.setItem("user password", values.password);
      } else {
        localStorage.removeItem("user email");
        localStorage.removeItem("user password");
      }
      await loginService(values.email, values.password);
      setTimeout(() => {
        navigate("/Home/HomePage");
      }, 1500);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
    i18n.changeLanguage(savedLanguage);
    setIsRTL(savedLanguage === "ar");
  }, [i18n]);
  // Update RTL state and localStorage when language changes
  useEffect(() => {
    const currentLanguage = i18n.language;
    setIsRTL(currentLanguage === "ar");
    localStorage.setItem("selectedLanguage", currentLanguage);
  }, [i18n.language]);
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowLanguageDropdown(false);
    localStorage.setItem("selectedLanguage", lng);
  };

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <div className="main-container" dir={isRTL ? "rtl" : "ltr"}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t("login")} | {t("vertex")}</title>
        <html dir={isRTL ? "rtl" : "ltr"} lang={i18n.language} />
      </Helmet>
      <div
        className={`loginContainer w-[350px] p-5 lg:p-7 md:p-7 lg:w-450 md:w-450 sm:w-80 xs:w-450 s:w-80 bg-gray-50 rounded-md`}
      >
        <div className="flex justify-between items-center">
          <img
            src="/assets/svgs/vertex.svg"
            alt="logo"
            className="w-48 h-10 mb-3"
          />
          <div className="relative">
            <button
              className="flex items-center gap-1 text-14 bg-customOrange-lightOrange text-primary rounded-md p-2"
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            >
              {i18n.language.toUpperCase()}
              <IoIosArrowDown size={20} />
            </button>
            {showLanguageDropdown && (
              <div
                className={`absolute ${
                  isRTL ? "left-0" : "right-0"
                } w-14 bg-white rounded-md shadow-lg z-10`}
              >
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => changeLanguage("en")}
                >
                  EN
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => changeLanguage("ar")}
                >
                  AR
                </button>
              </div>
            )}
          </div>
        </div>
        <div className={`flex items-center gap-3 mt-2 `}>
          <h1 className={`font-bold text-[23px] rtl:text-[25px] `}>
            {t("welcome")}
          </h1>
          <img
            src="/assets/images/waving-hand_svgrepo.com.png"
            alt="welcome-back"
            className="w-8"
          />
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          enableReinitialize={true}
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form className="loginForm mt-4">
              <AuthInputField
                name={"email"}
                placeholder={t("email")}
                error={touched.email && errors.email}
                active={touched.email}
                dir={isRTL ? "rtl" : "ltr"}
              />
              <PasswordInput
                name={"password"}
                placeholder={t("password")}
                showPassword={showPassword}
                togglePasswordVisibility={togglePasswordVisibility}
                error={touched.password && errors.password}
                active={touched.password}
                dir={isRTL ? "rtl" : "ltr"}
              />
              {error && (
                <p className="text-red-500 text-sm mt-3 text-start">{error}</p>
              )}
              <div className="flex items-center justify-between mt-5">
                <div className="flex items-center">
                  <label className="inline-flex items-center cursor-pointer">
                    <Field
                      type="checkbox"
                      name="rememberMe"
                      className="hidden peer"
                      checked={values.rememberMe}
                      onChange={(e) =>
                        setFieldValue("rememberMe", e.target.checked)
                      }
                    />
                    <span
                      className={`w-4 h-4 border-2 rounded flex items-center justify-center transition-all duration-200 ${
                        values.rememberMe
                          ? "border-primary bg-primary"
                          : "border-gray-300"
                      }`}
                    >
                      {values.rememberMe && (
                        <svg
                          className="w-3 h-3 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                        </svg>
                      )}
                    </span>
                    <span
                      className={`text-11 lg:text-13 text-gray-600 remeber ${
                        isRTL ? "ms-2 " : "ms-1"
                      }`}
                    >
                      {t("rememberMe")}
                    </span>
                  </label>
                </div>
                <div
                  role="button"
                  tabIndex={0}
                  className="font-bold text-11 lg:text-13 cursor-pointer forgot"
                  onClick={() => navigate("/Login/ForgotPassword")}
                >
                  {t("areForgotPassword")}
                </div>
              </div>
              <div className="mt-5">
                <MainBtn
                  text={
                    loading ? <ClipLoader color="#fff" size={22} /> : t("login")
                  }
                  btnType="submit"
                  disabled={loading}
                />
              </div>
            </Form>
          )}
        </Formik>
        <div className="flex items-center justify-center mt-4">
          <div className="border-t border-gray-300 flex-grow"></div>
          <span className="mx-4 text-gray-400 text-13 font-bold or">
            {t("or")}
          </span>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>
        <OAuth />
        <div>
          <p className="text-center text-gray-400 text-15 mt-3">
           {t("noAccount")} <span className="font-bold text-primary text-16 cursor-pointer ms-1 rtl:text-[15px]`" onClick={()=>navigate('/Register')}>{t("signUp")}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
export default AdminLogin;