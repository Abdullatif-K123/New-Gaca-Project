import React, { useState } from "react";
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
import Subscribe from "../ui/Subscribe";
const FAQs = ({data, conVersion, rtl}) => {
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

  const router = useRouter(); 
  const [expandedIndices, setExpandedIndices] = useState([]);
 
   // Function to handle accordion expansion
   const handleAccordionChange = (index) => {
    if (expandedIndices.includes(index)) {
      // If the accordion is already expanded, collapse it
      setExpandedIndices(expandedIndices.filter(i => i !== index));
    } else {
      // If the accordion is not expanded, expand it
      setExpandedIndices([...expandedIndices, index]);
    }
  };

  return (
    <ThemeProvider theme={theme} >
      <div className={classes.faqMain} style={{direction: rtl? "rtl" : ""}}>
        <div className={classes.choosen}>
          <p>
            <span
              onClick={() => {
                router.push("/");
              }}
            >
              {rtl? "الرئيسية" : "Home"}
            </span>
            <Image src="/assets/svg/Chevron.svg" width={16} height={16} style={{transform: rtl? "rotate(180deg)" :  ""}}/>
          </p>
          <h1>{rtl? "الاسئلة الاكثر تكرار" : "FAQ"}</h1>
        </div>
        <div className={classes.faqContent}>
          <p>
            {rtl? conVersion?.faqPageDescription : conVersion?.faqPageDescriptionEN}
          </p>
          <div className={classes.faQestions}>
      {data.map((item, index) => (
        <Accordion key={item} style={{ boxShadow: "none", padding:"0"   }}  expanded={expandedIndices.includes(index)} onChange={() => handleAccordionChange(index)}>
          <AccordionSummary
            expandIcon={expandedIndices.includes(index) ? "_" : "+"} 
              // Set background color dynamically
              style={{background: expandedIndices.includes(index)? "#f1f0f2" : "",  borderLeft:expandedIndices.includes(index)? "2px solid #1C7A54": "" }}
          >
            <Typography className={classes.freq} style={{color:expandedIndices.includes(index) ? "#1C7A54" : ""}}>
              <Image src={`/assets/svg/${expandedIndices.includes(index) ? "star-green.svg": "star.svg"}`} width={18} height={18} alt="star" />
              {rtl ? item.title.slice(0, 80) : item.titleEN.slice(0, 80)}...
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{borderRadius: "0px", background: "#f1f0f2", marginTop: "-20px",  borderLeft:expandedIndices.includes(index)? "2px solid #1C7A54": ""  }}>
            <Typography
              sx={{ color: "rgba(51, 48, 60, 0.87)", fontSize: "13px" }}
            
            >
              {rtl ? item.description : item.descriptionEN}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
        </div>
       <Subscribe rtl={rtl}/>       
      </div>
    </ThemeProvider>
  );
};

export default FAQs;
