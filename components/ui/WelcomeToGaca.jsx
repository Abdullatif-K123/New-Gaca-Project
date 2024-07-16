import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, Button, Slide } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import classes from "./ui.module.css";
const WelcomeDialog = ({ onClose, videoUrl }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [videSrc, setVideoSrc] = useState(
    "https://www.youtube.com/embed/qaTB_u1THVs"
  );
  const handleClose = () => {
    onClose();
  };
  useEffect(() => {
    setVideoSrc(videoUrl);
  }, [videoUrl]);

  return (
    <Dialog
      TransitionComponent={Slide}
      transitionDuration={500}
      open={true}
      onClose={handleClose}
      PaperProps={{
        style: {
          background: "transparent",
          minWidth: isSmallScreen ? "90%" : "800px",
          minHeight: isSmallScreen ? "200px" : "600px",
          boxShadow: "none",
          overflow: "hidden",
        },
      }}
    >
      <DialogContent style={{ overflow: "hidden" }}>
        <video controls className={classes.iframeResponsive}>
          <source src={videSrc} type="video/mp4" />
          <source src={videSrc} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </DialogContent>
      <div style={{ textAlign: "center", marginTop: "16px" }}>
        <Button
          onClick={handleClose}
          style={{
            backgroundColor: "#1c7a54",
            borderRadius: "50px",
            width: "200px",
            height: "51px",
            color: "#fff",
          }}
        >
          Close
        </Button>
      </div>
    </Dialog>
  );
};

export default WelcomeDialog;
