import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SingleNews from "@/components/singleNews/SingleNews";
import newsData from "@/components/news/NewsData";
import Footer from "@/components/footer/footer";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import axios from "axios";
const NewsId = ({ isFeedbackVisible, handleToggleFeedback, conVersion }) => {
  const router = useRouter();
  const id = router.query.id;
  const newsDetails = newsData.find((news) => {
    return news.id == id;
  });
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://gaca.somee.com/api/landingpage/blogs/${id}`
        );
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
      <SingleNews id={id} newsDetails={newsDetails} data={data} />
      <Footer conVersion={conVersion} />
    </div>
  );
};

export default NewsId;
