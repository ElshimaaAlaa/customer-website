import React from "react";
import CreditCard from "../../Svgs/CreditCard";
import Paypal from "../../Svgs/Paypal";
import Visa from "../../Svgs/Visa";
import GooglePay from "../../Svgs/GooglePay";
import { Field, Form, Formik } from "formik";
import InputField from "../../Components/InputFields/InputField";
function Payment() {
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
        <h3 className="text-16 font-bold mb-3">Add New Credit/ Debit Card</h3>
        <Formik>
          <Form>
            <div className="flex items-center gap-3">
              <InputField name="card_cvv" placeholder="CVV" />
              <Field
                name="expiration_date"
                placeholder="MM/YY"
                type="date"
                className={`w-full h-14 p-3 border-2 rounded-md outline-none transition-all duration-200 placeholder:text-14 focus:border-primary`}
                onChange={(e) => {
                  let value = e.target.value;
                  if (value.length === 2 && !value.includes("/")) {
                    value = value + "/";
                  }
                //   setFieldValue("expiration_date", value);
                }}
              />
            </div>
            <div className="flex items-center gap-3 mt-3">
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
            {/* </div> */}
          </Form>
        </Formik>
      </section>
    </div>
  );
}
export default Payment;
