import React from "react";
import classes from "./about.module.css";
import Image from "next/image";
import parse from "html-react-parser";
import { useRouter } from "next/router";
import Subscribe from "../ui/Subscribe";
import { useFontSize } from "@/store/FontSizeContext";
const AboutPage = ({ data, rtl }) => {
  const router = useRouter();
  const {fontSizeGeneral} = useFontSize();
  return (
    <div className={classes.aboutPageMain} style={{direction:rtl? "rtl":""}}>
      <div className={classes.choosen}>
        <p style={{fontSize: `${14 + fontSizeGeneral}px`}}>
          <span
            onClick={() => {
              router.push("/");
            }}
            style={{fontFamily: rtl? "DINNext-Arabic-meduim " : ""}}
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
        <h1
        style={{fontFamily: rtl? "DINNext-Arabic-meduim " : "", fontSize: `${48 + fontSizeGeneral}px`}}>{rtl? "حول": "About SNAP"}</h1>
      </div>
      <div className={classes.aboutSection}>
        <Image
          src="/assets/imges/snap-img.png"
          width={630}
          height={450}
          alt="snap-imges"
          data-aos="fade-left"
        />
        <div className={classes.content} data-aos="fade-right">
          <h1 style={{fontFamily: rtl? "DINNext-Arabic-meduim " : "", fontSize: `${28 +  fontSizeGeneral}px`}}>{rtl? "سناب": "SNAP"}</h1>
         <p style={{fontFamily: rtl? "DINNext-Arabic-meduim " : "", fontSize: `${15 +  fontSizeGeneral}px`}}>{parse(rtl? data.information.content:data.information.contentEN)}</p>  
        </div>
      </div>
      <div className={classes.visionMission}>
        <div className={classes.vision} data-aos="fade-up">
          <Image
            src={"/assets/svg/about-vision.svg"}
            width={64}
            height={64}
            alt="vision"
          />
          <h1 style={{fontFamily: rtl? "DINNext-Arabic-meduim " : "", fontSize: `${24 + fontSizeGeneral}px`}}>{rtl? "الرؤية": "Vision"}</h1>
          <p  style={{fontFamily: rtl? "DINNext-Arabic-meduim " : "",fontSize: `${14 + fontSizeGeneral}px`}} > {parse(rtl? data.information.vision:data.information.visionEN)}</p>
        </div>
        <div className={classes.vision} data-aos="fade-down" >
          <Image
            src={"/assets/svg/about-mission.svg"}
            width={64}
            height={64}
            alt="mission"
          />
          <h1 style={{fontFamily: rtl? "DINNext-Arabic-meduim " : "", fontSize: `${24 + fontSizeGeneral}px`}}>{rtl? "المهام":"Mission"}</h1>
           <p  style={{fontFamily: rtl? "DINNext-Arabic-meduim " : "", fontSize: `${14 + fontSizeGeneral}px`}}>{parse(rtl?data.information.mission:data.information.missionEN)}</p>
        </div>
      </div>
      <div className={classes.strategic}>
        <div className={classes.strategiContent}>
          <h1 style={{fontFamily: rtl? "DINNext-Arabic-meduim " : "",  fontSize: `${26 + fontSizeGeneral}px`}}>{rtl? "أهدافنا الاستراتيجية:" :"SNAP’s strategic objectives:"}</h1>
          {data.objectives.map((content,index) => {
            return (
              <div key={index} className={classes.singleStrategic} data-aos="fade-right" >
                <Image
                  src="/assets/svg/leftIconStrategic.svg"
                  width={20}
                  height={20}
                  alt="left-icon"
                  
            style={{transform: rtl?"rotate(180deg)": ""}}
                />
                <p style={{fontFamily: rtl? "DINNext-Arabic-meduim " : "", fontSize: `${14 + fontSizeGeneral}px`}}>{rtl? content.title: content.titleEN}</p>
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
          data-aos="fade-left"
          
        />
      </div>
      <Subscribe rtl={rtl}/>
    </div>
  );
};

export default AboutPage;
