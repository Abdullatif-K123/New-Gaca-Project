import React from "react";
import classes from "./about.module.css";
import Image from "next/image";
import parse from "html-react-parser";
import { useRouter } from "next/router";

const AboutPage = ({ data, rtl }) => {
  const router = useRouter();

  return (
    <div className={classes.aboutPageMain} style={{direction:rtl? "rtl":""}}>
      <div className={classes.choosen}>
        <p>
          <span
            onClick={() => {
              router.push("/");
            }}
          >
            {rtl? "الصفحة الرئيسية":"Home"}
          </span>
          <Image
            src="/assets/svg/Chevron.svg"
            width={16}
            height={16}
            alt="chev"
            style={{transform: rtl?"rotate(180deg)": ""}}
          />
        </p>
        <h1>{rtl? "حول": "About SNAP"}</h1>
      </div>
      <div className={classes.aboutSection}>
        <Image
          src="/assets/imges/snap-img.png"
          width={630}
          height={450}
          alt="snap-imges"
        />
        <div className={classes.content}>
          <h1>{rtl? "سناب": "SNAP"}</h1>
          {parse(rtl? data.information.content:data.information.contentEN)}
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
          <h1>{rtl? "الرؤية": "Vision"}</h1>
          {parse(rtl? data.information.vision:data.information.visionEN)}
        </div>
        <div className={classes.vision}>
          <Image
            src={"/assets/svg/about-mission.svg"}
            width={64}
            height={64}
            alt="mission"
          />
          <h1>{rtl? "المهام":"Mission"}</h1>
          {parse(rtl?data.information.mission:data.information.missionEN)}
        </div>
      </div>
      <div className={classes.strategic}>
        <div className={classes.strategiContent}>
          <h1>{rtl? "أهدافنا الاستراتيجية:" :"SNAP’s strategic objectives:"}</h1>
          {data.objectives.map((content,index) => {
            return (
              <div key={index} className={classes.singleStrategic} >
                <Image
                  src="/assets/svg/leftIconStrategic.svg"
                  width={20}
                  height={20}
                  alt="left-icon"
                  
            style={{transform: rtl?"rotate(180deg)": ""}}
                />
                <p>{rtl? content.title: content.titleEN}</p>
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
