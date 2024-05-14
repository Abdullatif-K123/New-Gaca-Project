import React, { useEffect, useRef, useState } from "react";
import classes from "./layout.module.css";
import Image from "next/image";
import {
  Button,
  Slide,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  Grid,
  Select,
  MenuItem,
  Fade,
} from "@mui/material";
import { useFormik } from "formik";

import * as Yup from "yup";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});
const FeedBack = ({ open, handleClose, handleSubmitFeedback, rtl }) => {
  const [focusedInput, setFocusedInput] = useState(null);
  const [sendFeedback, setSendFeedback] = useState(false);
  const [dialogPadding, setDialogPadding] = useState("30px 50px");
  const [initialForms, setInitialForms] = useState({
    name: "",
    email: "",
    phone: "",
    feedbackType: 0,
    feedbackTitle: "",
    feedbackMessage: "",
  });
  const handleInputFocus = (inputName) => {
    setFocusedInput(inputName);
  };
  const inputRef = useRef("");
  const formik = useFormik({
    initialValues: initialForms,
    validationSchema: Yup.object({name: Yup.string().required(rtl ? "الاسم مطلوب" : "Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required(rtl ? "البريد الإلكتروني مطلوب" : "Email is required"),
    phone: Yup.string()
      .required(rtl ? "رقم الهاتف مطلوب" : "Phone is required")
      .matches(/^[0-9]+$/, rtl ? "يجب أن يحتوي رقم الهاتف على أرقام فقط" : "Phone number must contain only numbers")
      .min(11, rtl ? "يجب أن يكون رقم الهاتف أكثر من 11 رقمًا" : "Phone number must be more than 11 numbers long"),
    feedbackType: Yup.string().required(rtl ? "نوع التغذية المرتجعة مطلوب" : "Feedback type is required"),
    feedbackTitle: Yup.string().required(rtl ? "عنوان التغذية المرتجعة مطلوب" : "Feedback title is required"),
    feedbackMessage: Yup.string().required(rtl ? "رسالة التغذية المرتجعة مطلوبة" : "Feedback message is required"),
    }),
    onSubmit: async (values) => {
      // Handle form submission here
      console.log(values);
      setSendFeedback(true);
      await handleSubmitFeedback({
        name: values.name,
        email: values.email,
        phone: values.phone,
        feedbackType: Number(values.feedbackType),
        feedbackTitle: values.feedbackTitle,
        feedbackMessage: values.feedbackMessage,
      });

      setSendFeedback(false);
      handleClose();
      formik.resetForm();
    },
  });
  useEffect(() => {
    const handleResize = () => {
      // Adjust padding based on screen width
      if (window.innerWidth < 600) {
        setDialogPadding("20px 20px"); // Example padding for smaller screens
      } else {
        setDialogPadding("30px 50px"); // Default padding for larger screens
      }
    };

    // Call handleResize initially and add event listener
    handleResize();
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="md"
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      PaperProps={{
        style: {
          overflowY: "unset",
          overflowX: "unset",
          padding: dialogPadding,
          direction: rtl? "rtl" : ""
        },
      }}
      className={classes.dialogStyle}
      
    >
      <div
        className={classes.closeBtn}
        onClick={() => {
          handleClose();
          formik.resetForm();
        }}
      >
        <Image src="/assets/svg/x.svg" width={19} height={19} alt="x" />
      </div>
      <DialogTitle className={classes.feedbackhead} 
        style={{fontFamily: rtl? "DINNext-Arabic-meduim " : ""}}>{rtl? "الشكاوي والاقتراحات": "Feedback"}</DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.feedbackDesc} 
        style={{fontFamily: rtl? "DINNext-Arabic-meduim " : ""}}>
         {rtl? "تستطيع ارسال شكاويك او اقتراحاتك هنا": " You Can Send Your Feedback From This Form"}
        </DialogContentText>
      </DialogContent>

      <Grid  >
        <form onSubmit={formik.handleSubmit} className={classes.formsInput}>
          <div className={classes.emailPhone}>
            <div
              className={`${classes.inputLabel} ${
                focusedInput === "email" ? classes.inputLabelFocused : null
              } ${
                formik.errors.email && formik.touched.email
                  ? classes.inputLabelError
                  : null
              }`}
              
            >
              <label htmlFor="email" 
        style={{fontFamily: rtl? "DINNext-Arabic-meduim " : ""}}>
             {rtl? "البريد الاكتروني": "Email Address"}  
                {formik.touched.email && formik.errors.email ? "*" : null}
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder={rtl? "الايميل": "Email"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                onFocus={() => handleInputFocus("email")}
                style={{fontFamily: rtl? "DINNext-Arabic-meduim " : ""}}
              />
              {formik.touched.email && formik.errors.email && (
                <span className={classes.errorMessage}>
                  {formik.errors.email}
                </span>
              )}
            </div>

            <div
              className={`${classes.inputLabel} ${
                focusedInput === "phone" ? classes.inputLabelFocused : null
              } ${
                formik.errors.phone && formik.touched.phone
                  ? classes.inputLabelError
                  : null
              }`}
            >
              <label htmlFor="phone" 
              
        style={{fontFamily: rtl? "DINNext-Arabic-meduim " : ""}}>
                {rtl? "رقم الهاتف" : "Phone Number"}
                {formik.touched.phone && formik.errors.phone ? "*" : null}
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder={rtl? "رقم هاتفك" : "Phone"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                onFocus={() => handleInputFocus("phone")}
                style={{fontFamily: rtl? "DINNext-Arabic-meduim " : ""}}
              />
              {formik.touched.phone && formik.errors.phone && (
                <span className={classes.errorMessage}>
                  {formik.errors.phone}
                </span>
              )}
            </div>
          </div>
          <div
            className={`${classes.inputLabel} ${
              focusedInput === "name" ? classes.inputLabelFocused : null
            } ${
              formik.errors.name && formik.touched.name
                ? classes.inputLabelError
                : null
            }`}
          >
            <label htmlFor="name" 
            
        style={{fontFamily: rtl? "DINNext-Arabic-meduim " : ""}}>
              {rtl? "اسم المستخدم" : "Full Name"}{formik.touched.name && formik.errors.name ? "*" : null}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              ref={inputRef}
              placeholder={rtl? "الاسم": "Name"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              onFocus={() => handleInputFocus("name")}
              style={{fontFamily: rtl? "DINNext-Arabic-meduim " : ""}}
            />
            {formik.touched.name && formik.errors.name && (
              <span className={classes.errorMessage}>{formik.errors.name}</span>
            )}
          </div>

          <div className={classes.feedTypeTitle}>
            <div
              className={`${classes.inputLabel} ${
                focusedInput === "feedbackTitle"
                  ? classes.inputLabelFocused
                  : null
              } ${
                formik.errors.feedbackTitle && formik.touched.feedbackTitle
                  ? classes.inputLabelError
                  : null
              }`}
            >
              <label htmlFor="feedbackTitle" 
              
        style={{fontFamily: rtl? "DINNext-Arabic-meduim " : ""}}>
                {rtl? "العنوان" : "Feedback Title"}{" "}
                {formik.touched.feedbackTitle && formik.errors.feedbackTitle
                  ? "*"
                  : ""}
              </label>
              <input
                type="text"
                id="feedbackTitle"
                name="feedbackTitle"
                placeholder={rtl? "العنوان": "Feedback Title"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.feedbackTitle}
                onFocus={() => handleInputFocus("feedbackTitle")}
                style={{fontFamily: rtl? "DINNext-Arabic-meduim " : ""}}
              />
              {formik.touched.feedbackTitle && formik.errors.feedbackTitle && (
                <span className={classes.errorMessage}>
                  {formik.errors.feedbackTitle}
                </span>
              )}
            </div>

            <div
              className={`${classes.inputLabel} ${
                focusedInput === "feedbackType"
                  ? classes.inputLabelFocused
                  : null
              } ${
                formik.errors.feedbackType && formik.touched.feedbackType
                  ? classes.inputLabelError
                  : null
              } ${classes.customSelect} `}
            >
              <label htmlFor="feedbackType" 
        style={{fontFamily: rtl? "DINNext-Arabic-meduim " : ""}}>{rtl? "نوع الشكوى": "Feedback Type:"}</label>

              <Select
                id="feedbackType"
                name="feedbackType"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.feedbackType}
                onFocus={() => handleInputFocus("feedbackType")}
                placeholder="Select a feedback type"
                style={{ height: "45px", borderRadius: "8px", }}
              >
                <MenuItem value={0}>
                  <p style={{fontFamily: rtl? "DINNext-Arabic-meduim " : ""}}>{rtl? "توصيات" : "Recommendation"}</p>
                </MenuItem>
                <MenuItem value={1} style={{fontFamily: rtl? "DINNext-Arabic-meduim " : ""}}>{rtl? "تقرير لوجود خطأ": "Error Report"}</MenuItem>
                <MenuItem value={2} style={{fontFamily: rtl? "DINNext-Arabic-meduim " : ""}}>{rtl? "سؤال" : "Question"}</MenuItem>
                <MenuItem value={3} style={{fontFamily: rtl? "DINNext-Arabic-meduim " : ""}}>{rtl? "اخرى" : "Other"}</MenuItem>
              </Select>
              {formik.touched.feedbackType && formik.errors.feedbackType && (
                <span className={classes.errorMessage}>
                  {formik.errors.feedbackType}
                </span>
              )}
            </div>
          </div>
          <div
            className={`${classes.inputLabel} ${
              focusedInput === "feedbackMessage"
                ? classes.inputLabelFocused
                : null
            } ${
              formik.errors.feedbackMessage && formik.touched.feedbackMessage
                ? classes.inputLabelError
                : null
            }`}
          >
            <label htmlFor="feedbackMessage" 
        style={{fontFamily: rtl? "DINNext-Arabic-meduim " : ""}}>
             {rtl? "الرسالة" : "Feedback Message"}{" "}
              {formik.touched.feedbackMessage && formik.errors.feedbackMessage
                ? "*"
                : ""}
            </label>
            <textarea
              id="feedbackMessage"
              name="feedbackMessage"
              placeholder={rtl?"الرسالة" : "Feedback Message"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={4}
              value={formik.values.feedbackMessage}
              onFocus={() => handleInputFocus("feedbackMessage")}
              
        style={{fontFamily: rtl? "DINNext-Arabic-meduim " : ""}}
            />
            {formik.touched.feedbackMessage &&
              formik.errors.feedbackMessage && (
                <span className={classes.errorMessage}>
                  {formik.errors.feedbackMessage}
                </span>
              )}
          </div>

          <DialogActions>
            <button
              variant="contained"
              color="inherit"
              onClick={() => {
                handleClose();
                formik.resetForm();
              }}
              className={classes.btnCancel}
              
        style={{fontFamily: rtl? "DINNext-Arabic-meduim " : "", marginLeft: rtl? "15px": ""}}
            >
              {rtl? "الغاء": "Cancel"}
            </button>
            <Button
              type="submit"
              variant="contained"
              color="success"
              className={classes.btnSubmit}
              disabled={
                formik.errors.name ||
                formik.errors.email ||
                formik.errors.feedbackMessage ||
                formik.errors.feedbackTitle ||
                formik.errors.feedbackType ||
                formik.errors.phone ||
                !inputRef.current.value ||
                sendFeedback
                  ? true
                  : false
              }
              
        style={{fontFamily: rtl? "DINNext-Arabic-meduim " : ""}}
            >
              {rtl?"ارسال": "Submit"}
            </Button>
          </DialogActions>
        </form>
      </Grid>
    </Dialog>
  );
};

export default FeedBack;
