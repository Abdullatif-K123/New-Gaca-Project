import React, { useRef, useState } from "react";
import classes from "../news/news.module.css";
import Link from "next/link";
import SingleCard from "../news/SingleCard";
import Image from "next/image";

var $ = require("jquery");
if (typeof window !== "undefined") {
  window.$ = window.jQuery = require("jquery");
}
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});
const Responsive = {
  0: {
    items: 1.5,
    margin: 5,
  },
  768: {
    items: 2.5,
    margin: 10,
  },
  1024: {
    items: 3.5,
    margin: 20,
  },
};
const options = {
  animateOut: "slideOutDown",
  animateIn: "flipInX",
  items: 3,
  margin: 40,
  stagePadding: 30,
  smartSpeed: 450,
  loop: true,
};
const NewsLandingpage = ({ news }) => {
  const [filterData, setFilterData] = useState([]);
  const owlCarouselRef = useRef(null);
  const [startIndex, setStartIndex] = useState(0);
  const [leftRight, setLeftRight] = useState("left");
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleRight = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % news.length);
  };

  const handleLeft = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + news.length) % news.length);
  };
  const visibleNews = [
    news[(startIndex - 1 + news.length) % news.length],
    news[startIndex],
    news[(startIndex + 1) % news.length],
  ];
  return (
    <div className={classes.newsHeader}>
      <div className={classes.newsTopHeading}>
        <h3>
          Our <span>News</span>
        </h3>

        <Link href={"/news"}>View all</Link>
      </div>
      <div className={classes.newsCardMain} style={{ padding: "32px 0px" }}>
        <button className={classes.newsArrow} onClick={handleLeft}>
          <Image
            src="/assets/svg/arrowLeftGray.svg"
            width={24}
            height={24}
            alt="arrowLeft"
          />
        </button>
        <div
          style={{
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            display: "inline-block",
          }}
        >
          <OwlCarousel
            startPosition={currentSlide}
            className="owl-theme"
            {...options}
            center={true}
          >
            {news.map((newsData, index) => (
              <SingleCard
                key={newsData.id}
                {...newsData}
                leftRight={leftRight}
              />
            ))}
          </OwlCarousel>
        </div>
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
