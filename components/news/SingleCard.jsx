import React from "react";
import classes from "./news.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSpring, animated } from "react-spring";
import parse from "html-react-parser";
import { API_ROUTES } from "@/utils/apiConfig";
const SingleCard = ({
  title, 
  summary,
  leftRight,
  id, 
  description,
  imageUrl,
  titleEN, 
  descriptionEN,
  createdAt,
   rtl

}) => { 
  const date = new Date(createdAt);
  const src = imageUrl? API_ROUTES.domainName +'/'+imageUrl : "/assets/imges/img3.jpg"
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-indexed
  const day = date.getDate().toString().padStart(2, "0"); 
  const humanReadableDate = `${year}-${month}-${day}`;
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
      style={{ ...cardProps, direction: rtl? "rtl": "" }}
      onClick={() => {
        router.push(`/news/${id}`);
      }}
      
    >
      <div className={classes.newsCardHead}>
        <img
          src={src}
          width={385}
          height={180}
          alt={titleEN?.slice(0, 20)}
        />
        <p>{rtl? title:titleEN}</p>
      </div>
      <div className={classes.newsCardBody}>
        <div className={classes.newsDate}  > 
          <Image
            src="/assets/svg/calender.svg"
            width={25}
            height={25}
            alt="calender"
          />
          <p>{humanReadableDate}</p>
        </div>
        <p>{parse(rtl? description?.slice(0,170):descriptionEN?.slice(0, 170))}...</p>
      </div>
    </animated.div>
  );
};

export default SingleCard;
