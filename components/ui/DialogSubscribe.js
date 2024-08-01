import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Image from "next/image";
import classes from "./ui.module.css";
import { useTranslation } from "react-i18next";
import {
  loadCaptchaEnginge,
  validateCaptcha,
} from "node_modules/react-simple-captcha";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogModalSubscribe = ({
  open,
  handleClose,
  openLink,
  link,
  name,
  description,
  img,
}) => {
  const { t, i18n } = useTranslation();

  const doSubmit = () => {
    let user_captcha = document.getElementById("user_captcha_input").value;
    if (validateCaptcha(user_captcha) == true) {
      alert("Captcha Matched");
      loadCaptchaEnginge(8);
      document.getElementById("user_captcha_input").value = "";
    } else {
      alert("Captcha Does Not Match");
      document.getElementById("user_captcha_input").value = "";
    }
  };
  return (
    <Dialog
      TransitionComponent={Transition}
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: { 
          direction: i18n.language === "ar" ? "rtl" : "ltr",
        },
        
      }}
      fullWidth
  maxWidth="md"
    >
      <div style={{ position: "relative" }}>
        {/* <div className={classes.closeBtn} onClick={handleClose}>
          <Image src="/assets/svg/x.svg" width={17} height={17} alt="x" />
        </div> */}
        <div style={{ padding: 8 }}>
          <DialogContent>
            <div
              style={{
                display: "flex", 
                justifyContent: "center",
                gap: "40px",
              }}
            >
              <Image src={img} width={150} height={150} alt={name}/>
            
            <DialogContentText id="alert-dialog-slide-description">
              <h1 style={{marginBottom: "20px", fontFamily: i18n.language === "ar" ? "DINNext-Arabic-meduim " : "",}}>{name}</h1>
             <p style={{ fontFamily: i18n.language === "ar" ? "DINNext-Arabic-meduim " : "",}}>{description}</p> 
            </DialogContentText>
            </div>
          </DialogContent>
          
          <DialogActions sx={{ display: "flex", gap: "10px", marginTop: "20px",marginBottom: "10px" }}>
            <button
              variant="contained"
              color="inherit"
              onClick={handleClose}
              className={classes.btnCancel}
              style={{ fontFamily: i18n.language === "ar" ? "DINNext-Arabic-meduim " : "",}}
            >
              {t("cancel")}
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
              style={{ fontFamily: i18n.language === "ar" ? "DINNext-Arabic-meduim " : "",}}
            >
              {t("open")}
            </button>
          </DialogActions>
        </div>
      </div>
    </Dialog>
  );
};

export default DialogModalSubscribe;
