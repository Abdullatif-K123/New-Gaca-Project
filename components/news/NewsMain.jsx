import React, { useState } from "react";
import classes from "./news.module.css";
import newsData from "./NewsData";
import SingleCard from "./SingleCard";
import Image from "next/image";
import { useRouter } from "next/router";
const NewsMain = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [leftRight, setLeftRight] = useState("left");
  const router = useRouter();

  const itemsPerPage = 6;
  const visibleNews = newsData.slice(
    currentPage === 1 ? 0 : 6,
    currentPage === 1 ? 6 : newsData.length
  );
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
          {visibleNews.map((news, index) => (
            <SingleCard key={news.id} {...news} leftRight={leftRight} />
          ))}
        </div>
        <div className={classes.paginationContainer}>
          {/* Render pagination links with updated styles */}
          {[...Array(Math.ceil(newsData.length / itemsPerPage)).keys()].map(
            (page) => (
              <span
                key={page + 1}
                onClick={() => setCurrentPage(page + 1)}
                className={`${classes.paginationLink} ${
                  currentPage === page + 1 ? classes.active : ""
                }`}
              >
                {page + 1}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsMain;
