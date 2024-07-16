import React from "react";
import Image from "next/image";
import classes from "./ui.module.css";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

const DialogModal = ({ open, handleClose, openLink, link, name, description, img }) => {
 
  const { t, i18n } = useTranslation();
    
  if (open) { 
    Swal.fire({
      icon:img? "": "warning",
      title:  name? name : t("alert-header"),
      text: description? description: t("alert-message"),
      imageUrl: img ? img : undefined,
      showCancelButton: true,
      confirmButtonColor: "#63c69a",
      cancelButtonColor: "gray",
      confirmButtonText: img? "Open" : t("confirm"),
      cancelButtonText: t("cancel"),
     
      customClass: {
        container:  classes.customTitleAlert,
         title: classes.customTitleAlert,
         content: classes.customTitleAlert,
         confirmButton: classes.customTitleAlert,
         cancelButton: classes.customTitleAlert
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Add your custom logic here
        openLink(link); 
      }else{
        handleClose()
      }
    });
  }

  return null;
};

export default DialogModal;
