import React from "react";
import { Helmet } from "react-helmet";
import TopSection from "../../Components/Navbar/TopSection";
import { Outlet } from "react-router-dom";
import BottomSection from "../../Components/Navbar/BottomSection";
import Footer from "../../Components/Footer/Footer";

function Main() {
  return (
    <div>
      <Helmet>
        <title>Home Page | Vertex</title>
      </Helmet>
      <div>
        <TopSection />
        <BottomSection />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
export default Main;