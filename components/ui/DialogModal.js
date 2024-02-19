import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Image from "next/image";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const DialogModal = ({ open, handleClose, openLink }) => {
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
        <div
          style={{
            backgroundColor: "lightgray",
            position: "absolute",
            cursor: "pointer",
            top: "-15px",
            right: "-15px",
            padding: "8px 9px ",
            borderRadius: "8px",
            backgroundColor: "#fff",
            boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={handleClose}
        >
          <Image src="/assets/svg/x.svg" width={23} height={23} alt="x" />
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
            <Button
              variant="contained"
              color="inherit"
              onClick={handleClose}
              style={{ color: "#A8AAAE", textTransform: "none" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                // Add your custom logic here
                openLink();
              }}
              style={{
                textTransform: "none",
                fontFamily: "Montserrat",
                backgroundColor: "#63C69A",
              }}
            >
              Confirm
            </Button>
          </DialogActions>
        </div>
      </div>
    </Dialog>
  );
};

export default DialogModal;
