import "@/styles/globals.css";
import Layout from "@/components/layout/Layout";
import Head from "next/head";
import { useState } from "react";
export default function App({ Component, pageProps }) {
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  const handleToggleFeedback = () => {
    setIsFeedbackVisible(!isFeedbackVisible);
  };
  return (
    <>
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
      >
        <Component
          {...pageProps}
          isFeedbackVisible={isFeedbackVisible}
          handleToggleFeedback={handleToggleFeedback}
        />
      </Layout>
    </>
  );
}
