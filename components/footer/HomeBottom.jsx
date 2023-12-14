import React, { useEffect, useState } from "react";
import classes from "./home-bottom.module.css";
import Image from "next/image";
import Footer from "./footer";
import Slider from "react-infinite-logo-slider";
const HomeBottom = () => {
  const [sliderWidth, setSliderWidth] = useState("180px");
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
            width={sliderWidth}
            duration={15}
            pauseOnHover={true}
            blurBorders={true}
            toRight={false}
          >
            <Slider.Slide>
              <div className={classes.partnerItem}>
                <Image
                  src="/assets/svg/SANS.svg"
                  width={140}
                  height={140}
                  alt="sans"
                />
              </div>
            </Slider.Slide>
            <Slider.Slide>
              <div className={classes.partnerItem}>
                <Image
                  src="/assets/svg/Eurocontrol.svg"
                  width={140}
                  height={140}
                  alt="eurocontrol"
                />
              </div>
            </Slider.Slide>
            <Slider.Slide>
              <div className={classes.partnerItem}>
                <Image
                  src="/assets/svg/GACA.svg"
                  width={140}
                  height={140}
                  alt="gaca"
                />
              </div>
            </Slider.Slide>
            <Slider.Slide>
              <div className={classes.partnerItem}>
                <Image
                  src="/assets/svg/NIC.svg"
                  alt="nic"
                  width={140}
                  height={140}
                />
              </div>
            </Slider.Slide>
            <Slider.Slide>
              <div className={classes.partnerItem}>
                <Image
                  src="/assets/svg/Saudi Arabia.svg"
                  width={140}
                  height={140}
                  alt="arabia"
                />
              </div>
            </Slider.Slide>
            <Slider.Slide>
              <div className={classes.partnerItem}>
                <Image
                  src="/assets/svg/Vision.svg"
                  width={140}
                  height={140}
                  alt="vision"
                />
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
