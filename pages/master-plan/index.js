import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MasterPlanMain from "@/components/master-plan/MasterPlanMain";
import sampleData from "@/components/master-plan/simpleData";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import axios from "axios";
const index = ({ isFeedbackVisible, handleToggleFeedback, conVersion }) => {
  const router = useRouter();
  const plan = router.query.plan;
  const [data, setData] = useState([]);
  const [dataChanged, setDataChanged] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://gaca.somee.com/api/landingpage/masterplan"
        );
        setData(response.data);
        setLoading(false);
        console.log(response.data);

        response.data[0].id = "root1";
        response.data[1].id = "root2";
        response.data[2].id = "root3";
        response.data[3].id = "root4";
        response.data[4].id = "root5";
        const newArray = response.data.map((obj) => {
          const { masterPlanLayers, ...rest } = obj;
          return { children: masterPlanLayers, ...rest };
        });
        setDataChanged(newArray);
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
      <MasterPlanMain
        plan={plan}
        elementSelect={dataChanged[plan - 1] ? dataChanged[plan - 1].title : ""}
        data={dataChanged}
        conVersion={conVersion}
      />
    </div>
  );
};

export default index;
