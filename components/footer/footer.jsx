import React from "react";
import classes from "./home-bottom.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
const Footer = () => {
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
          <li>
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
          <p>© 2023, All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
