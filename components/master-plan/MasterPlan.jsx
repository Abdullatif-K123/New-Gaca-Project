import React from "react";
import classes from "./masterPlan.module.css";
const MasterPlan = ({ singleElem }) => {
  return (
    <div className={classes.sideContent}>
      <p>{singleElem}</p>
      <div className={classes.contentPlan}>
        <ul>
          <li>2030 Saudi Arabia Vision</li>
          <li>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto
            doloremque nam magni amet numquam in sapiente quasi dolores cumque
            debitis. Architecto quos officiis consequuntur pariatur doloribus.
            Nihil unde rerum laudantium.
          </li>
          <li>
            GACA Vision (as per SNAP) Content to be finalized according to
            discussion with GACA
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MasterPlan;
