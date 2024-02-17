import React, { useState } from "react";
import classes from "../news/news.module.css";
import Link from "next/link";
import SingleCard from "../news/SingleCard";
import Image from "next/image";
const NewsLandingpage = ({ news }) => {
  const [filterData, setFilterData] = useState([]);

  const [startIndex, setStartIndex] = useState(0);
  const [leftRight, setLeftRight] = useState("left");
  // Handling right arrow button
  const handleRight = () => {
    setLeftRight("right");
    setStartIndex((prevIndex) => (prevIndex + 1) % news.length);
  };
  // Handling left arrow button
  const handleLeft = () => {
    setLeftRight("left");
    setStartIndex((prevIndex) => (prevIndex - 1 + news.length) % news.length);
  };
  const visibleNews = [
    news[(startIndex - 1 + news.length) % news.length],
    news[startIndex],
    news[(startIndex + 1) % news.length],
  ];
  console.log(news);
  console.log(visibleNews);
  return (
    <div className={classes.newsHeader}>
      <div className={classes.newsTopHeading}>
        <h3>
          Our <span>News</span>
        </h3>

        <Link href={"/news"}>View all</Link>
      </div>
      <div className={classes.newsCardMain}>
        <button className={classes.newsArrow} onClick={handleLeft}>
          <Image
            src="/assets/svg/arrowLeftGray.svg"
            width={24}
            height={24}
            alt="arrowLeft"
          />
        </button>
        {visibleNews.map((newsData, index) => (
          <SingleCard key={newsData.id} {...newsData} leftRight={leftRight} />
        ))}
        <button
          className={`${classes.newsArrow} ${classes.newsArrowRigt}`}
          onClick={handleRight}
        >
          <Image
            src="/assets/svg/arrowLeftGray.svg"
            width={24}
            height={24}
            alt="arrowLeft"
            className={classes.arrowRight}
          />
        </button>
      </div>
    </div>
  );
};

export default NewsLandingpage;
