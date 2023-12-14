import React, { useState } from "react";
import classes from "./news.module.css";
import newsData from "./NewsData";
import SingleCard from "./SingleCard";
import Image from "next/image";
import { useRouter } from "next/router";
const NewsMain = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [leftRight, setLeftRight] = useState("left");
  const router = useRouter();
  const handleNext = () => {
    setLeftRight("right");
    setStartIndex((prevIndex) => (prevIndex + 1) % newsData.length);
  };

  const handlePrev = () => {
    setLeftRight("left");
    setStartIndex(
      (prevIndex) => (prevIndex - 1 + newsData.length) % newsData.length
    );
  };
  const visibleNews = [
    newsData[(startIndex - 1 + newsData.length) % newsData.length],
    newsData[startIndex],
    newsData[(startIndex + 1) % newsData.length],
  ];

  return (
    <div className={classes.newsMain}>
      <div className={classes.newsSection}>
        <div className={classes.choosen}>
          <p>
            <span
              onClick={() => {
                router.push("/");
              }}
            >
              Home
            </span>
            <Image
              src="/assets/svg/Chevron.svg"
              width={16}
              height={16}
              alt="chevron"
            />
            <span>News</span>
          </p>
        </div>
        <h1>News</h1>
        <div className={classes.newsCardMain}>
          <button className={classes.newsArrow} onClick={handlePrev}>
            <Image
              src="/assets/svg/arrowLeftGray.svg"
              width={24}
              height={24}
              alt="arrowLeft"
            />
          </button>
          {visibleNews.map((news, index) => (
            <SingleCard key={news.id} {...news} leftRight={leftRight} />
          ))}
          <button
            className={`${classes.newsArrow} ${classes.newsArrowRigt}`}
            onClick={handleNext}
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
    </div>
  );
};

export default NewsMain;
