import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SingleNews from "@/components/singleNews/SingleNews";
import Footer from "@/components/footer/footer";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import axios from "axios";
import { API_ROUTES } from "@/utils/apiConfig";
const NewsId = ({ isFeedbackVisible, handleToggleFeedback, conVersion }) => {
  const router = useRouter();
  const id = router.query.id;
  console.log(conVersion);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_ROUTES.blogs.get}/${id}`);
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
      <SingleNews id={id} data={data} conVersion={conVersion} />

      <Footer conVersion={conVersion} />
    </div>
  );
};

export default NewsId;
