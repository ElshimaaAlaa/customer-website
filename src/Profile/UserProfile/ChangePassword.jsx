import { Form, Formik } from "formik";
import { useState } from "react";
import PasswordInput from "../../Components/Password Input/PasswordInput";
import * as Yup from "yup";
import SuccessModal from "../../Components/Modal/Success Modal/SuccessModal";
import { handleUpdatePassword } from "../../ApiServices/UpdatePassword";
import { ClipLoader } from "react-spinners";
import { FaCircleCheck } from "react-icons/fa6";
import "./style.scss";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = {
    password: "",
    password_confirmation: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      await handleUpdatePassword(values.password, values.password_confirmation);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate("/Home/UserProfile");
      }, 2500);
    } catch (error) {
      console.error("Failed to update password", error);
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
      <h1 className="font-bold text-xl mt-5">Change Password</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="w-500px">
          <PasswordInput 
            name="password" 
            placeholder="New Password"
            showPassword={showPassword}
            togglePasswordVisibility={() => setShowPassword(!showPassword)}
          />
          <PasswordInput
            name="password_confirmation"
            placeholder="Confirm Password"
            showPassword={showConfirmPassword}
            togglePasswordVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
          />
          <div className="flex justify-start mt-4">
            <button 
              type="submit"
              className="flex items-center gap-2 font-bold rounded-md  p-3 text-17 justify-center bg-primary text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <ClipLoader color="#fff" size={22} />
              ) : (
                <>
                  <FaCircleCheck size={19} />
                  Change Password
                </>
              )}
            </button>
          </div>
        </Form>
      </Formik>
      {/* Success Modal */}
      <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="flex flex-col items-center justify-center gap-3 w-350 p-5">
          <img
            src="/assets/images/success.png"
            alt="success"
            className="w-32 mt-6"
          />
          <h1 className="font-bold">Password Updated Successfully</h1>
        </div>
      </SuccessModal>
    </div>
  );
}
export default ChangePassword;