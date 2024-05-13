import React, { useEffect, useState } from "react";
import classes from "./home-bottom.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import DialogModal from "../ui/DialogModal";
const Footer = ({ conVersion, rtl }) => { 
  const [links, setLinks] = useState([]);
  const [linkProvide, setLinkProvide] = useState("");
  //setting up for the dialog modal
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const likeAndOpenLink = (link) => {
    // Perform the action to simulate a "like" (replace with your actual like functionality)

    // Open a new tab or window with the specified URL
    window.open(link, "_blank");
  };
  //Getting current year 
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear(); 
  useEffect(() => {
    setLinks(conVersion.shortLinks);
  }, [conVersion]);
  const router = useRouter();
  return (
    <div className={classes.footerMain} style={{direction: rtl? "rtl": ""}}>
      <div className={classes.footerContentMain}>
        <div className={classes.logoSec}>
          <Image src="/assets/svg/GacaFooter.svg" width={135} height={50}  alt="Gaca"/>
          <p>
            {rtl ? conVersion.globalSettings.footerDescription : conVersion?.globalSettings?.footerDescriptionEN  }
          </p>
          <div className={classes.footerCopyRight}>
            <p>
              © {currentYear}  
            </p>
          </div>
        </div>

        <div className={classes.visionFooter}>
          <div className={classes.linksSlogans}>
            {links?.map((link) => {
              return (
                <div
                  style={{ cursor: "pointer", fontSize: "12px", }}
                  onClick={() => {
                    handleOpen();
                    setLinkProvide(link.linkAddress);
                  }}
                  key={link.id}
                >
                  <p style={{ width: "100%", margin: 0,  }}>{link.title}</p>
                </div>
              );
            })}
          </div>
          <div style={{width: "100%", display:"flex", justifyContent: "center", marginLeft: "-20px"}}>
          <Image
            src="/assets/svg/digitalGov.svg"
            width={200}
            height={80}
            alt="vision"
            className={classes.visionImg}
           
          />
          </div>
          <div className={classes.footerVisions}>
            <Image
              src="/assets/svg/vision-2030.svg"
              width={90}
              height={50}
              alt="vision-2030"
              className={classes.visionImg}
            />
            <Image
              src="/assets/svg/GacaFooter.svg"
              width={110}
              height={50}
              alt="vision"
              className={classes.visionImg}
            />

            <Image
              src="/assets/svg/govSa.svg"
              width={130}
              height={45}
              alt="Saudi"
              className={classes.visionImg}
            />
          </div>
        </div>

        <div className={classes.contact}>
          <h1>{rtl? "تواصل معنا": "Connect With Us"}</h1>
          <div className={classes.socialIcons}>
            <div
              onClick={() => {
                handleOpen();
                setLinkProvide(conVersion?.socialMedia?.faceBook);
              }}
              className={classes.icon}
            >
              <Image
                src="/assets/svg/ico-facebook.svg"
                alt="facebook"
                width={24}
                height={24}
              
              />
            </div>
            <div
              onClick={() => {
                handleOpen();
                setLinkProvide(conVersion?.socialMedia?.instgram);
              }}
              className={classes.icon}
            >
              <Image
                src="/assets/svg/ico-instgram.svg"
                alt="instgram"
                width={24}
                height={24}
              />
            </div>
            <div
              onClick={() => {
                handleOpen();
                setLinkProvide(conVersion?.socialMedia?.twitter);
              }}
              className={classes.icon}
            >
              <Image
                src="/assets/svg/xIcon.svg"
                alt="X"
                width={24}
                height={24}
              />
            </div>
            <div
              onClick={() => {
                handleOpen();
                setLinkProvide(conVersion?.socialMedia?.youTube);
              }}
              className={classes.icon}
            >
              <Image
                src="/assets/svg/ico-youtube.svg"
                alt="youtube"
                width={24}
                height={24}
              />
            </div>
          </div>
          <ul className={classes.footerContent}>
            <li
              onClick={() => {
                router.push("/");
              }}
            >
              {rtl? "الرئيسية": "Home"}
            </li>
            <li
              onClick={() => {
                router.push("/about");
              }}
            >
              {rtl? "حول": "About"}
            </li>
            <li
              onClick={() => {
                router.push("/download");
              }}
            >
              {rtl? "التحميلات": "Downloads"}
            </li>
            <li
              onClick={() => {
                router.push("/news");
              }}
            >
              {rtl? "الأخبار": "News"}
            </li>
            <li
              onClick={() => {
                handleOpen();
                setLinkProvide(conVersion?.globalSettings.constructorUrl);
              }}
            >
            {rtl? "البناء": "Constructor"}
            </li>
          </ul>
        </div>
        <DialogModal
          open={open}
          handleClose={handleClose}
          openLink={likeAndOpenLink}
          link={linkProvide}
        />
      </div>
    </div>
  );
};

export default Footer;
