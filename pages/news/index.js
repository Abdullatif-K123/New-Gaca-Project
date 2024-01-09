import React, { useEffect, useState } from "react";
import NewsMain from "@/components/news/NewsMain";
import Footer from "@/components/footer/footer";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import axios from "axios";
import { API_ROUTES } from "@/utils/apiConfig";
const index = ({ isFeedbackVisible, handleToggleFeedback, conVersion }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_ROUTES.blogs.get);
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
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
      <NewsMain dataNews={data} />
      <Footer conVersion={conVersion} />
    </div>
  );
};

export default index;
