import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import "./contactStyle.scss";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { SendSupport } from "../../ApiServices/sendContact";
import AuthInputField from "../../Components/AuthInput Field/AuthInputField";
import MainBtn from "../../Components/Main Button/MainBtn";
import SuccessModal from "../../Components/Modal/Success Modal/SuccessModal";
import { LuSend } from "react-icons/lu";
import { ClipLoader } from "react-spinners";
import ContactInfo from "./ContactInfo";
import { useTranslation } from "react-i18next";
function ContactUs() {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required(t("nameRequired")),
    email: Yup.string().email(t("invalidEmail")).required(t("emailRequired")),
    phone: Yup.string().required(t("phoneRequired")),
    message: Yup.string().required(t("messageRequired")),
  });
  useEffect(() => {
    if (showModal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    setIsRTL(i18n.language === "ar");
  }, [showModal, i18n.language]);
  const handleSubmit = async (values, { resetForm }) => {
    setIsLoading(true);
    setError(null);
    try {
      await SendSupport(
        values.name,
        values.email,
        values.phone,
        values.message
      );
      setShowModal(true);
      resetForm();
    } catch (error) {
      setError("Failed to send the message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="bg-white pb-10">
      <Helmet>
        <title>{t("contactUs")} | {t("vertex")}</title>
      </Helmet>
      <div className="contactHeader w-full h-[65vh] flex flex-col justify-center items-center text-center text-white">
        <h1 className="text-5xl font-bold mb-4">{t("contactUs")}</h1>
        <p className="text-17 font-light  leading-normal w-300 lg:w-500px md:w-500px">
         {t("contactDesc")}
        </p>
      </div>
      <div className="flex items-center flex-col md:flex-row md:items-start lg:items-start px-5 lg:px-20 justify-center gap-4 md:rtl:flex-row-reverse lg:rtl:flex-row-reverse">
        <ContactInfo />
        <section className="bg-customOrange-mediumOrange p-5 mt-10 w-[320px] md:w-[430px] lg:w-500 rounded-md">
          <div className="flex justify-center">
            <img
              src="/assets/svgs/chats.svg"
              alt="messages"
              className="w-14 mt-4 mb-2"
            />
          </div>
          <h2 className="font-bold text-lg text-center mb-1">
            {t("sendProblem")}
          </h2>
          <p className="text-gray-400 text-14 text-center mb-3">
            {t("helpYou")}
          </p>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ errors, touched }) => (
              <Form className="flex flex-col gap-2">
                <AuthInputField
                  name="name"
                  placeholder={t("name")}
                  dir={isRTL ? "rtl" : "ltr"}
                />
                <AuthInputField
                  name="email"
                  placeholder={t("email")}
                  dir={isRTL ? "rtl" : "ltr"}
                />
                <AuthInputField
                  name="phone"
                  placeholder={t("phone")}
                  dir={isRTL ? "rtl" : "ltr"}
                />
                <Field
                  as="textarea"
                  placeholder={t("message")}
                  name="message"
                  className={`w-full bg-white outline-none border-2 rounded-md p-2 h-32 block placeholder:text-14 
                  ${
                    errors.message && touched.message
                      ? "border-red-500 focus:border-red-500"
                      : touched.message
                      ? "border-green-500 focus:border-green-500"
                      : "border-gray-200 focus:border-primary"
                  }`}
                />
                {error && (
                  <p className="text-red-500 text-center mt-2">{error}</p>
                )}
                <MainBtn
                  btnType={"submit"}
                  text={
                    isLoading ? (
                      <ClipLoader color="#fff" size={22} />
                    ) : (
                      <div className="flex justify-center text-17 items-center gap-2">
                        <LuSend size={19} />
                        {t("sendMessage")}
                      </div>
                    )
                  }
                />
              </Form>
            )}
          </Formik>
        </section>
      </div>
      {/* Success Modal */}
      <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="flex flex-col items-center justify-center w-400">
          <img
            src="/assets/images/success.png"
            alt="success"
            className="w-32 mt-6"
          />
          <p className="font-bold mt-5 rtl:text-[19px]">{t("doneMessage")}</p>
          <button
            className="bg-primary font-bold text-white p-2 w-40 mt-4 rounded-md rtl:text-[16px]"
            type="button"
            onClick={() => setShowModal(false)}
          >
            {t("done")}
          </button>
        </div>
      </SuccessModal>
    </section>
  );
}
export default ContactUs;