import React from "react";

import classes from "./SingleNews.module.css";
import Image from "next/image";
const SingleNews = ({ newsDetails }) => {
  return (
    <div className={classes.newsMain}>
      <div className={classes.choosen}>
        <p>
          <span
            onClick={() => {
              router.push("/");
            }}
          >
            Home
          </span>
          <Image src="/assets/svg/Chevron.svg" width={16} height={16} />
          <span>News</span>
          <Image src="/assets/svg/Chevron.svg" width={16} height={16} />
          <span>{newsDetails?.title.slice(0, 30)}...</span>
        </p>
      </div>
      <div className={classes.newsDetails}>
        <Image
          src={newsDetails?.img}
          width={620}
          height={600}
          alt="news-photo"
        />
        <div className={classes.newsContent}>
          <div className={classes.contentHead}>
            <p>{newsDetails?.title}</p>
          </div>
          <div className={classes.contentBody}>
            <div className={classes.contentDate}>
              <Image
                src="/assets/svg/calender.svg"
                width={24}
                height={24}
                alt="calender"
              />
              <p>{newsDetails?.date}</p>
            </div>
            <p>{newsDetails?.desc}</p>
            <button className={classes.newsShare}>
              <Image
                src="/assets/svg/share.svg"
                width={20}
                height={20}
                alt="share"
              />
              <p>Share Link</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleNews;
