import React, { useEffect, useState } from "react";
import SectionOne from "./Home-main/SectionOne";
import MasterPlan from "./master-plan/MasterPlan";
import HomeBottom from "../footer/HomeBottom";
import LoadingSpinner from "../ui/LoadingSpinner";
import axios from "axios";
const HomePage = ({ isFeedbackVisible, handleToggleFeedback, conVersion }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://gaca.somee.com/api/landingpage/homepage"
        );

        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
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
      <HomeBottom imgs={data?.stakeHolder} conVersion={conVersion} />
    </div>
  );
};

export default HomePage;
