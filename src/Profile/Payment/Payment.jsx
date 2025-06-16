import CreditCard from "../../Svgs/CreditCard";
import Paypal from "../../Svgs/Paypal";
import Visa from "../../Svgs/Visa";
import GooglePay from "../../Svgs/GooglePay";
import { Field, Form, Formik } from "formik";
import InputField from "../../Components/InputFields/InputField";
import { addPaymentInfo } from "../../ApiServices/PaymentInfo";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { FaCheckCircle } from "react-icons/fa";
import SuccessModal from "../../Components/Modal/Success Modal/SuccessModal";
import { useNavigate } from "react-router-dom";
function Payment() {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    card_cvv: "",
    card_exp_date: "",
    card_number: "",
    card_holder_name: "",
    payment_method: "",
  };
  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      await addPaymentInfo(
        values.card_cvv,
        values.card_exp_date,
        values.card_holder_name,
        values.payment_method
      );
      setIsLoading(false);
      setShowModal(true);
    } catch (error) {
      setIsLoading(false);
      setShowModal(false);
      console.error(error);
    }
  };
  return (
    <div>
      <h2 className="font-bold text-[18px] mb-3">Payment Methods</h2>
      <section className="flex flex-col gap-3">
        <div className="border border-gray-200 bg-gray-50 rounded-lg p-4 flex items-center justify-between">
          <p className="flex items-center text-15">
            <CreditCard />
            Credit Card
          </p>
          <button className="text-primary text-16 font-bold">
            Link Account
          </button>
        </div>
        <div className="border border-gray-200 bg-gray-50 rounded-lg p-4 flex items-center justify-between">
          <p className="flex items-center text-15">
            <Paypal />
            Pay pal
          </p>
          <button className="text-primary text-16 font-bold">
            Link Account
          </button>
        </div>
        <div className="border border-gray-200 bg-gray-50 rounded-lg p-4 flex items-center justify-between">
          <p className="flex items-center text-15">
            <Visa />
            Visa
          </p>
          <button className="text-primary text-16 font-bold">
            Link Account
          </button>
        </div>
        <div className="border border-gray-200 bg-gray-50 rounded-lg p-4 flex items-center justify-between">
          <p className="flex items-center text-15">
            <GooglePay />
            Google Pay
          </p>
          <button className="text-red-600 text-16 font-bold">Delete</button>
        </div>
      </section>
      <section className="border border-gray-200 p-4 rounded-lg bg-gray-50 mt-3">
        <h3 className="text-15 font-bold mb-3">Add New Credit/ Debit Card</h3>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form>
            <div className="flex items-center gap-2">
              <InputField name="card_cvv" placeholder="CVV" />
              <Field
                name="card_exp_date"
                placeholder="MM/YY"
                type="date"
                className={`w-full h-12 p-3 border-2 rounded-md outline-none transition-all duration-200 placeholder:text-14 focus:border-primary`}
                onChange={(e) => {
                  let value = e.target.value;
                  if (value.length === 2 && !value.includes("/")) {
                    value = value + "/";
                  }
                }}
              />
            </div>
            <div className="flex items-center gap-2 mt-3">
              <InputField
                name="card_holder_name"
                placeholder="Card Holder Name"
              />
              <InputField
                name="card_number"
                placeholder="Card Number"
                type="tel"
                inputMode="numeric"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-primary text-white rounded-md p-3  flex items-center gap-2 w-32 justify-center mt-4"
              >
                {isLoading ? (
                  <ClipLoader size={20} color="#fff" />
                ) : (
                  <>
                    <FaCheckCircle /> Save
                  </>
                )}
              </button>
            </div>
          </Form>
        </Formik>
      </section>
      <SuccessModal isOpen={showModal}>
        <div className="flex flex-col w-370 items-center">
          <img
            src="/assets/images/success.png"
            alt="Success"
            className="w-32 mt-6"
          />
          <p className="font-bold mt-5 text-center">
            Payment Data updated successfully!
          </p>
          <button
            className="bg-primary text-white rounded-md p-2 text-14 mt-4 w-32 "
            onClick={() => navigate("/Home/UserProfile")}
          >
            Done
          </button>
        </div>
      </SuccessModal>
    </div>
  );
}
export default Payment;