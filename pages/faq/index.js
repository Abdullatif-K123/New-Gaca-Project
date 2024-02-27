import React from "react";
import FAQs from "@/components/FAQs/FAQs";
import Footer from "@/components/footer/footer";
const index = ({ conVersion }) => {
  return (
    <div>
      <FAQs />
      <Footer conVersion={conVersion} />
    </div>
  );
};

export default index;
