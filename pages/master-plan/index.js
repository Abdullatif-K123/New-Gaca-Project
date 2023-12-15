import React from "react";
import { useRouter } from "next/router";
import MasterPlanMain from "@/components/master-plan/MasterPlanMain";
import sampleData from "@/components/master-plan/simpleData";
const index = ({ isFeedbackVisible, handleToggleFeedback }) => {
  const router = useRouter();
  const plan = router.query.plan;
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
      <MasterPlanMain plan={plan} data={sampleData} />
    </div>
  );
};

export default index;
