import React, { useEffect, useState } from "react";
import classes from "./home-one.module.css";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
const Feedback = ({ isFeedbackVisible, handleToggleFeedback }) => {
  const [focusedInput, setFocusedInput] = useState(null);
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
  const formik = useFormik({
    initialValues: initialForms,
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
  useEffect(() => {
    formik.resetForm();
  }, [isFeedbackVisible]);
  return (
    <div
      className={`${classes.feedbackSection} ${
        isFeedbackVisible ? classes.visible : ""
      }`}
    >
      <div className={classes.feedbackContent}>
        <h2>
          Feedback{" "}
          <Image
            src="/assets/svg/exit.svg"
            width={27}
            height={27}
            className={classes.exitImage}
            onClick={handleToggleFeedback}
            alt="exit"
          />
        </h2>
        <form onSubmit={formik.handleSubmit} className={classes.formsInput}>
          <div
            className={`${classes.inputLabel} ${
              focusedInput === "name" ? classes.inputLabelFocused : null
            } ${
              formik.errors.name && formik.touched.name
                ? classes.inputLabelError
                : null
            }`}
          >
            <label htmlFor="name">Name{formik.errors.name ? "*" : null}</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              onFocus={() => handleInputFocus("name")}
            />
          </div>

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
              Email{formik.errors.email ? "*" : null}
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
              Phone{formik.errors.email ? "*" : null}
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
          </div>

          <div
            className={`${classes.inputLabel} ${
              focusedInput === "feedbackType" ? classes.inputLabelFocused : null
            }`}
          >
            <label htmlFor="feedbackType">Feedback Type:</label>
            <select
              id="feedbackType"
              name="feedbackType"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.feedbackType}
              onFocus={() => handleInputFocus("feedbackType")}
            >
              <option value="" label="Select a feedback type" />
              <option value="Recommendation" label="Recommendation" />
              <option value="Error Report" label="Error Report" />
              <option value="Question" label="Question" />
              <option value="Other" label="Other" />
            </select>
          </div>

          <div
            className={`${classes.inputLabel} ${
              focusedInput === "feedbackTitle"
                ? classes.inputLabelFocused
                : null
            }`}
          >
            <label htmlFor="feedbackTitle">Feedback Title</label>
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
            <label htmlFor="feedbackMessage">Feedback Message</label>
            <textarea
              id="feedbackMessage"
              name="feedbackMessage"
              placeholder="Feedback Message"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={7}
              value={formik.values.feedbackMessage}
              onFocus={() => handleInputFocus("feedbackMessage")}
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
