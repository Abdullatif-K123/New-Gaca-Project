import React from "react";
import classes from "./layout.module.css";
import Image from "next/image";
const Navbar = () => {
  return (
    <nav className={classes.navMain}>
      <div className={classes.logo}>
        <Image src="/assets/svg/Logo.svg" width={140} height={47} />
      </div>
      <div className={classes.navSections}>
        <ul className={classes.section}>
          <li>Home</li>
          <li>About GACA</li>
          <li>Download</li>
          <li>News</li>
          <li>
            Constructor{" "}
            <Image src="/assets/svg/share1.svg" width={17} height={17} />
          </li>
        </ul>
      </div>
      <div className={classes.feedBackSection}>
        <div className={classes.btnFeedback}>
          <Image src="/assets/svg/review1.svg" width={23} height={23} />
          <p>Feedback</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
