import React from "react";
import classes from "./about.module.css";
import Image from "next/image";
import parse from "html-react-parser";
import { useRouter } from "next/router";

const AboutPage = ({ data }) => {
  const router = useRouter();
  console.log(data);

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
        <h1>About SNAP</h1>
      </div>
      <div className={classes.aboutSection}>
        <Image
          src="/assets/imges/snap-img.png"
          width={630}
          height={450}
          alt="snap-imges"
        />
        <div className={classes.content}>
          <h1>SNAP</h1>
          {parse(data.content)}
        </div>
      </div>
      <div className={classes.visionMission}>
        <div className={classes.vision}>
          <Image
            src={"/assets/svg/about-vision.svg"}
            width={64}
            height={64}
            alt="vision"
          />
          <h1>Vision</h1>
          {parse(data.vision)}
        </div>
        <div className={classes.vision}>
          <Image
            src={"/assets/svg/about-mission.svg"}
            width={64}
            height={64}
            alt="mission"
          />
          <h1>Mission</h1>
          {parse(data.mission)}
        </div>
      </div>
      <div className={classes.strategic}>
        <div className={classes.strategiContent}>
          <h1>SNAP’s strategic objectives:</h1>
          {data.dataStrategicObjectives.map((content) => {
            return (
              <div key={content.id} className={classes.singleStrategic}>
                <Image
                  src="/assets/svg/leftIconStrategic.svg"
                  width={20}
                  height={20}
                  alt="left-icon"
                />
                <p>{content.text}</p>
              </div>
            );
          })}
        </div>
        <Image
          src="/assets/imges/stratigec-img.png"
          width={600}
          height={400}
          alt="strategic"
          layout="responsive"
          className={classes.strategicImg}
        />
      </div>
    </div>
  );
};

export default AboutPage;
