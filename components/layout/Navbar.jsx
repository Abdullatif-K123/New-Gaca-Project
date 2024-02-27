import React, { useState } from "react";
import classes from "./layout.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import DialogModal from "../ui/DialogModal";
import FeedBack from "./FeedBack";
const Navbar = ({
  handleSubmitFeedback,
  isFeedbackVisible,
  handleToggleFeedback,
  conVersion,
}) => {
  // creating function menu hamburger
  const [addClass, setAddClass] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //setting up state and functions for feedback dialog
  const [openFeedback, setOpenFeedback] = useState(false);
  const handleClickOpenFeedback = () => {
    document.body.style.overflow = "hidden";
    console.log("open");
    setOpenFeedback(true);
  };
  const handleCloseFeedback = () => {
    document.body.style.overflow = "scroll";
    setOpenFeedback(false);
  };
  const mobileMenu = () => {
    const hamburger = document.querySelector(".hamburger");
    hamburger.classList.toggle("active");
    setAddClass(!addClass);
  };
  const router = useRouter();
  const path = router.pathname.split("/").pop();

  const aboutPath = path.length > 2;
  const likeAndOpenLink = (link) => {
    // Perform the action to simulate a "like" (replace with your actual like functionality)

    // Open a new tab or window with the specified URL
    window.open(link, "_blank");
  };
  return (
    <>
      <div
        className={`${classes.navModified} ${
          aboutPath ? classes.aboutModified : null
        }`}
        onClick={() => {
          isFeedbackVisible ? handleToggleFeedback() : null;
        }}
        style={{
          filter: isFeedbackVisible ? "brightness(0.5)" : "brightness(1)",
          transition: "all 0.6s ease-in-out",
        }}
        id="home"
      >
        <nav className={`${classes.navMain}  `}>
          <div className={classes.logo}>
            <Image
              src={"/assets/svg/whiteLogo.svg"}
              width={140}
              height={47}
              alt="logo"
              onClick={() => {
                router.push("/");
              }}
            />
          </div>
          <div
            className={`${classes.navSections} ${
              addClass ? classes.navContentHam : null
            }`}
          >
            <ul className={`${classes.section}  `}>
              <li
                onClick={() => {
                  mobileMenu();
                  router.push("/");
                }}
                className={`${path.length ? null : classes.activeHome}`}
              >
                Home
              </li>
              <li
                onClick={() => {
                  mobileMenu();
                  router.push("/about");
                }}
                className={`${path === "about" ? classes.active : null}`}
              >
                About SNAP
              </li>
              <li
                onClick={() => {
                  mobileMenu();
                  router.push("/download");
                }}
                className={`${path === "download" ? classes.active : null}`}
              >
                Downloads
              </li>
              <li
                onClick={() => {
                  mobileMenu();
                  router.push("/news");
                }}
                className={`${path === "news" ? classes.active : null}`}
              >
                News
              </li>
              <li
                onClick={() => {
                  mobileMenu();
                  router.push("/faq");
                }}
                className={`${path === "faq" ? classes.active : null}`}
              >
                FAQ
              </li>
              <li
                onClick={() => {
                  mobileMenu();
                  handleClickOpen();
                }}
              >
                Constructor{" "}
              </li>
            </ul>
          </div>

          <div
            className={`${classes.feedBackSection} ${
              addClass ? classes.navAuthHam : null
            }`}
          >
            <p className={classes.language}>AR</p>
            <div className={classes.vision}>
              <Image
                src={"/assets/svg/vision-2030.svg"}
                width={98}
                height={67}
                alt="vision-2030"
              />
            </div>
            <div
              className={classes.btnFeedback}
              onClick={() => {
                mobileMenu();
                handleClickOpenFeedback();
              }}
            >
              <Image
                src="/assets/svg/review1.svg"
                width={23}
                height={23}
                alt="review"
              />
              <p>Feedback</p>
            </div>
          </div>
          <div className="hamburger" onClick={mobileMenu}>
            <span className={`bar  `}></span>
            <span className={`bar  `}></span>
            <span className={`bar `}></span>
          </div>
        </nav>
      </div>
      <DialogModal
        open={open}
        handleClose={handleClose}
        openLink={likeAndOpenLink}
      />
      <FeedBack
        handleSubmitFeedback={handleSubmitFeedback}
        open={openFeedback}
        handleClose={handleCloseFeedback}
      />
    </>
  );
};

export default Navbar;
