import React, { useEffect } from "react";
import SectionOne from "./Home-main/SectionOne";
import MasterPlan from "./master-plan/MasterPlan";
import HomeBottom from "../footer/HomeBottom";

const HomePage = () => {
  return (
    <>
      <SectionOne />

      <MasterPlan />

      <HomeBottom />
    </>
  );
};

export default HomePage;
