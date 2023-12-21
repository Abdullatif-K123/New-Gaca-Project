import React, { useEffect, useState } from "react";
import classes from "./home-bottom.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
const Footer = ({ conVersion }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const likeAndOpenLink = (link) => {
    // Perform the action to simulate a "like" (replace with your actual like functionality)

    // Open a new tab or window with the specified URL
    window.open(link, "_blank");
  };
  //Getting current year
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  const router = useRouter();
  return (
    <div className={classes.footerMain}>
      <div className={classes.footerContentMain}>
        <ul className={classes.footerContent}>
          <li
            onClick={() => {
              router.push("/about");
            }}
          >
            About us
          </li>
          <li
            onClick={() => {
              router.push("/download");
            }}
          >
            Downloads
          </li>
          <li
            onClick={() => {
              router.push("/news");
            }}
          >
            News
          </li>
          <li
            onClick={() => {
              likeAndOpenLink(conVersion?.constructor);
            }}
          >
            Constructor{" "}
            <Image
              src="/assets/svg/share1.svg"
              width={17}
              height={17}
              alt="share1"
            />
          </li>
        </ul>
        <div className={classes.footerCopyRight}>
          <p>
            © {currentYear} {conVersion?.copyright},(V {conVersion?.version})
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
