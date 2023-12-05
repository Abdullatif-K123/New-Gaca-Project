import React from "react";
import classes from "./home-one.module.css";
import Image from "next/image";
const SectionOne = ({ isFeedbackVisible }) => {
  return (
    <div className={classes.sectionOne}>
      <div className={classes.secOneContect}>
        <h1>eATM Portal</h1>
        <p>
          The eATM Portal provides an inegrated view of the European ATM System
          outlining the essential operational and technology changes foreseen to
          deliver the SESAR contribution to the Single European Sky performance
          objectives. As This Portal reflects the 2020 Edition of the European
          ATM Master Plan, please consult the Working Portal to have up to date
          information on the implementation progress of the Maser Plan Level 3
          (Deployment Let Level) Implementation Objectives, including Common
          Project One (CP1) SESAR Deployment Programme information.
        </p>
        <div className={classes.secOneButton}>
          <p>Download Our Master Plan</p>
        </div>
      </div>
      <div className={classes.sectionTwo}>
        <Image
          src="/assets/svg/airportstreet.svg"
          width={925}
          height={550}
          className={classes.streetPlane}
        />
        {isFeedbackVisible ? null : (
          <>
            <Image
              src="/assets/svg/streetbeauty.svg"
              width={525}
              height={350}
              className={classes.airStreetBeauty}
            />
            <Image
              src="/assets/svg/bigplane.svg"
              width={300}
              height={300}
              className={classes.planeAnimated}
            />
            <Image
              src="/assets/svg/smallplane.svg"
              width={250}
              height={250}
              className={classes.planeAnimatedtwo}
            />
          </>
        )}
      </div>
      <div className={classes.semicircle}></div>
    </div>
  );
};

export default SectionOne;
