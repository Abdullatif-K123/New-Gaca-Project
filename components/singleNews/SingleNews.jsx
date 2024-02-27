import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import classes from "./SingleNews.module.css";
import Image from "next/image";
import parse from "html-react-parser";
import { API_ROUTES } from "@/utils/apiConfig";
import SingleCard from "../news/SingleCard";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "../ui/LoadingSpinner";
const SingleNews = ({ id }) => {
  const [data, setData] = useState({});

  const [loading, setLoading] = useState(true);
  const date = new Date(data.dateCreated);
  const notify = () => toast("The link has been copied.", { icon: "👏" });
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-indexed
  const day = date.getDate().toString().padStart(2, "0");

  const humanReadableDate = `${year}-${month}-${day}`;
  const router = useRouter();
  //Fetching data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_ROUTES.blogs.get}/${id}`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  if (loading) {
    return <LoadingSpinner />;
  }
  //handling share link button
  const handleClickShare = () => {
    notify();
    navigator.clipboard.writeText("https://e-snap.vercel.app" + router.asPath);
  };
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
        </p>
        <h1>{data?.title}</h1>
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
            <button className={classes.newsShare} onClick={handleClickShare}>
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
      <div className={classes.articleRelated}>
        <p>
          <span>Articles</span> Related
        </p>
        <div className={classes.newsCardMain2}>
          {[1, 2, 3].map((nws, index) => (
            <SingleCard
              key={index}
              title={data.title}
              description={data.description}
              dateCreated={data.dateCreated}
              imageUrl={data.imageUrl}
            />
          ))}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default SingleNews;
