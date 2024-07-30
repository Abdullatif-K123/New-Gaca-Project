import React from "react";
import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import classes from "./downloads.module.css";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const ResourcesFAQ = ({ filterTerm, rtl, fontSizeGeneral }) => {
  const [expandedIndices, setExpandedIndices] = useState([]);
  // Function to handle accordion expansion
  const handleAccordionChange = (index) => {
    if (expandedIndices.includes(index)) {
      // If the accordion is already expanded, collapse it
      setExpandedIndices([]);
    } else {
      // If the accordion is not expanded, expand it
      setExpandedIndices([index]);
    }
  };
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
            borderTopLeftRadius: "6px",
            borderTopRightRadius: "6px",
            background: "#fff",
            boxShadow:
              "0px 2px 4px 1px rgba(51, 48, 60, 0.03),0px 3px 4px 0px rgba(51, 48, 60, 0.02),0px 1px 3px 2px rgba(51, 48, 60, 0.01)",
          },
        },
      },
      MuiAccordionDetails: {
        styleOverrides: {
          root: {
            borderRadius: "10px",
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.faQestions}>
        {filterTerm.map((item, index) => (
          <Accordion
            key={index}
            style={{ boxShadow: "none", padding: "0" }}
            expanded={expandedIndices.includes(index)}
            onChange={() => handleAccordionChange(index)}
          >
            <AccordionSummary
              expandIcon={
                expandedIndices.includes(index) ? (
                  <FiMinus color="gray" />
                ) : (
                  <GoPlus />
                )
              }
              // Set background color dynamically
              style={{
                background: expandedIndices.includes(index)
                  ? "#f1f0f2"
                  : "#fff",
                borderLeft: expandedIndices.includes(index)
                  ? "2px solid #1C7A54"
                  : "none",
              }}
            >
              <Typography
                className={classes.freq}
                style={{
                  color: expandedIndices.includes(index) ? "#1C7A54" : "#000",
                  fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
                  fontSize: `${15 + fontSizeGeneral}px`,
                }}
              >
                {rtl ? item?.title?.slice(0, 80) : item?.titleEN?.slice(0, 80)}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              style={{
                borderRadius: "0px",
                background: "#f1f0f2",
                marginTop: "-20px",
                borderLeft: expandedIndices.includes(index)
                  ? "2px solid #1C7A54"
                  : "",
              }}
            >
              <Typography
                sx={{
                  color: "rgba(51, 48, 60, 0.87)",
                  fontSize: `${13 + fontSizeGeneral}px`,
                  fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
                }}
              >
                {rtl ? item.description : item?.descriptionEN}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </ThemeProvider>
  );
};

export default ResourcesFAQ;
