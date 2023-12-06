import React from "react";
import classes from "./about.module.css";
import Image from "next/image";
const AboutSection = ({ title, desc1, desc2 }) => {
  return (
    <div className={classes.aboutSec1}>
      <div className={classes.sec1Header}>
        <p>{title}</p>
        <div className={classes.planeImg}>
          <Image
            src="/assets/svg/linePlane.svg"
            width={70}
            height={25}
            alt="line"
          />
          <Image
            src="/assets/svg/plainy.svg"
            width={22}
            height={19}
            alt="line"
          />
        </div>
      </div>
      <p>{desc1}</p>
      <p>{desc2}</p>
    </div>
  );
};

export default AboutSection;
