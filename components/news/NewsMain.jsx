import React, { useEffect, useState } from "react";
import classes from "./news.module.css";
import Subscribe from "../ui/Subscribe";
import SingleCard from "./SingleCard";
import Image from "next/image";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate"; 
const NewsMain = ({ dataNews, rtl }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [leftRight, setLeftRight] = useState("left");
  const [filterData, setFilterData] = useState([]);
  const [news, setNewsData] = useState(dataNews.data);
  const router = useRouter();

  const itemsPerPage = 15; 
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
    <div className={classes.newsMain} style={{direction: rtl? "rtl": "ltr"}}>
      <div className={classes.newsSection}>
        <div className={classes.choosen}>
          <p>
            <span
              onClick={() => {
                router.push("/");
              }}
              style={{fontFamily: rtl? "DINNext-Arabic-meduim " : ""}} 
            >
              {rtl? "الرئيسية": "Home"}
            </span>
            <Image
              src="/assets/svg/Chevron.svg"
              width={16}
              height={16}
              alt="chevron"
              layout="responsive"
              style={{transform: rtl? "rotate(180deg)":""}}
            />
          </p>
          <h1 style={{fontFamily: rtl? "DINNext-Arabic-meduim " : ""}} >{rtl? "الاخبار" : "News"}</h1>
        </div>
        <div className={classes.newsCardMain2}>
          {filterData &&
            filterData.map((nws, index) => (
              <SingleCard key={nws.id} {...nws} rtl={rtl} leftRight={leftRight} />
            ))}
        </div>
        <div className={classes.paginationContainer} >
          {/* Render pagination links with updated styles */}
          <ReactPaginate
            containerClassName={classes.pagination}
            pageClassName={classes.pageItem}
            activeClassName={classes.active}
            onPageChange={(event) => setCurrentPage(event.selected)}
            pageCount={Math.ceil(news.length / itemsPerPage)}
            breakLabel="..."
            previousLabel={
              <div className={classes.paginationTerm}>
                <Image
                  src="/assets/svg/chevron-right.svg"
                  width={12}
                  height={12}
                  alt="expand-more"
                  style={{ transform: "rotate(180deg)" }}
                />
              </div>
            }
            nextLabel={
              <div className={classes.paginationTerm}>
                <Image
                  src="/assets/svg/chevron-right.svg"
                  width={12}
                  height={12}
                  alt="expand-more"
                />
              </div>
            }
          />
        </div>
      </div>
     <Subscribe rtl={rtl}/>
    </div>
  );
};

export default NewsMain;
