import React from "react";
import FeatureProducts from "./components/FeatureProducts";
import HeroSection from "./components/HeroSection";
import Trusted from "./components/Trusted";
import Services from "./Services";

const Home = () => {
  const data = {
    name: "Thapa Store",
  };
  return (
    <>
      <HeroSection mydata={data} />
      <FeatureProducts />
      <Services />
      <Trusted />
      
    </>
  );
};

export default Home;
