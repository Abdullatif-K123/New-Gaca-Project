import React from "react";
import { useRouter } from "next/router";
import classes from "./SingleNews.module.css";
import Image from "next/image";
import parse from "html-react-parser";
import { API_ROUTES } from "@/utils/apiConfig";
const SingleNews = ({ data }) => {
  const date = new Date(data.dateCreated);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-indexed
  const day = date.getDate().toString().padStart(2, "0");

  const humanReadableDate = `${year}-${month}-${day}`;
  const router = useRouter();
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
          <span
            onClick={() => {
              router.push("/news");
            }}
          >
            News
          </span>
          <Image src="/assets/svg/Chevron.svg" width={16} height={16} />
          <span>{data?.title.slice(0, 30)}...</span>
        </p>
      </div>
      <div className={classes.newsDetails}>
        <img
          src={`${API_ROUTES.domainName}/${data.imageUrl}`}
          width={500}
          height={500}
          alt={data.title.slice(0, 20)}
        />
        <div className={classes.newsContent}>
          <div className={classes.contentHead}>
            <p>{data?.title}</p>
          </div>
          <div className={classes.contentBody}>
            <div className={classes.contentDate}>
              <Image
                src="/assets/svg/calender.svg"
                width={24}
                height={24}
                alt="calender"
              />
              <p>{humanReadableDate}</p>
            </div>
            <p>{parse(data?.description)}</p>
            {/* <button className={classes.newsShare}>
              <Image
                src="/assets/svg/share.svg"
                width={20}
                height={20}
                alt="share"
              />
              <p>Share Link</p>
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleNews;
