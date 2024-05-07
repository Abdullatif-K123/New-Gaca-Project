import React, { useEffect, useState } from "react";
import classes from "./home-bottom.module.css";
import Footer from "./footer";
import Slider from "react-infinite-logo-slider";
import { API_ROUTES } from "@/utils/apiConfig";
import NewsLandingpage from "./NewsLandingpage";
import Image from "next/image";
import Link from "next/link";
import SubSection from "./SubSection";
const HomeBottom = ({ imgs, conVersion, desc, news, rtl }) => {
  const [sliderWidth, setSliderWidth] = useState("180px");
  const [leftRight, setLeftRight] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      // Adjust the width based on the screen size
      setSliderWidth(window.innerWidth <= 600 ? "110px" : "180px");
    };

    // Set the initial width and add event listener for window resize
    handleResize();
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
   const src = imgs.avatar? imgs.avatar : "/assets/svg/SANS.svg"
  return (
    <>
      <div className={classes.homeBottomMain} id="stakeholder">
        <div className={classes.bottomLogo}>
          <NewsLandingpage news={news} rtl={rtl}/>
          <SubSection/>
          <h2 style={{direction: rtl? "rtl": ""}}>
            <span>{rtl? "أصحاب":"Our"}</span> {rtl? "المصلحة":"Stackholders"}
          </h2>
        </div>
        <div className={classes.stakholderArrows}>
          <Image
            src="assets/svg/stackholderArrow.svg"
            width={25}
            height={25}
            alt="ArrowLeft"
            onClick={() => {
              setLeftRight(false);
            }}
          />
          <Image
            src="assets/svg/stackholderArrow.svg"
            width={25}
            height={25}
            alt="ArrowLeft"
            onClick={() => {
              setLeftRight(true);
            }}
          />
        </div>
        <div className={classes.partners}>
          <Slider
            width={sliderWidth}
            duration={15}
            pauseOnHover={true}
            blurBorders={true}
            toRight={leftRight}
          >
            {imgs.map((stakholder) => {
              return (
                <Slider.Slide key={stakholder.id}>
                  <Link href={stakholder.url}  _blank >
                  <div className={classes.partnerItem}>
                   {stakholder.avatar?<img
                      src={`${API_ROUTES.domainName}/${stakholder.avatar}`}
                      width={140}
                      height={140}
                      alt={stakholder.title}
                    />: <div style={{background: "yellow", width: 140, height: 140, borderRadius: "80px" }}></div> } 
                  </div>
                  </Link>
                </Slider.Slide>
              );
            })}
          </Slider>
        </div>
      </div>
      <Footer conVersion={conVersion} desc={desc} rtl={rtl} />
    </>
  );
};

export default HomeBottom;
