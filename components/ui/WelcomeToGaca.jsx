import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, Button, Slide } from "@mui/material";

const WelcomeDialog = ({ onClose, videoUrl }) => {
  const [videSrc, setVideoSrc] = useState(
    "https://www.youtube.com/embed/qaTB_u1THVs"
  );
  const handleClose = () => {
    onClose();
  };
  useEffect(() => {
    var regex = /[?&]v=([^&]+)/;
    var match = videoUrl?.match(regex);
    if (videoUrl) {
      const newUrl =
        "https://www.youtube.com/embed/" + match[1] + "?autoplay=1";
      setVideoSrc(newUrl);
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
          minWidth: "800px",
          minHeight: "600px",
          boxShadow: "none",
          overflow: "hidden",
        },
      }}
    >
      <DialogContent style={{ overflow: "hidden" }}>
        <iframe
          width="750px"
          height="500px"
          src={videSrc}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          style={{
            border: "none",
            margin: "0",
            padding: "0",
            display: "block",
          }}
        ></iframe>
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
