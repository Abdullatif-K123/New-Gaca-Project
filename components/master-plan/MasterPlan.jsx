import React, { useState } from "react";
import classes from "./masterPlan.module.css";
import WelcomeDialog from "../ui/WelcomeToGaca";

const MasterPlan = ({ singleDesc, pptFile, videoUrl, rtl }) => {
  const [openVid, setOpenVid] = useState(false);

  const handleClose = () => {
    setOpenVid(false);
  }

  const handleOpenVideo = () => {
    setOpenVid(true);
  }

  return (
    <div className={classes.sideContent}>
      <div className={classes.contentPlan}>
        <div>
        {openVid && <WelcomeDialog videoUrl={videoUrl} onClose={handleClose} />}
        <button className={classes.videoShow} onClick={handleOpenVideo} style={{float: rtl? "left": "right", fontFamily: rtl? "DINNext-Arabic-meduim " : "",}} >{rtl? "فيديو توضيحي" : " Video tutorial"}</button>
        </div>
        <div style={{ height: "80%", width: "80%", backgroundColor: "#fff", }}>
          <iframe
            src={`https://onedrive.live.com/edit?id=E4E6945192B5915F!sbba5da75d76d49c1bfc63645f3c31dff&resid=E4E6945192B5915F!sbba5da75d76d49c1bfc63645f3c31dff&cid=e4e6945192b5915f&ithint=file%2cpptx&redeem=aHR0cHM6Ly8xZHJ2Lm1zL3AvYy9lNGU2OTQ1MTkyYjU5MTVmL0VYWGFwYnR0MThGSnY4WTJSZlBESGY4QjhTZG9IbWg4VldEc3ZFZWtGR0Z5T1E_ZT1kYzh5aDA&migratedtospo=true&wdo=2`}
            width="100%"
            height="100%"
            frameBorder="0"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default MasterPlan;
