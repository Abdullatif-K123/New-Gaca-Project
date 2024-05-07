import React, { useState } from "react";
import classes from "./layout.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import DialogModal from "../ui/DialogModal";
import FeedBack from "./FeedBack";
import Link from "next/link";
const Navbar = ({
  handleSubmitFeedback,
  isFeedbackVisible,
  handleToggleFeedback,
  conVersion,
  rtl,
  handleRtl,
  handleAccessibility
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
  // Function to format the current date in the desired Arabic format
function formatArabicDate() {
  const now = new Date();

  // Options for formatting the date in Arabic
  const options = {
      weekday: 'long', // Full day name (الاحد)
      day: 'numeric', // Day of the month (٢٧)
      month: 'long', // Full month name (مارس)
      year: 'numeric', // Year (٢٠٢٢)
      era: 'short', // Era (٢٣ شعبان ١٤٤٣)
     hour: '2-digit', // Hour (٠٧)
      minute: '2-digit', // Minute (١٣)
  };

  // Format the date and return the result
  return new Intl.DateTimeFormat(!rtl? 'us':'ar-SA-u-nu-latn', options).format(now);
}
  return (
    <>
    <div className={classes.navBottom} style={{direction: rtl? "rtl": ""}}> 
        <div className={classes.langAcess}  >
          <div className={`${classes.languageRtl} ${rtl? classes.langArabic: ""}`}onClick={handleRtl} style={{borderLeft: rtl? "1px solid #fff": ""}}  >
             <Image src="/assets/svg/icon-language.svg" width={30} height={30} alt="lang"/>
              <p>{rtl? "عربي" : "English"}</p>
             </div>
              <Image onClick={handleAccessibility} src="/assets/svg/accessability.svg" width={20} height={20} alt="accessability" style={{cursor: "pointer"}} />
            <div className={classes.fonts} style={{direction: rtl? "rtl": ""}}>
                <p>A+</p>
                <p>AA</p>
                <p>A-</p> 
            </div>
        </div>
        <div className={classes.contactDate} style={{alignItems : rtl? "flex-start":"flex-end"}}  >
          <div className={classes.emailSec} style={{direction: rtl? "rtl": ""}}>
             <Link href="mailto:info@gmail.com?subject=Inquire%20About%20something"><p>info@gmail.com</p></Link>
             <Image src="/assets/svg/mail.svg" width={15} height={15} alt="mail"/>
          </div>
            <div className={classes.phoneSec} style={{direction: rtl? "rtl": ""}} >
              <Link href="tel:+1234567"><p>12345678</p></Link> 
               <Image src="/assets/svg/phone.svg" width={15} height={15} alt="phone"/>
               <p>{rtl? "الاتصال": "Phone"}</p>
            </div>
              <div className={classes.dateSaudi}>
                 <p>{formatArabicDate()}</p>
              </div>
        </div>
    </div>
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
          direction: rtl? "rtl" : ""
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
                {rtl? "الرئيسية" :"Home"}
              </li>
              <li
                onClick={() => {
                  mobileMenu();
                  router.push("/about");
                }}
                className={`${path === "about" ? classes.active : null}`}
              >
                {rtl? "حول":"About SNAP"}
              </li>
              <li
                onClick={() => {
                  mobileMenu();
                  router.push("/download");
                }}
                className={`${path === "download" ? classes.active : null}`}
              >
                {rtl? "التحميلات": "Downloads"}
              </li>
              <li
                onClick={() => {
                  mobileMenu();
                  router.push("/news");
                }}
                className={`${path === "news" ? classes.active : null}`}
              >
                {rtl? "الاخبار" :"News"}
              </li>
              <li
                onClick={() => {
                  mobileMenu();
                  router.push("/faq");
                }}
                className={`${path === "faq" ? classes.active : null}`}
              >
                {rtl? "الاسئلة الشائعة" :"FAQ" }
              </li>
             
            </ul>
          </div>

          <div
            className={`${classes.feedBackSection} ${
              addClass ? classes.navAuthHam : null
            }`}
          > 
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
              <p style={{fontSize: rtl? "18px": ""}}>{rtl? "شكاوي":"Feedback"}</p>
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
