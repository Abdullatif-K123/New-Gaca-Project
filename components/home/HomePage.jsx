import React, { useEffect, useState } from "react";
import SectionOne from "./Home-main/SectionOne";
import MasterPlan from "./master-plan/MasterPlan";
import HomeBottom from "../footer/HomeBottom";
import LoadingSpinner from "../ui/LoadingSpinner";
import { API_ROUTES } from "@/utils/apiConfig";
import classes from "./Home-main/home-one.module.css";
import axios from "axios";
import Image from "next/image";
const HomePage = ({ isFeedbackVisible, handleToggleFeedback, conVersion }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showBtn, setShowBtn] = useState(false);
  const [windowYs, setWindowYs] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_ROUTES.homePage.get);

        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
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
  const heroTitle = data?.hero?.title || "Default Title";
  const heroDescription = data?.hero?.description || "Default Description";
  if (loading) {
    return <LoadingSpinner />;
  }
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
        title={heroTitle}
        desc={heroDescription}
      />
      <MasterPlan layers={data?.masterPlan} />
      <HomeBottom
        imgs={data?.stakeHolder}
        conVersion={conVersion}
        desc={heroDescription}
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
