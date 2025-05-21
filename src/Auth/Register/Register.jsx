import { useState } from "react";
import "./Register.scss";
import OAuth from "../OAuth/OAuth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ClipLoader } from "react-spinners";
import { Helmet } from "react-helmet";
import AuthInputField from "../../Components/AuthInput Field/AuthInputField";
import PasswordInput from "../../Components/Password Input/PasswordInput";
import MainBtn from "../../Components/Main Button/MainBtn";
import { register } from "../../ApiServices/RegisterApi";
import { useNavigate } from "react-router-dom";

function Register() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    agreeToTerms: false,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    agreeToTerms: Yup.boolean()
      .oneOf([true], "You must agree to the terms and conditions")
      .required("You must agree to the terms and conditions"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    setError(null);
    try {
      const registerData = await register(
        values.name,
        values.password,
        values.email,
        values.password_confirmation,
        values.agreeToTerms
      );
      console.log("Registration Successful:", registerData);
      navigate("/Home/Homepage");
    } catch (error) {
      setLoading(false);
      console.error(error.message);
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <div className="maincontainer">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
      </Helmet>
      <div className="registerContainer lg:w-450 md:w-450 sm:w-450 xs:w-450 s:w-450 bg-gray-50">
        <img
          src="/assets/svgs/vertex.svg"
          alt="logo"
          className="w-48 h-10 mb-3"
        />
        <h1 className="font-bold text-[20px] mt-3">Create New Account</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({ values, errors, touched }) => (
            <Form className="flex flex-col">
              <div className="relative mt-3">
                <AuthInputField placeholder="Name" name="name" />
              </div>
              <div className="relative mt-3">
                <AuthInputField placeholder="Email" name="email" />
              </div>
              <PasswordInput
                name="password"
                placeholder="Password"
                showPassword={showPasswordConfirmation}
                togglePasswordVisibility={() =>
                  setShowPasswordConfirmation(!showPasswordConfirmation)
                }
              />
              <PasswordInput
                name="password_confirmation"
                placeholder="Confirm Password"
                showPassword={showPassword}
                togglePasswordVisibility={() => setShowPassword(!showPassword)}
              />
              
              <div className="flex items-start mt-3">
                <label className="inline-flex items-start cursor-pointer">
                  <Field
                    type="checkbox"
                    name="agreeToTerms"
                    id="agreeToTerms"
                    className="mr-2 mt-1 w-4 h-4 border-2 border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="text-11 lg:text-14 text-gray-500">
                    I agree with the Terms & Conditions of Clarity
                  </span>
                </label>
              </div>
              <ErrorMessage
                name="agreeToTerms"
                component="div"
                className="text-red-500 text-xs mt-1"
              />

              <div className="mt-3 mb-3">
                <MainBtn
                  text={
                    loading ? <ClipLoader color="#fff" size={22} /> : "Sign Up"
                  }
                  btnType="submit"
                  disabled={loading}
                />
              </div>
              
              {error && (
                <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
              )}
              
              <div className="flex items-center justify-center w-full">
                <div className="border-t border-gray-300 flex-grow"></div>
                <span className="mx-4 text-gray-400 text-13 font-bold">OR</span>
                <div className="border-t border-gray-300 flex-grow"></div>
              </div>
              
              <OAuth />
              
              <p className="text-center text-gray-400 mt-3 text-15">
                Have An Account ?
                <span
                  onClick={() => navigate("/Login")}
                  className="ms-2 text-primary font-bold text-15 cursor-pointer"
                >
                  Login
                </span>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Register;