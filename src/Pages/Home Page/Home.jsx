import React from "react";
import Quality from "../../Sections/Quality Section/Quality";
import OpinionSection from "../../Sections/Opnion Section/ClientOpinion";
import Header from "../../Components/Header/Header";

function Home() {
  return (
    <div>
      <Header />
      <OpinionSection />
      <Quality />
    </div>
  );
}
export default Home;