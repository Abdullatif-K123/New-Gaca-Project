import React, { useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { API_ROUTES } from "@/utils/apiConfig";
import toast, { Toaster } from "react-hot-toast";
const Layout = (props) => {
  const { isFeedbackVisible, handleToggleFeedback, conVersion, rtl, handleRtl, handleAccessibility } = props;
  const notify = () => toast("Your feedback has been sent.", { icon: "👏" });
  const handleSubmitFeedback = async (obj) => {
    try {
      const response = await axios.post(API_ROUTES.feedback.post, {
        name: obj.name,
        email: obj.email,
        phone: obj.phone,
        feedbackType: Number(obj.feedbackType),
        feedbackTitle: obj.feedbackTitle,
        feedbackMessage: obj.feedbackMessage,
      });
      notify();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar
        isFeedbackVisible={isFeedbackVisible}
        handleToggleFeedback={handleToggleFeedback}
        conVersion={conVersion}
        handleSubmitFeedback={handleSubmitFeedback}
        rtl={rtl}
        handleRtl={handleRtl}
        handleAccessibility={handleAccessibility}

      />
      {props.children}

      <Toaster />
    </>
  );
};

export default Layout;
