import React from "react";
import classes from "./home-one.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import { useFontSize } from "@/store/FontSizeContext";
import { useTranslation } from "react-i18next";
import Link from "next/link";
const SectionOne = ({ title, desc, rtl, executive }) => {
  const { t } = useTranslation();
  const { fontSizeGeneral } = useFontSize();
  const router = useRouter();
  const handleClick = () => {
    const targetElement = document.getElementById("masterplan");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  function downloadPdfFile(url, fileName) {
    // Open a new tab
    const newTab = window.open(url, "_blank");

    // Check if the new tab was successfully opened
    if (newTab) {
      // Set the download attribute for the new tab
      newTab.document.title = fileName; // Optional: Set the title of the new tab
      newTab.location.href = url; // Start the download

      // Optionally, you can close the tab after a short delay
      setTimeout(() => {
        newTab.close();
      }, 10000); // Close after 10 seconds (adjust as needed)
    } else {
      // Handle the case where the tab couldn't be opened (popup blocker)
      alert("Please allow popups for this website to download files.");
    }
  }
  return (
    <div className={classes.sectionOne} style={{ direction: rtl ? "rtl" : "" }}>
      {/* Video background */}
      <div className={classes.videoContainer}>
        <video autoPlay muted loop className={classes.video}>
          <source src="/assets/video/vid-background.mp4" type="video/mp4" />
          {/* Add additional source elements for different video formats if needed */}
          Your browser does not support the video tag.
        </video>
        <div className={classes.overlay}></div>
      </div>

      {/* Content  section in the home page section*/}
      <div className={classes.secOneContect} data-aos="fade-right">
        <h1
          style={{
            fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
            fontSize: `${55 + fontSizeGeneral}px`,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
            fontSize: `${16 + fontSizeGeneral}px`,
          }}
        >
          {parse(desc)}
        </p>

        <div
          className={classes.secOneButton}
          onClick={() => {
            downloadPdfFile(executive, "Snap_executive_view");
          }}
        >
          <p
            style={{
              fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
              fontSize: `${18 + fontSizeGeneral}px`,
            }}
          >
            {" "}
            {t("downloadDoc")}
          </p>
        </div>
      </div>
      <div
        className={classes.sectionTwo}
        style={{ marginRight: rtl ? "0px" : "" }}
      >
        <Image
          src="/assets/svg/man_with_laptop.svg"
          width={700}
          height={520}
          className={classes.streetPlane}
          alt="Banner"
          data-aos="fade-left"
          style={{ transform: rtl ? "scaleX(-1)" : "" }}
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
