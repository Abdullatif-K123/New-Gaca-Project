import React, { useState } from "react";
import classes from "./layout.module.css";
import Image from "next/image";
import Feedback from "../home/Home-main/Feedback";
const Navbar = ({ isFeedbackVisible, handleToggleFeedback }) => {
  console.log("feedback is now is", isFeedbackVisible);
  return (
    <>
      <nav
        className={classes.navMain}
        onClick={() => {
          isFeedbackVisible ? handleToggleFeedback() : null;
        }}
        style={{
          filter: isFeedbackVisible ? "brightness(0.5)" : "brightness(1)",
          transition: "all 0.6s ease-in-out",
        }}
      >
        <div className={classes.logo}>
          <Image src="/assets/svg/Logo.svg" width={140} height={47} />
        </div>
        <div className={classes.navSections}>
          <ul className={classes.section}>
            <li>Home</li>
            <li>About GACA</li>
            <li>Download</li>
            <li>News</li>
            <li>
              Constructor{" "}
              <Image src="/assets/svg/share1.svg" width={17} height={17} />
            </li>
          </ul>
        </div>
        <div className={classes.feedBackSection} onClick={handleToggleFeedback}>
          <div className={classes.btnFeedback}>
            <Image src="/assets/svg/review1.svg" width={23} height={23} />
            <p>Feedback</p>
          </div>
        </div>
      </nav>
      <Feedback
        isFeedbackVisible={isFeedbackVisible}
        handleToggleFeedback={handleToggleFeedback}
      />
    </>
  );
};

export default Navbar;
