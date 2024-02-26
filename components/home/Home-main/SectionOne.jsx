import React from "react";
import classes from "./home-one.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import parse from "html-react-parser";
const SectionOne = ({ isFeedbackVisible, title, desc }) => {
  const router = useRouter();
  const handleClick = () => {
    const targetElement = document.getElementById("masterplan");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className={classes.sectionOne}>
      <div className={classes.secOneContect}>
        <h1>{title}</h1>
        <p>{parse(desc)}</p>
        <div
          className={classes.secOneButton}
          onClick={() => {
            router.push("/download");
          }}
        >
          <p>Download SNAP Documents</p>
        </div>
      </div>
      <div className={classes.sectionTwo}>
        <Image
          src="/assets/imges/Brochure-landingpage.webp"
          width={700}
          height={520}
          className={classes.streetPlane}
        />
      </div>
      <div className={classes.btnDown} onClick={handleClick}>
        <Image
          src="/assets/svg/arrow-down.svg"
          width={24}
          height={24}
          alt="arrow-down"
          className={classes.arrowDown}
        />
      </div>
    </div>
  );
};

export default SectionOne;
