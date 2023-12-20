import React, { useEffect, useState } from "react";
import Downloads from "@/components/downloads/Downloads";
import Footer from "@/components/footer/footer";
import axios from "axios";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
const index = ({ isFeedbackVisible, handleToggleFeedback }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://gaca.somee.com/api/landingpage/downloads"
        );

        setData(response.data);
        console.log(response.data);
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
      <Downloads data={data} />
      <Footer />
    </div>
  );
};

export default index;
