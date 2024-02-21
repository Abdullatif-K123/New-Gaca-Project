import React, { useRef, useState } from "react";
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
} from "@mui/material";
import { API_ROUTES } from "@/utils/apiConfig";
import { useFormik } from "formik";

import * as Yup from "yup";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FeedBack = ({ open, handleClose, handleSubmitFeedback }) => {
  const [focusedInput, setFocusedInput] = useState(null);
  const [sendFeedback, setSendFeedback] = useState(false);
  const [initialForms, setInitialForms] = useState({
    name: "",
    email: "",
    phone: "",
    feedbackType: "",
    feedbackTitle: "",
    feedbackMessage: "",
  });
  const handleInputFocus = (inputName) => {
    setFocusedInput(inputName);
  };
  const inputRef = useRef("");
  const formik = useFormik({
    initialValues: initialForms,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string()
        .required("Phone is required")
        .matches(/^[0-9]+$/, "Phone number must contain only numbers")
        .min(11, "Phone number must be more than 11 numbers long"),
      feedbackType: Yup.string().required("Feedback type is required"),
      feedbackTitle: Yup.string().required("Feedback title is required"),
      feedbackMessage: Yup.string().required("Feedback message is required"),
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
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      PaperProps={{
        style: {
          overflowY: "unset",
          overflowX: "unset",
          padding: "30px 50px",
          width: "50%",
        },
      }}
    >
      <div
        style={{
          backgroundColor: "lightgray",
          position: "absolute",
          cursor: "pointer",
          top: "-15px",
          right: "-15px",
          padding: "7px 8px ",
          borderRadius: "8px",
          backgroundColor: "#fff",
          boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={() => {
          handleClose();
          formik.resetForm();
        }}
      >
        <Image src="/assets/svg/x.svg" width={23} height={23} alt="x" />
      </div>
      <DialogTitle className={classes.feedbackhead}>Feedback</DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.feedbackDesc}>
          You Can Send Your Feedback From This Form
        </DialogContentText>
      </DialogContent>
      <Grid
        container
        spacing={1}
        style={{
          marginTop: "10px",
          display: "felx",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "300px",
        }}
      >
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
              <label htmlFor="email">
                Email Address
                {formik.touched.email && formik.errors.email ? "*" : null}
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                onFocus={() => handleInputFocus("email")}
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
              <label htmlFor="phone">
                Phone Number
                {formik.touched.phone && formik.errors.phone ? "*" : null}
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                onFocus={() => handleInputFocus("phone")}
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
            <label htmlFor="name">
              UserName{formik.touched.name && formik.errors.name ? "*" : null}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              ref={inputRef}
              placeholder="Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              onFocus={() => handleInputFocus("name")}
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
              <label htmlFor="feedbackTitle">
                Feedback Title{" "}
                {formik.touched.feedbackTitle && formik.errors.feedbackTitle
                  ? "*"
                  : ""}
              </label>
              <input
                type="text"
                id="feedbackTitle"
                name="feedbackTitle"
                placeholder="Feedback Title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.feedbackTitle}
                onFocus={() => handleInputFocus("feedbackTitle")}
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
              <label htmlFor="feedbackType">Feedback Type:</label>
              <Select
                id="feedbackType"
                name="feedbackType"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.feedbackType}
                onFocus={() => handleInputFocus("feedbackType")}
                placeholder="Select a feedback type"
                style={{ height: "45px", borderRadius: "8px" }}
              >
                <MenuItem value={0}>
                  <p>Recommendation</p>
                </MenuItem>
                <MenuItem value={1}>Error Report</MenuItem>
                <MenuItem value={2}>Question</MenuItem>
                <MenuItem value={3}>Other</MenuItem>
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
            <label htmlFor="feedbackMessage">
              Feedback Message{" "}
              {formik.touched.feedbackMessage && formik.errors.feedbackMessage
                ? "*"
                : ""}
            </label>
            <textarea
              id="feedbackMessage"
              name="feedbackMessage"
              placeholder="Feedback Message"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={4}
              value={formik.values.feedbackMessage}
              onFocus={() => handleInputFocus("feedbackMessage")}
            />
            {formik.touched.feedbackMessage &&
              formik.errors.feedbackMessage && (
                <span className={classes.errorMessage}>
                  {formik.errors.feedbackMessage}
                </span>
              )}
          </div>

          <DialogActions>
            <Button
              variant="contained"
              color="inherit"
              onClick={() => {
                handleClose();
                formik.resetForm();
              }}
              className={classes.btnCancel}
            >
              Cancel
            </Button>
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
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Grid>
    </Dialog>
  );
};

export default FeedBack;
