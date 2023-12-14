import React from "react";
import { useRouter } from "next/router";
import MasterPlanMain from "@/components/master-plan/MasterPlanMain";
import sampleData from "@/components/master-plan/simpleData";
const index = () => {
  const router = useRouter();
  const plan = router.query.plan;
  return (
    <div>
      <MasterPlanMain plan={plan} data={sampleData} />
    </div>
  );
};

export default index;
