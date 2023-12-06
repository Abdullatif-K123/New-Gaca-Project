import React from "react";
import AboutPage from "@/components/about/AboutPage";
import Footer from "@/components/footer/footer";
const index = ({ isFeedbackVisible, handleToggleFeedback }) => {
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
      <AboutPage />
      <Footer />
    </div>
  );
};

export default index;
