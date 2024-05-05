import HomePage from "@/components/home/HomePage";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Home({
  isFeedbackVisible,
  handleToggleFeedback,
  conVersion,
  data, 
}) {
  console.log(data) 
  return (
    <div>
      <HomePage
        isFeedbackVisible={isFeedbackVisible}
        handleToggleFeedback={handleToggleFeedback}
        conVersion={conVersion}
        dataHome={data}
      />
    </div>
  );
}

export async function getStaticProps() {
  // Implement cache logic here
  try {
    const response = await axios.get('https://snap.somee.com/api/home');
    return {
      props: {
        data: response.data, 
      },
      revalidate: 10, // Cache validation time in seconds
  }
 } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
