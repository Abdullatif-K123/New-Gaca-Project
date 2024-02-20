import React, { useEffect, useState } from "react";
import classes from "./home-bottom.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import DialogModal from "../ui/DialogModal";
const Footer = ({ conVersion }) => {
  console.log(conVersion);
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
    setLinks(conVersion.links);
  }, [conVersion]);
  const router = useRouter();
  return (
    <div className={classes.footerMain}>
      <div className={classes.footerContentMain}>
        <div className={classes.logoSec}>
          <Image src="/assets/svg/logo-green.svg" width={150} height={50} />
          <p>{conVersion.footerDescription}</p>
          <div className={classes.footerCopyRight}>
            <p>
              © {currentYear} {conVersion?.copyright},(V {conVersion?.version})
            </p>
          </div>
        </div>
        <div className={classes.contentVision}>
          <div className={classes.visionFooter}>
            <div className={classes.linksSlogans}>
              {links?.map((link) => {
                return (
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleOpen();
                      setLinkProvide(link.linkAddress);
                    }}
                    key={link.id}
                  >
                    <p>{link.title}</p>
                  </div>
                );
              })}
            </div>
            <div className={classes.footerVisions}>
              <Image
                src="/assets/svg/vision-footer.svg"
                width={140}
                height={50}
                alt="vision"
                className={classes.visionImg}
              />
              <Image
                src="/assets/svg/vision-2030.svg"
                width={140}
                height={50}
                alt="vision-2030"
                className={classes.visionImg}
              />
              <Image
                src="/assets/svg/gov-sa.svg"
                width={140}
                height={50}
                alt="Saudi"
                className={classes.visionImg}
              />
            </div>
          </div>
        </div>
        <div className={classes.contact}>
          <h1>Connect With Us</h1>
          <div className={classes.socialIcons}>
            <Link
              href={
                conVersion?.social?.faceBook ? conVersion.social.faceBook : "#"
              }
              className={classes.icon}
            >
              <Image
                src="/assets/svg/ico-facebook.svg"
                alt="facebook"
                width={24}
                height={24}
              />
            </Link>
            <Link
              href={
                conVersion?.social?.instgram ? conVersion.social.instgram : "#"
              }
              className={classes.icon}
            >
              <Image
                src="/assets/svg/ico-instgram.svg"
                alt="instgram"
                width={24}
                height={24}
              />
            </Link>
            <Link
              href={
                conVersion?.social?.twitter ? conVersion.social.twitter : "#"
              }
              className={classes.icon}
            >
              <Image
                src="/assets/svg/xIcon.svg"
                alt="X"
                width={24}
                height={24}
              />
            </Link>
            <Link
              href={
                conVersion?.social?.youTube ? conVersion.social.youTube : "#"
              }
              className={classes.icon}
            >
              <Image
                src="/assets/svg/ico-youtube.svg"
                alt="youtube"
                width={24}
                height={24}
              />
            </Link>
          </div>
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
