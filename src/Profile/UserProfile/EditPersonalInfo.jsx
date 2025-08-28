import { Form, Formik } from "formik";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import SuccessModal from "../../Components/Modal/Success Modal/SuccessModal";
import { FaCircleCheck } from "react-icons/fa6";
import InputField from "../../Components/InputFields/InputField";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineFileUpload } from "react-icons/md";
import "./style.scss";
import { useTranslation } from "react-i18next";

function EditInfo() {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const personalInfo = state || {};

  const initialValues = {
    name: personalInfo?.name || "",
    email: personalInfo?.email || "",
    phone: personalInfo?.phone || "",
    image: personalInfo?.image || null,
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }
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

  if (showModal) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }

  return (
    <div>
      <Helmet>
        <title>
          {t("editProfile")} | {t("vertex")}
        </title>
      </Helmet>
      <section>
        <h1 className="font-bold text-xl">{t("editProfile")}</h1>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="my-3 gap-3">
                <div className="border rounded-md p-3 bg-white">
                  {selectedImage || personalInfo?.image ? (
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                      <img
                        src={
                          selectedImage
                            ? URL.createObjectURL(selectedImage)
                            : personalInfo.image
                        }
                        alt="Profile"
                        className="rounded-md w-32 h-24 object-cover"
                      />
                      <div className="flex items-center gap-5 font-bold">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="imageUpload"
                          onChange={(e) => {
                            setSelectedImage(e.target.files[0]);
                            setFieldValue("image", e.target.files[0]);
                          }}
                          aria-label="Upload new image"
                        />
                        <label
                          htmlFor="imageUpload"
                          className="cursor-pointer text-17 flex items-center gap-1"
                        >
                          <MdOutlineFileUpload size={25} />
                          {t("uploadPic")}
                        </label>
                        <button
                          type="button"
                          className="bg-red-50 p-2 rounded-md border border-red-400"
                          onClick={() => {
                            setSelectedImage(null);
                            setFieldValue("image", null);
                          }}
                          aria-label="Delete image"
                        >
                          <AiOutlineDelete
                            color="#DC2626"
                            size={24}
                            height={30}
                          />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-4">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="imageUpload"
                        onChange={(e) => {
                          setSelectedImage(e.target.files[0]);
                          setFieldValue("image", e.target.files[0]);
                        }}
                        aria-label="Upload new image"
                      />
                      <label
                        htmlFor="imageUpload"
                        className="cursor-pointer flex  items-center justify-center gap-2 w-full"
                      >
                        <MdOutlineFileUpload size={27} className="text-black" />
                        <button type="button" className="font-bold">
                          {t("uploadPic")}
                        </button>
                      </label>
                    </div>
                  )}
                </div>

                <div className="border p-3 rounded-md bg-gray-50 w-full mt-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <InputField placeholder={t("name")} name="name" />
                    <InputField placeholder={t("email")} name="email" />
                  </div>
                  <div className="mt-2">
                    <InputField placeholder={t("phone")} name="phone" />
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-end gap-3 rtl:justify-start">
                  {isRtl ? (
                    <>
                      <button
                        type="submit"
                        className="bg-primary font-bold text-17 text-white flex items-center justify-center gap-2 rounded-md p-3 w-32"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <ClipLoader color="#fff" size={22} />
                        ) : (
                          <>
                            <FaCircleCheck size={21} /> {t("save")}
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        className="bg-gray-100 text-17 text-gray-400 font-bold p-3 w-32 rounded-md"
                        onClick={() => navigate("/Home/UserProfile")}
                      >
                        {t("cancel")}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="bg-gray-100 text-17 text-gray-400 font-bold p-3 w-32 rounded-md"
                        onClick={() => navigate("/Home/UserProfile")}
                      >
                        {t("cancel")}
                      </button>
                      <button
                        type="submit"
                        className="bg-primary font-bold text-17 text-white flex items-center justify-center gap-2 rounded-md p-3 w-32"
                        disabled={isLoading}
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
              </div>
            </Form>
          )}
        </Formik>
      </section>
      <SuccessModal isOpen={showModal}>
        <div className="flex flex-col w-370 items-center">
          <img
            src="/assets/images/success.png"
            alt="Success"
            className="w-32 mt-6"
          />
          <p className="font-bold mt-5 text-center">{t("updateProfile")}</p>
          <button
            className="bg-primary text-white rounded-md p-2 text-16 font-bold mt-4 w-36"
            onClick={() => navigate("/Home/UserProfile")}
          >
            {t("done")}
          </button>
        </div>
      </SuccessModal>
    </div>
  );
}
export default EditInfo;