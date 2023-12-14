import React from "react";
import { useRouter } from "next/router";
import SingleNews from "@/components/singleNews/SingleNews";
import newsData from "@/components/news/NewsData";
import Footer from "@/components/footer/footer";
const NewsId = () => {
  const router = useRouter();
  const id = router.query.id;
  const newsDetails = newsData.find((news) => {
    return news.id == id;
  });

  return (
    <div>
      <SingleNews id={id} newsDetails={newsDetails} />
      <Footer />
    </div>
  );
};

export default NewsId;
