import React from "react";
import classes from "./news.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSpring, animated } from "react-spring";
const SingleCard = ({ title, img, date, summary, leftRight, id }) => {
  const router = useRouter();
  const cardProps = useSpring({
    from: {
      opacity: 0,
      transform: `${
        leftRight === "left" ? "translateX(-20%)" : "translateX(20%) "
      }`,
    },
    to: { opacity: 1, transform: "translateX(0%)" },
    config: { tension: 0, friction: 1 },
  });
  return (
    <animated.div
      className={classes.newsCard}
      style={{ ...cardProps }}
      onClick={() => {
        router.push(`/news/${id}`);
      }}
    >
      <div className={classes.newsCardHead}>
        <Image src={img} width={385} height={180} alt="news-photo" />
        <p>{title}</p>
      </div>
      <div className={classes.newsCardBody}>
        <div className={classes.newsDate}>
          <Image
            src="/assets/svg/calender.svg"
            width={25}
            height={25}
            alt="calender"
          />
          <p>{date}</p>
        </div>
        <p>{summary}</p>
      </div>
    </animated.div>
  );
};

export default SingleCard;
