import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Image from "next/image";
import classes from "./ui.module.css";
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslation } from "react-i18next";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const DialogModalSubscribe = ({ open, handleClose, openLink, link }) => {
  const {t, i18n} = useTranslation();
  const [captchaValue, setCaptchaValue] = useState('');

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };
  const handleSubmit = () => {
    // Verify captchaValue on the server-side
    console.log('Captcha value:', captchaValue);
  };


  return (
    <Dialog
      TransitionComponent={Transition}
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          overflowY: "unset",
          overflowX: "unset",
          direction: i18n.language === 'ar'? "rtl":"ltr"
        },
      }}
      
    >
      <div style={{ position: "relative" }}>
        <div className={classes.closeBtn} onClick={handleClose}>
          <Image src="/assets/svg/x.svg" width={17} height={17} alt="x" />
        </div>
        <div style={{ padding: 8 }}>
          <DialogTitle style={{ color: "#4B465C" }}>{t("alert-header")}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
               {t("alert-message")}
            </DialogContentText>
            <form>
        {/* Your form fields */}
        <ReCAPTCHA
          sitekey="YOUR_SITE_KEY_FROM_GOOGLE_RECAPTCHA"
          onChange={handleCaptchaChange}
        />
        <button type="button" onClick={handleSubmit}>Submit</button>
      </form>
          </DialogContent>
          <DialogActions sx={{display: "flex", gap: "10px"}}>
            <button
              variant="contained"
              color="inherit"
              onClick={handleClose}
              className={classes.btnCancel}
            >
              {t('cancel')}
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
              {t('confirm')}
            </button>
          </DialogActions>
        </div>
      </div>
    </Dialog>
  );
};

export default DialogModalSubscribe;
