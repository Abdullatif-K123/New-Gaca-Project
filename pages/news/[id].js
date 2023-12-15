import React from "react";
import { useRouter } from "next/router";
import SingleNews from "@/components/singleNews/SingleNews";
import newsData from "@/components/news/NewsData";
import Footer from "@/components/footer/footer";
const NewsId = ({ isFeedbackVisible, handleToggleFeedback }) => {
  const router = useRouter();
  const id = router.query.id;
  const newsDetails = newsData.find((news) => {
    return news.id == id;
  });

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
      <SingleNews id={id} newsDetails={newsDetails} />
      <Footer />
    </div>
  );
};

export default NewsId;
