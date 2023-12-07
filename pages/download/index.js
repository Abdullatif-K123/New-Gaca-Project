import React from "react";
import Downloads from "@/components/downloads/Downloads";
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
      <Downloads />
      <Footer />
    </div>
  );
};

export default index;
