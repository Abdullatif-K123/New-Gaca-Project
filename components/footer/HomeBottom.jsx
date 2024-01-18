import React, { useEffect, useState } from "react";
import classes from "./home-bottom.module.css";
import Image from "next/image";
import Footer from "./footer";
import Slider from "react-infinite-logo-slider";
import { API_ROUTES } from "@/utils/apiConfig";
const HomeBottom = ({ imgs, conVersion }) => {
  const [sliderWidth, setSliderWidth] = useState("180px");

  //Handling clicking button up
  const handleClick = () => {
    const targetElement = document.getElementById("home");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

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
      <div className={classes.homeBottomMain} id="stakeholder">
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
            {imgs.map((stakholder) => {
              return (
                <Slider.Slide key={stakholder.id}>
                  <div className={classes.partnerItem}>
                    <img
                      src={`${API_ROUTES.domainName}/${stakholder.imageUrl}`}
                      width={140}
                      height={140}
                      alt={stakholder.title}
                    />
                  </div>
                </Slider.Slide>
              );
            })}
          </Slider>
        </div>
        <div className={classes.btnDown} onClick={handleClick}>
          <Image
            src="/assets/svg/arrow-up.svg"
            width={24}
            height={24}
            alt="arrow-down"
            className={classes.arrowDown}
          />
        </div>
      </div>
      <Footer conVersion={conVersion} />
    </>
  );
};

export default HomeBottom;
