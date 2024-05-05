import React from "react";
import FAQs from "@/components/FAQs/FAQs";
import Footer from "@/components/footer/footer";
import { API_ROUTES } from "@/utils/apiConfig";
import axios from "axios";
const index = ({ conVersion, data }) => { 
  
  return (
    <div>
      <FAQs data={data} />
      <Footer conVersion={conVersion} />
    </div>
  );
};

export async function getStaticProps() { 
  try {
    const response = await axios.get(API_ROUTES.FAQ.get);
    return {
      props: {
        data: response.data, 
      },
      revalidate: 10, // Cache validation time in seconds
  }
 } catch (error) {
    console.log('Error fetching data:', error);
    return null;
  }
};

export default index;
