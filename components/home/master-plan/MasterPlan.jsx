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
  desc,
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
            opacity: nowHovering ? (isHovered ? "1" : "0") : null,
          }}
        >
          <p>{text}</p>
          {isHovered && (
            <p
              className={`${classes.masterPlanInfoDesc} ${classes.masterPlanInfoDescLeft}`}
            >
              {desc.slice(0, 200)}...
            </p>
          )}
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
          className={`${classes.masterPlanInfo} ${classes.masterPlanInfo2}`}
          style={{
            filter: nowHovering
              ? isHovered
                ? "brightness(1.5)"
                : "brightness(0.5)"
              : null,
            opacity: nowHovering ? (isHovered ? "1" : "0") : null,
          }}
        >
          <p>{text}</p>
          {isHovered && (
            <p
              className={`${classes.masterPlanInfoDesc} ${
                id == 5 ? classes.masterPlanInfoDescUp : null
              }`}
            >
              {desc.slice(0, 200)}...
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
};
const MasterPlan = ({ layers }) => {
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
            imgsrc: "/assets/svg/light-green1.svg",
            width: 140,
            height: 130,
            text: layers[0].title,
            desc: layers[0].descripton,
          },
          {
            idnum: 2,
            imgsrc: "/assets/svg/light-green2.svg",
            width: 262,
            height: 110,
            text: layers[1].title,
            desc: layers[1].descripton,
          },
          {
            idnum: 3,
            imgsrc: "/assets/svg/light-green3.svg",
            width: 390,
            height: 110,
            text: layers[2].title,
            desc: layers[2].descripton,
          },
          {
            idnum: 4,
            imgsrc: "/assets/svg/light-green4.svg",
            width: 525,
            height: 110,
            text: layers[3].title,
            desc: layers[3].descripton,
          },
          {
            idnum: 5,
            imgsrc: "/assets/svg/light-green5.svg",
            width: 650,
            height: 110,
            text: layers[4].title,
            desc: layers[4].descripton,
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
              desc={id.desc}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MasterPlan;
