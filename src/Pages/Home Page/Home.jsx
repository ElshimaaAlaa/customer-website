import Quality from "../../Sections/Quality Section/Quality";
import OpinionSection from "../../Sections/Opnion Section/ClientOpinion";
import Header from "../../Components/Header/Header";
import FeaturedCategories from "../../Sections/Featured Categories/FeaturedCategories";
import LatestProducts from "../../Sections/Latest Products/LatestProducts";
import BestSalesProducts from "../../Sections/Best Selling/BestSellingProducts";
import Offers from "../../Sections/Offers/Offers";
import AboutExpiredPromo from "../../Sections/About Expitred Promotion/AboutExpiredPromo";

function Home() {
  return (
    <div>
      <Header />
      <FeaturedCategories />
      <AboutExpiredPromo/>
      <LatestProducts />
      <Offers />
      <BestSalesProducts />
      <OpinionSection />
      <Quality />
    </div>
  );
}
export default Home;
