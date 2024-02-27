import React from "react";
import { useRouter } from "next/router";
import classes from "./faq.module.css";
import Image from "next/image";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const FAQs = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976D2", // Customize primary color
      },
    },
    components: {
      MuiAccordion: {
        styleOverrides: {
          root: {
            margin: "5px",
            padding: "0px 10px",
            borderRadius: "10px",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            backgroundColor: "#fff", // Customize summary background color
            borderRadius: "10px",
          },
        },
      },
      MuiAccordionDetails: {
        styleOverrides: {
          root: {
            borderRadius: "10px",
            padding: "10px",
          },
        },
      },
    },
  });

  const router = useRouter();

  return (
    <ThemeProvider theme={theme}>
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
          <p>
            Documents listed in the archive part are complementary to the
            content of the eSNAP Portal and may be downloaded by clicking the
            appropriate "Download" text. They were previously in the main
            download area and have been replaced by newer versions. Here they
            are kept for convenient user reference.
          </p>
          <div className={classes.faQestions}>
            {[1, 2, 3].map((item, index) => (
              <Accordion key={item}>
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
                  <Typography
                    sx={{ fontWeight: "500", color: "rgba(51, 48, 60, 0.87)" }}
                  >
                    Frequently Asked Questions.
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ color: "rgba(51, 48, 60, 0.87)" }}>
                    Here is the answer to Frequently Asked Questions.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default FAQs;
