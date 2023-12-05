import React from "react";
import Navbar from "./Navbar";
const Layout = (props) => {
  const { isFeedbackVisible, handleToggleFeedback } = props;

  return (
    <>
      <Navbar
        isFeedbackVisible={isFeedbackVisible}
        handleToggleFeedback={handleToggleFeedback}
      />
      {props.children}
    </>
  );
};

export default Layout;
