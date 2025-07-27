import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import { useTranslation } from "react-i18next";

function Main() {
  const { t } = useTranslation();
  return (
    <div>
      <Helmet>
        <title>
          {t("homePage")} | {t("vertex")}
        </title>
      </Helmet>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
export default Main;