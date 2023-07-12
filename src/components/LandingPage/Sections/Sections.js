import React from "react";
import HomeSection from "./HomeSection";
import Platform from "./Platform";
import Features from "./Features";

const Sections = () => {
  //Rendering every of the section components
  return (
    <main>
      <HomeSection />
      <Platform />
      <Features />
    </main>
  );
  //END
};

export default Sections;
