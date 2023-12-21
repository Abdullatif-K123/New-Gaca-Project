import React from "react";
import classes from "./about.module.css";
import Image from "next/image";
import AboutSection from "./AboutSection";
import { useRouter } from "next/router";

const AboutPage = ({ data }) => {
  const router = useRouter();

  return (
    <div className={classes.aboutPageMain}>
      <div className={classes.choosen}>
        <p>
          <span
            onClick={() => {
              router.push("/");
            }}
          >
            Home
          </span>
          <Image
            src="/assets/svg/Chevron.svg"
            width={16}
            height={16}
            alt="chev"
          />
          <span>About</span>
        </p>
      </div>
      <div className={classes.aboutSection}>
        <div className={classes.aboutContent}>
          <h1>About GACA</h1>
          <AboutSection title={"GACA"} desc1={data.content} />
          <AboutSection title={"Vision"} desc1={data.vision} />
          <AboutSection title={"Mission"} desc1={data.mission} />
          {/* <AboutSection title={"GACA’s strategic objectives:"} />
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
          </div> */}
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
