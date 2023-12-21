import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MasterPlanMain from "@/components/master-plan/MasterPlanMain";
import sampleData from "@/components/master-plan/simpleData";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import axios from "axios";
const index = ({ isFeedbackVisible, handleToggleFeedback, conVersion }) => {
  const router = useRouter();
  const plan = router.query.plan;
  const [data, setData] = useState(null);
  const [dataChildren, setDataChildren] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataFetch1, setDataFetch1] = useState(null);
  const [dataFetch2, setDataFetch2] = useState(null);
  const [dataFetch3, setDataFetch3] = useState(null);
  const [dataFetch4, setDataFetch4] = useState(null);
  const [dataFetch5, setDataFetch5] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://gaca.somee.com/api/landingpage/masterplan"
        );

        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchData1 = async () => {
      try {
        const response = await axios.get(
          "https://gaca.somee.com/api/landingpage/masterplan/1"
        );
        console.log(response.data);
        setDataFetch1(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchData2 = async () => {
      try {
        const response = await axios.get(
          "https://gaca.somee.com/api/landingpage/masterplan/2"
        );
        setDataFetch2(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchData3 = async () => {
      try {
        const response = await axios.get(
          "https://gaca.somee.com/api/landingpage/masterplan/3"
        );

        setDataFetch3(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchData4 = async () => {
      try {
        const response = await axios.get(
          "https://gaca.somee.com/api/landingpage/masterplan/4"
        );

        setDataFetch4(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchData5 = async () => {
      try {
        const response = await axios.get(
          "https://gaca.somee.com/api/landingpage/masterplan/5"
        );
        setDataFetch5(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    fetchData1();
    fetchData2();
    fetchData3();
    fetchData4();
    fetchData5();
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
      <MasterPlanMain
        plan={plan}
        data={data}
        conVersion={conVersion}
        f1={dataFetch1}
        f2={dataFetch2}
        f3={dataFetch3}
        f4={dataFetch4}
        f5={dataFetch5}
      />
    </div>
  );
};

export default index;
