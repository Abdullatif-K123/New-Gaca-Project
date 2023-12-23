import React, { useEffect, useState } from "react";
import classes from "./news.module.css";
import newsData from "./NewsData";
import SingleCard from "./SingleCard";
import Image from "next/image";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
const NewsMain = ({ dataNews }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [leftRight, setLeftRight] = useState("left");
  const [filterData, setFilterData] = useState([]);
  const [news, setNewsData] = useState(dataNews.data);
  const router = useRouter();

  const itemsPerPage = 15;
  console.log(news);
  useEffect(() => {
    setFilterData(
      news.filter((item, index) => {
        return (
          (index >= currentPage * itemsPerPage) &
          (index < (currentPage + 1) * itemsPerPage)
        );
      })
    );
  }, [currentPage, dataNews]);

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
          {filterData &&
            filterData.map((nws, index) => (
              <SingleCard key={nws.id} {...nws} leftRight={leftRight} />
            ))}
        </div>
        <div className={classes.paginationContainer}>
          {/* Render pagination links with updated styles */}
          <ReactPaginate
            containerClassName={classes.pagination}
            pageClassName={classes.pageItem}
            activeClassName={classes.active}
            onPageChange={(event) => setCurrentPage(event.selected)}
            pageCount={Math.ceil(news.length / itemsPerPage)}
            breakLabel="..."
            previousLabel={
              <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
                <AiFillLeftCircle />
              </IconContext.Provider>
            }
            nextLabel={
              <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
                <AiFillRightCircle />
              </IconContext.Provider>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default NewsMain;
