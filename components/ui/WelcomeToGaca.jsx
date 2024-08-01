import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, Button, Slide } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import classes from "./ui.module.css";
const WelcomeDialog = ({ onClose, videoUrl }) => {
  console.log(videoUrl);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [videSrc, setVideoSrc] = useState(
    "https://www.youtube.com/embed/qaTB_u1THVs"
  );
  const handleClose = () => {
    onClose();
  };
  useEffect(() => {
    // Convert the videoUrl to the embed format if necessary
    if (videoUrl) {
      const videoId = videoUrl.split("v=")[1]?.split("&")[0]; // Extract video ID
      setVideoSrc(`https://www.youtube.com/embed/${videoId}`);
    }
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
        <iframe
          src={videSrc}
          allowFullScreen
          className={classes.iframeResponsive}
        />
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
