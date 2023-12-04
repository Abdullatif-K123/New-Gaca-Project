import React, { useEffect } from "react";
import classes from "./home-bottom.module.css";
import Image from "next/image";
import Footer from "./footer";
import Slider from "react-infinite-logo-slider";
const HomeBottom = () => {
  return (
    <>
      <div className={classes.homeBottomMain}>
        <div className={classes.bottomLogo}>
          <h2>
            <span>Our</span> Stackholders
          </h2>
        </div>
        <div className={classes.partners}>
          <Slider
            width="250px"
            duration={30}
            pauseOnHover={true}
            blurBorders={true}
            toRight={false}
          >
            <Slider.Slide>
              <div className={classes.partnerItem}>
                <Image src="/assets/svg/SANS.svg" width={140} height={140} />
              </div>
            </Slider.Slide>
            <Slider.Slide>
              <div className={classes.partnerItem}>
                <Image
                  src="/assets/svg/Eurocontrol.svg"
                  width={140}
                  height={140}
                />
              </div>
            </Slider.Slide>
            <Slider.Slide>
              <div className={classes.partnerItem}>
                <Image src="/assets/svg/GACA.svg" width={140} height={140} />
              </div>
            </Slider.Slide>
            <Slider.Slide>
              <div className={classes.partnerItem}>
                <Image src="/assets/svg/NIC.svg" width={140} height={140} />
              </div>
            </Slider.Slide>
            <Slider.Slide>
              <div className={classes.partnerItem}>
                <Image
                  src="/assets/svg/Saudi Arabia.svg"
                  width={140}
                  height={140}
                />
              </div>
            </Slider.Slide>
            <Slider.Slide>
              <div className={classes.partnerItem}>
                <Image src="/assets/svg/Vision.svg" width={140} height={140} />
              </div>
            </Slider.Slide>
          </Slider>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomeBottom;
