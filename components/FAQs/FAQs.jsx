import React from "react";
import { useRouter } from "next/router";
import classes from "./faq.module.css";
import { AiOutlineArrowDown } from "react-icons/ai";
import Image from "next/image";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Icon,
  Typography,
} from "@mui/material";
const FAQs = () => {
  return (
    <div className={classes.faqMain}>
      <div className={classes.choosen}>
        <p>
          <span
            onClick={() => {
              router.push("/");
            }}
          >
            Home
          </span>

          <Image src="/assets/svg/Chevron.svg" width={16} height={16} />
        </p>
        <h1>FAQ</h1>
      </div>
      <div className={classes.faqContent}>
        <h2>Here should display Frequently Asked Questions.</h2>
        <div className={classes.faQestions}>
          <Accordion>
            <AccordionSummary
              expandIcon={
                <Image
                  src="/assets/svg/chevron-right.svg"
                  width={18}
                  height={18}
                  alt="expand-more"
                />
              }
            >
              <Typography sx={{ fontWeight: "500" }}>
                Frequently Asked Questions.
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: "text.secondary" }}>
                here is the answer of Frequently Asked Questions.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={
                <Image
                  src="/assets/svg/chevron-right.svg"
                  width={18}
                  height={18}
                  alt="expand-more"
                />
              }
            >
              <Typography sx={{ fontWeight: "500" }}>
                Frequently Asked Questions.
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: "text.secondary" }}>
                here is the answer of Frequently Asked Questions.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={
                <Image
                  src="/assets/svg/chevron-right.svg"
                  width={18}
                  height={18}
                  alt="expand-more"
                />
              }
            >
              <Typography sx={{ fontWeight: "500" }}>
                Frequently Asked Questions.
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: "text.secondary" }}>
                here is the answer of Frequently Asked Questions.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
