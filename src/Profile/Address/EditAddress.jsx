import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import SuccessModal from "../../Components/Modal/Success Modal/SuccessModal";
import { FaCircleCheck } from "react-icons/fa6";
import InputField from "../../Components/InputFields/InputField";
import { useTranslation } from "react-i18next";
function EditAddress() {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRtl] = useState(false);
  const addressData = state || {};

  const initialValues = {
    country: addressData?.country || "",
    address: addressData?.address || "",
    city: addressData?.city || "",
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("country", values.country);
      formData.append("address", values.address);
      formData.append("city", values.city);
      const response = await axios.post(
        `https://demo.vrtex.duckdns.org/api/update-profile`,
        formData,
        {
          headers: {
            Accept: "application/json",
            "Accept-Language": "ar",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("user token")}`,
          },
        }
      );
      console.log("Profile updated:", response.data);
      setShowModal(true);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setIsRtl(i18n.language === "ar");
  }, [i18n.language]);
  return (
    <div>
      <Helmet>
        <title>Manage Address</title>
      </Helmet>
      <section>
        <h1 className="font-bold text-xl mb-2">{t("manageAddress")}</h1>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="border p-3 rounded-md bg-gray-50 w-full">
                <div className="flex flex-col md:flex-row gap-2">
                  <InputField placeholder={t("country")} name="country" />
                  <InputField placeholder={t("city")} name="city" />
                </div>
                <div className="mt-2">
                  <InputField placeholder={t("address")} name="address" />
                </div>
              </div>
              <div className="mt-5 flex items-center justify-end gap-3 rtl:flex-row-reverse">
                {isRTL ? (
                  <>
                    <button
                      type="button"
                      className="bg-gray-100 text-17 text-gray-400 font-bold p-3 w-32 rounded-md"
                      onClick={() => navigate("/Home/UserProfile/Address")}
                    >
                      {t("cancel")}
                    </button>
                    <button
                      type="submit"
                      className="bg-primary text-17 font-bold text-white flex items-center justify-center gap-2 rounded-md p-3 w-32"
                    >
                      {isLoading ? (
                        <ClipLoader color="#fff" size={22} />
                      ) : (
                        <>
                          <FaCircleCheck size={21} /> {t("save")}
                        </>
                      )}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="bg-gray-100 text-17 text-gray-400 font-bold p-3 w-32 rounded-md"
                      onClick={() => navigate("/Home/UserProfile/Address")}
                    >
                      {t("cancel")}
                    </button>
                    <button
                      type="submit"
                      className="bg-primary text-17 font-bold text-white flex items-center justify-center gap-2 rounded-md p-3 w-32"
                    >
                      {isLoading ? (
                        <ClipLoader color="#fff" size={22} />
                      ) : (
                        <>
                          <FaCircleCheck size={21} /> {t("save")}
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </section>
      {/* Success Modal */}
      <SuccessModal isOpen={showModal}>
        <div className="flex flex-col w-370 items-center">
          <img
            src="/assets/images/success.png"
            alt="Success"
            className="w-32 mt-6"
          />
          <p className="font-bold mt-5 text-center">
            Address Data updated successfully!
          </p>
          <button
            className="bg-primary text-white rounded-md p-2 text-14 mt-4 w-60 "
            onClick={() => navigate("/Home/UserProfile/Address")}
          >
            Done
          </button>
        </div>
      </SuccessModal>
    </div>
  );
}
export default EditAddress;
