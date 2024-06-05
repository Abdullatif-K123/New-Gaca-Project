import React, { useRef, useState } from "react";
import classes from "./ui.module.css";
import { API_ROUTES } from "@/utils/apiConfig";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useFontSize } from "@/store/FontSizeContext";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
const notify = (msg) => toast(msg);
const Subscribe = ({ rtl }) => {
  const [sendFeedback, setSendFeedback] = useState(false);
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const { fontSizeGeneral } = useFontSize();
  // adding validation for Email Subscribe
  const inputRef = useRef("");
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t("email-invalid"))
        .required(t("email-required")),
    }),
    onSubmit: async (valuse) => {
      handleSubscribe(valuse.email);
      formik.handleReset();
    },
  });

  const handleSubscribe = async (emails) => {
    try {
      setSendFeedback(true);
      console.log(API_ROUTES.subscribe.post);
      const response = await axios.post(API_ROUTES.subscribe.post, {
        email: emails,
      });
      console.log("Subscription successful:", response.data);
      notify(response.data.errorMessage);
      setEmail("");
      // You can add further actions like showing a success message to the user
    } catch (error) {
      console.error("Error subscribing:", error?.response.data.errorMessage);
      notify(error.response.data.errorMessage);
      // Handle error, show error message, etc.
    }
    setSendFeedback(false);
  };
  return (
    <div className={classes.emailing} style={{ direction: rtl ? "rtl" : "" }}>
      <h3
        style={{
          fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
          fontSize: `${19 + fontSizeGeneral}px`,
        }}
      >
        {t("mailing")}
      </h3>
      <p
        style={{
          fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
          fontSize: `${11 + fontSizeGeneral}px`,
        }}
      >
        {rtl ? (
          "لتبقى على اطلاع بأخبار وزارة النقل يرجى الاشتراك في القائمة البريدية"
        ) : (
          <>
            To keep up-to-date with the news of the Ministry <br /> of
            Transport, Please subscribe to the mailing list
          </>
        )}
      </p>
      <div className={classes.emaillist}>
        <input
          style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}
          type="email"
          id="email"
          placeholder={t("email")}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`${
            formik.touched.email && formik.errors.email
              ? classes.errorMailing
              : null
          }`}
        />
        {formik.touched.email && formik.errors.email && (
          <span className={classes.errorMessage}>{formik.errors.email}</span>
        )}
        <button
          style={{
            left: rtl ? "40px" : "",
            right: rtl ? "" : "0",
            fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
          }}
          onClick={formik.handleSubmit}
          disabled={!formik.isValid || formik.isSubmitting}
          className={`${
            formik.touched.email && formik.errors.email
              ? classes.errorButton
              : sendFeedback
              ? classes.errorButton
              : null
          }`}
        >
          {t("subscribe")}
        </button>
      </div>
      <Toaster />
    </div>
  );
};
export default Subscribe;
