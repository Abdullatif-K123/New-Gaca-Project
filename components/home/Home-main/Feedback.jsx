import React, { useState } from "react";
import classes from "./home-one.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
const Feedback = ({ isFeedbackVisible, handleToggleFeedback }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      feedbackType: "",
      feedbackTitle: "",
      feedbackMessage: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string().required("Phone is required"),
      feedbackType: Yup.string().required("Feedback type is required"),
      feedbackTitle: Yup.string().required("Feedback title is required"),
      feedbackMessage: Yup.string().required("Feedback message is required"),
    }),
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
    },
  });
  return (
    <div
      className={`${classes.feedbackSection} ${
        isFeedbackVisible ? classes.visible : ""
      }`}
    >
      <div className={classes.feedbackContent}>
        <h2>Feedback</h2>
        <form onSubmit={formik.handleSubmit} className={classes.formsInput}>
          <div className={classes.inputLabel}>
            <label htmlFor="name">Name </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
          </div>

          <div className={classes.inputLabel}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </div>

          <div className={classes.inputLabel}>
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
          </div>

          <div className={classes.inputLabel}>
            <label htmlFor="feedbackType">Feedback Type:</label>
            <select
              id="feedbackType"
              name="feedbackType"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.feedbackType}
            >
              <option value="" label="Select a feedback type" />
              <option value="Recommendation" label="Recommendation" />
              <option value="Error Report" label="Error Report" />
              <option value="Question" label="Question" />
              <option value="Other" label="Other" />
            </select>
          </div>

          <div className={classes.inputLabel}>
            <label htmlFor="feedbackTitle">Feedback Title</label>
            <input
              type="text"
              id="feedbackTitle"
              name="feedbackTitle"
              placeholder="Feedback Title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.feedbackTitle}
            />
          </div>

          <div className={classes.inputLabel}>
            <label htmlFor="feedbackMessage">Feedback Message</label>
            <textarea
              id="feedbackMessage"
              name="feedbackMessage"
              placeholder="Feedback Message"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={7}
              value={formik.values.feedbackMessage}
            />
          </div>

          <div className={classes.submitBtn}>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
