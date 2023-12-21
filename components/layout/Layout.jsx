import React from "react";
import Navbar from "./Navbar";
const Layout = (props) => {
  const { isFeedbackVisible, handleToggleFeedback, conVersion } = props;

  return (
    <>
      <Navbar
        isFeedbackVisible={isFeedbackVisible}
        handleToggleFeedback={handleToggleFeedback}
        conVersion={conVersion}
      />
      {props.children}
    </>
  );
};

export default Layout;
