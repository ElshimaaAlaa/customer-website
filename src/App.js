import { BrowserRouter, Route, Routes } from "react-router-dom";
import GetDomain from "./Auth/Get Domain/GetDomain";
import Login from "./Auth/Login/Login";
import ForgotPassword from "./Auth/Forgot Password/ForgotPassword";
import VerifayPassword from "./Auth/Verivation Code/VerifayPassword";
import CreateNewPassword from "./Auth/Create Password/CreateNewPassword";
import Register from "./Auth/Register/Register";
import Main from "./Pages/Home Page/Main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GetDomain />} />
        {/* Auth */}
        <Route path="/Login" element={<Login />} />
        <Route path="/Login/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/Login/VerifayPassword" element={<VerifayPassword />} />
        <Route
          path="/Login/CreateNewPassword"
          element={<CreateNewPassword />}
        />
        <Route path="/Register" element={<Register />} />
        {/* Home page */}
        <Route path="/Main" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;