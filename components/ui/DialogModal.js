import React from "react";
import Image from "next/image";
import classes from "./ui.module.css";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

const DialogModal = ({ open, handleClose, openLink, link }) => {
  const { t, i18n } = useTranslation();

  if (open) {
    Swal.fire({
      icon: "warning",
      title: t("alert-header"),
      text: t("alert-message"),
      showCancelButton: true,
      confirmButtonColor: "#4CAF50",
      cancelButtonColor: "#d33",
      confirmButtonText: t("confirm"),
      cancelButtonText: t("cancel"),
    }).then((result) => {
      if (result.isConfirmed) {
        // Add your custom logic here
        openLink(link);
        handleClose();
      }else{
        handleClose()
      }
    });
  }

  return null;
};

export default DialogModal;
