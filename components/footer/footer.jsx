import React, { useEffect, useState } from "react";
import classes from "./home-bottom.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import {
  AiFillYoutube,
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillFacebook,
  AiFillLinkedin,
} from "react-icons/ai";

const Footer = ({ conVersion, desc }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const likeAndOpenLink = (link) => {
    // Perform the action to simulate a "like" (replace with your actual like functionality)

    // Open a new tab or window with the specified URL
    window.open(link, "_blank");
  };
  //Getting current year
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  const router = useRouter();
  return (
    <div className={classes.footerMain}>
      <div className={classes.footerContentMain}>
        <div className={classes.logoSec}>
          <Image src="/assets/svg/logo-green.svg" width={150} height={50} />
          <p>{parse(desc)}</p>
          <div className={classes.footerCopyRight}>
            <p>
              © {currentYear} {conVersion?.copyright},(V {conVersion?.version})
            </p>
          </div>
        </div>
        <div className={classes.contentVision}>
          <ul className={classes.footerContent}>
            <li
              onClick={() => {
                router.push("/about");
              }}
            >
              About us
            </li>
            <li
              onClick={() => {
                router.push("/download");
              }}
            >
              Downloads
            </li>
            <li
              onClick={() => {
                router.push("/news");
              }}
            >
              News
            </li>
            <li
              onClick={() => {
                likeAndOpenLink(conVersion?.constructor);
              }}
            >
              Constructor{" "}
              <Image
                src="/assets/svg/share1.svg"
                width={17}
                height={17}
                alt="share1"
              />
            </li>
          </ul>
          <div className={classes.visionFooter}>
            <Image
              src="/assets/svg/vision-footer.svg"
              width={250}
              height={95}
              alt="vision"
              className={classes.visionImg}
            />
          </div>
        </div>
        <div className={classes.contact}>
          <h1>Connect With Us</h1>
          <div className={classes.socialIcons}>
            <div className={classes.icon}>
              <AiFillYoutube />
            </div>
            <div className={classes.icon}>
              <AiFillInstagram />
            </div>
            <div className={classes.icon}>
              <AiFillTwitterCircle />
            </div>
            <div className={classes.icon}>
              <AiFillFacebook style={{ borderRadius: "50%" }} />
            </div>
            <div className={classes.icon}>
              <AiFillLinkedin style={{ borderRadius: "50%" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
