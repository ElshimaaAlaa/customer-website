import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";
import Navbar from "../../Layout/Navbar/Navbar";
import Footer from "../../Layout/Footer/Footer";
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