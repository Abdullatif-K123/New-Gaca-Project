import React, { useState } from "react";
import classes from "./master-plan.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

const Element = ({
  id,
  handleHover,
  handleMouseOut,
  isHovered,
  imgsrc,
  width,
  height,
  nowHovering,
  text,
}) => {
  const classPyramid =
    id === 1
      ? classes.pyramid1
      : id === 2
      ? classes.pyramid2
      : id === 3
      ? classes.pyramid3
      : id === 4
      ? classes.pyramid4
      : classes.pyramid5;
  const router = useRouter();
  return (
    <div
      className={`${classes.masterPlanInfoImg} ${
        id % 2 ? classes.odd : classes.even
      }`}
    >
      {id % 2 ? null : (
        <div
          className={classes.masterPlanInfo}
          style={{
            filter: nowHovering
              ? isHovered
                ? "brightness(1.5)"
                : "brightness(0.5)"
              : null,
          }}
        >
          <p>{text}</p>
        </div>
      )}
      <Image
        id={id}
        src={imgsrc}
        onClick={() => {
          router.push(`/master-plan?plan=${id}`);
        }}
        onMouseOver={() => handleHover(id)}
        onMouseOut={handleMouseOut}
        width={width}
        height={height}
        className={`${classes.singleLevel} ${classPyramid}`}
        style={{
          filter: nowHovering
            ? isHovered
              ? "brightness(1.5)"
              : "brightness(0.5)"
            : null,
        }}
        alt="master plan"
      />
      {id % 2 ? (
        <div
          className={classes.masterPlanInfo}
          style={{
            filter: nowHovering
              ? isHovered
                ? "brightness(1.5)"
                : "brightness(0.5)"
              : null,
          }}
        >
          <p>{text}</p>
        </div>
      ) : null}
    </div>
  );
};
const MasterPlan = () => {
  const [hoverElement, setHoverElement] = useState(null);
  const [isNowhovering, setIsNowHovering] = useState(false);
  const handleHover = (id) => {
    setHoverElement(id);
    setIsNowHovering(true);
  };

  const handleMouseOut = () => {
    setHoverElement(null);
    setIsNowHovering(false);
  };
  return (
    <div id={"masterplan"} className={classes.masterPlanMain}>
      <h1>Master Plan Level</h1>
      <div className={classes.masterpyrmaid}>
        {[
          {
            idnum: 1,
            imgsrc: "/assets/svg/1.svg",
            width: 130,
            height: 130,
            text: "Air Navigation Vision & Priority Alignment",
          },
          {
            idnum: 2,
            imgsrc: "/assets/svg/2.svg",
            width: 250,
            height: 110,
            text: "Future Airspace Structure & Organization",
          },
          {
            idnum: 3,
            imgsrc: "/assets/svg/3.svg",
            width: 400,
            height: 110,
            text: "Deployment Program & Roadmap",
          },
          {
            idnum: 4,
            imgsrc: "/assets/svg/4.svg",
            width: 525,
            height: 110,
            text: "Performance Monitoring & Reporting Mechanisms",
          },
          {
            idnum: 5,
            imgsrc: "/assets/svg/5.svg",
            width: 650,
            height: 110,
            text: "Appendix",
          },
        ].map((id) => {
          return (
            <Element
              key={id.idnum}
              id={id.idnum}
              handleHover={handleHover}
              handleMouseOut={handleMouseOut}
              isHovered={hoverElement === id.idnum}
              imgsrc={id.imgsrc}
              width={id.width}
              height={id.height}
              nowHovering={isNowhovering}
              text={id.text}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MasterPlan;
