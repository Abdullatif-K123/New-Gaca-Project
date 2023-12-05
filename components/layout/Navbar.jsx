import React, { useState } from "react";
import classes from "./layout.module.css";
import Image from "next/image";
import Feedback from "../home/Home-main/Feedback";
const Navbar = ({ isFeedbackVisible, handleToggleFeedback }) => {
  // creating function menu hamburger
  const [addClass, setAddClass] = useState(false);
  const mobileMenu = () => {
    const hamburger = document.querySelector(".hamburger");
    hamburger.classList.toggle("active");
    setAddClass(!addClass);
  };
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
        <div
          className={`${classes.navSections} ${
            addClass ? classes.navContentHam : null
          }`}
        >
          <ul className={classes.section}>
            <li onClick={mobileMenu}>Home</li>
            <li onClick={mobileMenu}>About GACA</li>
            <li onClick={mobileMenu}>Download</li>
            <li onClick={mobileMenu}>News</li>
            <li onClick={mobileMenu}>
              Constructor{" "}
              <Image
                src="/assets/svg/share1.svg"
                width={17}
                height={17}
                className={classes.imgMini}
              />
            </li>
          </ul>
        </div>
        <div
          className={`${classes.feedBackSection} ${
            addClass ? classes.navAuthHam : null
          }`}
          onClick={handleToggleFeedback}
        >
          <div className={classes.btnFeedback} onClick={mobileMenu}>
            <Image src="/assets/svg/review1.svg" width={23} height={23} />
            <p>Feedback</p>
          </div>
        </div>
        <div className="hamburger" onClick={mobileMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
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
