import React, { useEffect, useState } from "react";
import SectionOne from "./Home-main/SectionOne";
import MasterPlan from "./master-plan/MasterPlan";
import HomeBottom from "../footer/HomeBottom";
import LoadingSpinner from "../ui/LoadingSpinner";
import { API_ROUTES } from "@/utils/apiConfig";
import classes from "./Home-main/home-one.module.css";
import axios from "axios";
import Image from "next/image";
const HomePage = ({ dataHome,  isFeedbackVisible, handleToggleFeedback, conVersion, lang }) => {
  
  const [showBtn, setShowBtn] = useState(false);
   
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const threshold = 300; // Adjust this value based on when you want the button to appear

      setShowBtn(scrollTop > threshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  //Handling clicking button up
  const handleClick = () => {
    const targetElement = document.getElementById("home");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  //constract the title and description from data api hero section 
  const title = !lang? dataHome.hero.titleEN : dataHome.hero.title; 
  const desc = !lang? dataHome.hero.descriptionEN : dataHome.hero.description;
 
  return (
    <div
      onClick={() => {
        isFeedbackVisible ? handleToggleFeedback() : null;
      }}
      style={{
        filter: isFeedbackVisible ? "brightness(0.5)" : " ",
        transition: "all 0.6s ease-in-out",
        height: isFeedbackVisible ? "Calc(100vh - 111px)" : "",
        overflow: isFeedbackVisible ? "hidden" : "",
      }}
    >
      <SectionOne
        isFeedbackVisible={isFeedbackVisible}
        handleToggleFeedback={handleToggleFeedback}
        title={title}
        desc={desc}
      />
      <MasterPlan layers={ dataHome?.masterPlanLayers} />
      <HomeBottom
        news={dataHome?.lastNews}
        imgs={dataHome?.stakeHolders}
        conVersion={conVersion}
        desc={desc}
      />
      {showBtn && (
        <div className={classes.btnUp} onClick={handleClick}>
          <Image
            src="/assets/svg/arrow-up.svg"
            width={15}
            height={15}
            alt="arrow-down"
            className={classes.arrowDown}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
