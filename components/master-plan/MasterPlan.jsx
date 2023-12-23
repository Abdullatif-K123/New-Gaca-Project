import React from "react";
import classes from "./masterPlan.module.css";
import parse from "html-react-parser";
const MasterPlan = ({ singleDesc, singleElem }) => {
  return (
    <div className={classes.sideContent}>
      <p>{singleElem}</p>
      <div className={classes.contentPlan}>
        <ul>
          <li>{parse(singleDesc)}</li>
        </ul>
      </div>
    </div>
  );
};

export default MasterPlan;
