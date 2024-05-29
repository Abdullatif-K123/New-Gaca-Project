import React, { useEffect, useRef, useState } from "react";
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

const options = {
  animateOut: "slideOutDown",
  animateIn: "flipInX", 
  items: 3,
  margin: 40,
  stagePadding: 18,
  smartSpeed: 450,
  loop: true,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
  autoplay: true,

  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 3,
    },
  },
};

const NewsLandingpage = React.memo(({ news,rtl }) => {
  const [currentSlide, setCurrentSlide] = useState(1); 
  useEffect(()=>{handleLeft()}, [rtl])
  const handleRight = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % news.length);
  };

  const handleLeft = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + news.length) % news.length);
  };
  //refresh the page or rerender it the component for every rtl
   
  return (
    <div className={classes.newsHeader}>
      <div className={classes.newsTopHeading} style={{direction:rtl? "rtl": ""}}>
        <h3 style={{fontFamily: rtl? "DINNext-Arabic-meduim " : ""}} >
          {rtl? "أخبارنا":"Last"} <span>{!rtl? "News": ""}</span>
        </h3>

        <Link href={"/news"}>{rtl? "عرض الكل": "All news"}</Link>
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
            animateIn={true}
            className="owl-carousel owl-theme"
            {...options}
            center={true}
            dots={false}
          >
            {news.map((newsData, index) => (
              <SingleCard key={newsData.id} {...newsData} rtl={rtl} />
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
});

export default NewsLandingpage;
