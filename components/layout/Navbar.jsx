import React, { useState } from "react";
import classes from "./layout.module.css";
import Image from "next/image";
import Feedback from "../home/Home-main/Feedback";
import { useRouter } from "next/router";
const Navbar = ({ isFeedbackVisible, handleToggleFeedback }) => {
  // creating function menu hamburger
  const [addClass, setAddClass] = useState(false);
  const mobileMenu = () => {
    const hamburger = document.querySelector(".hamburger");
    hamburger.classList.toggle("active");
    setAddClass(!addClass);
  };
  const router = useRouter();
  const path = router.pathname.split("/").pop();
  const aboutPath = path === "about";
  return (
    <>
      <nav
        className={`${classes.navMain} ${aboutPath ? classes.aboutNav : null}`}
        onClick={() => {
          isFeedbackVisible ? handleToggleFeedback() : null;
        }}
        style={{
          filter: isFeedbackVisible ? "brightness(0.5)" : "brightness(1)",
          transition: "all 0.6s ease-in-out",
        }}
      >
        <div className={classes.logo}>
          <Image
            src={
              aboutPath ? "/assets/svg/LogoAbout.svg" : "/assets/svg/Logo.svg"
            }
            width={140}
            height={aboutPath ? 64 : 47}
          />
        </div>
        <div
          className={`${classes.navSections} ${
            addClass ? classes.navContentHam : null
          }`}
        >
          <ul
            className={`${classes.section} ${
              aboutPath ? classes.secAbout : null
            }`}
          >
            <li
              onClick={() => {
                mobileMenu();
                router.push("/");
              }}
            >
              Home
            </li>
            <li
              onClick={() => {
                mobileMenu();
                router.push("/about");
              }}
            >
              About GACA
            </li>
            <li
              o
              onClick={() => {
                mobileMenu();
                router.push("/download");
              }}
            >
              Downloads
            </li>
            <li onClick={mobileMenu}>News</li>
            <li onClick={mobileMenu}>
              Constructor{" "}
              <Image
                src={
                  aboutPath
                    ? "/assets/svg/share1Gray.svg"
                    : "/assets/svg/share1.svg"
                }
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
          <span className={`bar ${aboutPath ? "aboutBar" : null}`}></span>
          <span className={`bar ${aboutPath ? "aboutBar" : null}`}></span>
          <span className={`bar ${aboutPath ? "aboutBar" : null}`}></span>
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
