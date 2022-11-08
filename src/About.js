import React from "react";
import HeroSection from "./components/HeroSection";
import { useProductContext } from "./context/productcontext";

const About = () => {
//   const { myName } = useProductContext();
  const data = { name: "Thapa Ecommerce" };
  return (
    <>
    {/* {myName} */}
      <HeroSection mydata={data} />
    </>
  );
};

export default About;
