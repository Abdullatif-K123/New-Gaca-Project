import React from "react";
import classes from "./about.module.css";
import Image from "next/image";
import AboutSection from "./AboutSection";
const AboutPage = () => {
  return (
    <div className={classes.aboutPageMain}>
      <div className={classes.choosen}>
        <p>
          <span>Home</span>
          <Image src="/assets/svg/Chevron.svg" width={16} height={16} />
          <span>About</span>
        </p>
      </div>
      <div className={classes.aboutSection}>
        <div className={classes.aboutContent}>
          <h1>About GACA</h1>
          <AboutSection
            title={"GACA"}
            desc1={
              "The General Authority of Civil Aviation (GACA) of the Kingdom of Saudi Arabia emerged from the Presidency of Civil Aviation in 2006. Since then GACA has been on a mission to become a main contributor to the GDP of the Kingdom while growing and modernizing its aviation sector employing mostly qualified Saudis."
            }
            desc2={
              "Over the years, the Kingdom has achieved unprecedented growth and has made qualitative leaps in civil aviation, whose growth has helped to drive development at airports across Saudi Arabia, covering major developments in passenger transportation, air cargo, airport construction and equipment, air navigation and control."
            }
          />
          <AboutSection
            title={"Vision"}
            desc1={
              "To enable the Kingdom leadership in aviation, by providing customer-centric and digitally enabled regulatory services."
            }
          />
          <AboutSection
            title={"Mission"}
            desc1={
              "A globally leading, innovative and trusted aviation regulator."
            }
          />
          <AboutSection title={"GACA’s strategic objectives:"} />
          <div className={classes.moreInfo}>
            <p>
              <span>Safety & security</span> Ensure highest levels of safety and
              security in KSA aviation sector.
            </p>
            <p>
              <span>Environmental sustainability</span> Promote development of
              sustainable measures to reduce environmental impact.
            </p>
            <p>
              <span>Sector growth & competitiveness</span> Develop economic
              policies to enable traffic growth, service quality, fair
              competition and connectivity.
            </p>
            <p>
              <span>Sector strategy activation & delivery </span> Activate and
              monitor aviation sector strategy implementation and enable new
              technology adoption.
            </p>
          </div>
        </div>
        <div className={classes.worldImages}>
          <Image
            src="/assets/svg/earth.svg"
            width={360}
            height={360}
            alt="earth"
            className={classes.earth}
          />
          <Image
            src="/assets/svg/clouds.svg"
            width={400}
            height={400}
            alt="clouds"
            className={classes.clouds}
          />
          <Image
            src="/assets/svg/cloudswithPlane.svg"
            width={400}
            height={400}
            alt="clouds"
            className={classes.cloudsmore}
          />
          <Image
            src="/assets/svg/aboutPlane.svg"
            width={306}
            height={144}
            alt="Plane"
            className={classes.plane}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
