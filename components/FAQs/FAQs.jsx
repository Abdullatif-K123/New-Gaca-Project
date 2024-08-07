import React, { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/router";
import classes from "./faq.module.css";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import FAQsBottom from "./FAQsBottom";

import parse from "html-react-parser";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Subscribe from "../ui/Subscribe";
import { useFontSize } from "@/store/FontSizeContext";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import classestwo from "../home/Home-main/home-one.module.css";
const FAQs = ({ data, conVersion, rtl }) => {
  console.log(data);
  const [faqData, setFaqData] = useState(data.genral);
  const [faqTitle, setFaqTitle] = useState(0);

  const { t } = useTranslation();
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
      setExpandedIndices([]);
    } else {
      // If the accordion is not expanded, expand it
      setExpandedIndices([index]);
    }
  };
  // Extracting the fontsize context from store
  const { fontSizeGeneral } = useFontSize();
  const [showBtn, setShowBtn] = useState(false);

  //side effect for showing arrow up Bottom when the window be in the second section or down
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const threshold = 300; // Adjust this value based on when you want the button to appear
      setShowBtn(scrollTop > threshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  //Handling clicking button up to the top of the page
  const handleClick = () => {
    const targetElement = document.getElementById("home");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  //Function selecting for the faq type
  const handleFaqType = (type) => {
    if (type === 0) {
      setFaqData(data.genral);
      setFaqTitle(0);
    } else if (type === 1) {
      setFaqData(data.kpi);
      setFaqTitle(1);
    } else {
      setFaqData(data.kpa);
      setFaqTitle(2);
    }
  };
  return (
    <div>
      <ThemeProvider theme={theme}>
        <div
          className={classes.faqMain}
          style={{ direction: rtl ? "rtl" : "" }}
        >
          <div
            className={classes.choosen}
            style={{ fontSize: `${14 + fontSizeGeneral}px` }}
          >
            <p>
              <span
                onClick={() => {
                  router.push("/");
                }}
                style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}
              >
                {t("home-route")}
              </span>
              <Image
                src="/assets/svg/Chevron.svg"
                width={16}
                height={16}
                style={{ transform: rtl ? "rotate(180deg)" : "" }}
                alt="chevorn"
              />
            </p>
            <h1
              style={{
                fontSize: `${48 + fontSizeGeneral}px`,
                fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
              }}
            >
              {t("faq")}
            </h1>
          </div>
          <div className={classes.faqContent}>
            <p
              style={{
                fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
                fontSize: `${16 + fontSizeGeneral}px`,
              }}
            >
              {rtl
                ? conVersion?.faqPageDescription
                : conVersion?.faqPageDescriptionEN}
            </p>
            <div className={classes.faqTypeMain}>
              <div className={classes.sideSection}>
                <div className={`${classes.faqType}  ${classes.resminiHead}`}>
                  <Image
                    src={`/assets/svg/books.svg`}
                    width={25}
                    height={25}
                    alt="credit-card"
                  />
                  <p
                    style={{
                      fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
                      fontSize: `${16 + fontSizeGeneral}px`,
                    }}
                  >
                    {t("faq")}
                  </p>
                </div>
                <div
                  className={`${classes.faqType} ${
                    faqTitle === 0 ? classes.faqTypeClicked : ""
                  }`}
                  onClick={() => {
                    handleFaqType(0);
                  }}
                >
                  <Image
                    src={"/assets/svg/box-1.svg"}
                    width={20}
                    height={20}
                    alt="box"
                    style={{
                      filter: faqTitle === 0 ? "invert(0)" : "brightness(0.2)",
                    }}
                  />
                  <p>{t("faq")}</p>
                </div>
                <div
                  className={`${classes.faqType} ${
                    faqTitle === 1 ? classes.faqTypeClicked : ""
                  }`}
                  onClick={() => {
                    handleFaqType(1);
                  }}
                >
                  <Image
                    src={"/assets/svg/box-2.svg"}
                    width={20}
                    height={20}
                    alt="box"
                    style={{
                      filter:
                        faqTitle === 1 ? "brightness(10)" : "brightness(0.2)",
                    }}
                  />
                  <p>KPI Overview</p>
                </div>
                <div
                  className={`${classes.faqType} ${
                    faqTitle === 2 ? classes.faqTypeClicked : ""
                  }`}
                  onClick={() => {
                    handleFaqType(2);
                  }}
                >
                  <Image
                    src={"/assets/svg/box-3.svg"}
                    width={20}
                    height={20}
                    alt="box"
                    style={{
                      filter:
                        faqTitle === 2 ? "brightness(10)" : "brightness(0.2)",
                    }}
                  />
                  <p>KPA Overview</p>
                </div>
                <Image
                  src="/assets/imges/faq-background.png"
                  width={200}
                  height={200}
                  alt="air-plane"
                  className={classes.planeImg}
                />
              </div>
              <div className={classes.faqheaderQuestion}>
                <div className={classes.faqtitleHead}>
                  <div className={classes.faqImgHead}>
                    <Image
                      src={`/assets/svg/box-${faqTitle + 1}.svg`}
                      width={30}
                      height={30}
                      alt="credit-card"
                      style={{
                        filter: "brightness(10)",
                      }}
                    />
                  </div>
                  <p
                    style={{
                      fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
                      fontSize: `${16 + fontSizeGeneral}px`,
                    }}
                  >
                    {faqTitle === 1
                      ? "KPI Overview"
                      : faqTitle === 2
                      ? "KPA Overview"
                      : t("faq")}
                  </p>
                </div>
                {faqData.length > 0 ? (
                  <div className={classes.faQestions}>
                    {faqData.map((item, index) => (
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
                              color: expandedIndices.includes(index)
                                ? "#1C7A54"
                                : "#000",
                              fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
                              fontSize: `${15 + fontSizeGeneral}px`,
                            }}
                          >
                            {rtl
                              ? item.title?.slice(0, 80)
                              : item.titleEN?.slice(0, 80)}
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
                            {rtl
                              ? parse(item.description)
                              : parse(item.descriptionEN)}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <Image
                      src="/assets/imges/page_empty.png"
                      width={350}
                      height={350}
                      alt="not_found "
                    />
                  </div>
                )}
              </div>
            </div>

            <FAQsBottom
              phone={conVersion?.phone}
              email={conVersion?.email}
              fontSizeGeneral={fontSizeGeneral}
              rtl={rtl}
            />
          </div>
          <Subscribe rtl={rtl} />
        </div>
        {showBtn && (
          <div className={classestwo.btnUp} onClick={handleClick}>
            <Image
              src="/assets/svg/arrow-up.svg"
              width={15}
              height={15}
              alt="arrow-down"
              className={classestwo.arrowDown}
            />
          </div>
        )}
      </ThemeProvider>
    </div>
  );
};

export default FAQs;
