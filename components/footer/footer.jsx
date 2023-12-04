import React from "react";
import classes from "./home-bottom.module.css";
import Image from "next/image";
const Footer = () => {
  return (
    <div className={classes.footerMain}>
      <div className={classes.footerContentMain}>
        <ul className={classes.footerContent}>
          <li>About us</li>
          <li>Downloads</li>
          <li>News</li>
          <li>
            Constructor{" "}
            <Image src="/assets/svg/share1.svg" width={17} height={17} />
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
