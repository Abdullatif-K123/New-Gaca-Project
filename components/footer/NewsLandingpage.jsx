import React from "react";
import classes from "./home-bottom.module.css";
import Link from "next/link";
const NewsLandingpage = ({ dataNews }) => {
  const [filterData, setFilterData] = useState([]);
  const [news, setNewsData] = useState(dataNews.data);

  useEffect(() => {
    setFilterData([]);
  }, [currentPage, dataNews]);

  return (
    <div className={classes.newsHeader}>
      <div className={classes.newsTopHeading}>
        <h3>
          Our <span>News</span>
        </h3>
        <Link href={"/news"}>View all</Link>
      </div>
      <div className={classes.newsCards}></div>
    </div>
  );
};

export default NewsLandingpage;
