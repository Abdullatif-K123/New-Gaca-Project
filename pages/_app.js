import "@/styles/globals.css";
import Layout from "@/components/layout/Layout";
import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios"; 
import { API_ROUTES } from "@/utils/apiConfig";
export default function App({ Component, pageProps }) {
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [rtl, setRtl] = useState(false); 
  const [accessiblity, setAccessiblity] = useState(false); 
  //handling language rtl i18l localization
  const handleRtl = ()=>{
      setRtl(!rtl); 
  }
  const handleAccessibility = ()=>{
     setAccessiblity(!accessiblity);
  }
  const handleToggleFeedback = () => {
    setIsFeedbackVisible(!isFeedbackVisible);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_ROUTES.settings.get);
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  // if (loading) {
  //   return <LoadingSpinner />;
  // }
  return (
    <div style={{filter: accessiblity?   "grayscale(100%)" : "" }}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&family=Cairo:wght@400;500;700&family=Fira+Code:wght@300;400;500;600;700&family=Montserrat:wght@100;200;400;500;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <title>GACA</title>
      </Head>

      <Layout
        isFeedbackVisible={isFeedbackVisible}
        handleToggleFeedback={handleToggleFeedback}
        conVersion={data}
        rtl={rtl}
        handleRtl={handleRtl} 
        handleAccessibility={handleAccessibility}
      >
        <Component
          {...pageProps}
          rtl={rtl}
          handleRtl={handleRtl}
          isFeedbackVisible={isFeedbackVisible}
          handleToggleFeedback={handleToggleFeedback}
          conVersion={data}
        />
      </Layout>
    </div>
  );
}
