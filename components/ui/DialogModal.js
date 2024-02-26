import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Image from "next/image";
import classes from "./ui.module.css";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const DialogModal = ({ open, handleClose, openLink, link }) => {
  return (
    <Dialog
      TransitionComponent={Transition}
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          overflowY: "unset",
          overflowX: "unset",
        },
      }}
    >
      <div style={{ position: "relative" }}>
        <div className={classes.closeBtn} onClick={handleClose}>
          <Image src="/assets/svg/x.svg" width={17} height={17} alt="x" />
        </div>
        <div style={{ padding: 8 }}>
          <DialogTitle style={{ color: "#4B465C" }}>{"Alert"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Please note that you will go to an external link from the current
              site!!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button
              variant="contained"
              color="inherit"
              onClick={handleClose}
              className={classes.btnCancel}
            >
              Cancel
            </button>
            <button
              variant="contained"
              color="success"
              onClick={() => {
                // Add your custom logic here
                openLink(link);
                handleClose();
              }}
              className={classes.btnSuccess}
            >
              Confirm
            </button>
          </DialogActions>
        </div>
      </div>
    </Dialog>
  );
};

export default DialogModal;
