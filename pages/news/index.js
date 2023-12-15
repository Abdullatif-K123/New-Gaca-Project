import React from "react";
import NewsMain from "@/components/news/NewsMain";
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
      <NewsMain />
      <Footer />
    </div>
  );
};

export default index;
