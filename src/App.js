import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import GetDomain from "./Auth/Get Domain/GetDomain";
import Login from "./Auth/Login/Login";
import ForgotPassword from "./Auth/Forgot Password/ForgotPassword";
import VerifayPassword from "./Auth/Verivation Code/VerifayPassword";
import CreateNewPassword from "./Auth/Create Password/CreateNewPassword";
import Register from "./Auth/Register/Register";
import Main from "./Pages/Home Page/Main";
import Faqs from "./Pages/Faqs/Faqs";
import AboutUs from "./Pages/AboutUs/AboutUs";
import ContactUs from "./Pages/ContactUs/ContactUs";
import UserProfile from "./Profile/UserProfile/UserProfile";
import Home from "./Pages/Home Page/Home";
import PersonalInformation from "./Profile/UserProfile/PersonalInformation";
import EditInfo from "./Profile/UserProfile/EditPersonalInfo";
import ChangePassword from "./Profile/UserProfile/ChangePassword";
import Address from "./Profile/Address/Address";
import EditAddress from "./Profile/Address/EditAddress";
import UserOrder from "./Profile/User Orders/UserOrder";
import Payment from "./Profile/Payment/Payment";
import OrderDetails from "./Profile/User Orders/OrderDetail";
import WishList from "./Pages/WishList/WishList";
import Products from "./Pages/Products/Products";
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PulseLoader color="#E0A75E" size={17} />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GetDomain />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Login/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/Login/VerifayPassword" element={<VerifayPassword />} />
        <Route
          path="/Login/CreateNewPassword"
          element={<CreateNewPassword />}
        />
        <Route path="/Register" element={<Register />} />
        <Route path="/Home" element={<Main />}>
          <Route path="Homepage" element={<Home />} />
          <Route path="Faqs" element={<Faqs />} />
          <Route path="AboutUs" element={<AboutUs />} />
          <Route path="ContactUs" element={<ContactUs />} />
          <Route path="Products" element={<Products />} />
          <Route path="WishList" element={<WishList />} />
          <Route path="UserProfile" element={<UserProfile />}>
            <Route index element={<PersonalInformation />} />
            <Route path="EditInfo" element={<EditInfo />} />
            <Route path="ChangePassword" element={<ChangePassword />} />
            <Route path="Address" element={<Address />} />
            <Route path="EditAddress" element={<EditAddress />} />
            <Route path="UserOrder" element={<UserOrder />} />
            {/* <Route path="UserOrder/:id" element={<OrderDetails />} /> */}
            <Route path="Payment" element={<Payment />} />
          </Route>
          <Route path="UserOrder/:id" element={<OrderDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
