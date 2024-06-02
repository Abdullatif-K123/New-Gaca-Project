"use client";
import React, { useEffect, useRef, useState } from "react";
import classes from "./masterPlan.module.css";
import WelcomeDialog from "../ui/WelcomeToGaca";
import { Document, Page, pdfjs } from "react-pdf";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  LinearProgress,
  Typography,
  Box,
  Button,
} from "@mui/material";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const MasterPlan = ({
  singleElem,
  pptFile,
  videoUrl,
  rtl,
  switching,
  monitor,
}) => {
  const router = useRouter();

  console.log(monitor);
  const { t } = useTranslation();
  const [openVid, setOpenVid] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const pdfWrapperRef = useRef(null);
  console.log(pptFile);

  const handleClose = () => {
    setOpenVid(false);
  };

  const handleOpenVideo = () => {
    setOpenVid(true);
  };

  const handleScroll = (e) => {
    e.preventDefault();

    const delta = e.deltaY;
    if (delta > 0 && pageNumber < numPages) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    } else if (delta < 0 && pageNumber > 1) {
      setPageNumber((prevPageNumber) => prevPageNumber - 1);
    }
  };

  useEffect(() => {
    const pdfWrapper = pdfWrapperRef.current;
    if (pdfWrapper) {
      pdfWrapper.addEventListener("wheel", handleScroll, { passive: false });
    }
    return () => {
      if (pdfWrapper) {
        pdfWrapper.removeEventListener("wheel", handleScroll);
      }
    };
  }, [pageNumber, numPages]);

  useEffect(() => {
    setPageNumber(singleElem.pageNumber);
  }, [singleElem.pageNumber]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  return (
    <div className={classes.sideContent}>
      <div className={classes.contentPlan}>
        <div>
          {openVid && (
            <WelcomeDialog videoUrl={videoUrl} onClose={handleClose} />
          )}
          <button
            className={classes.videoShow}
            onClick={handleOpenVideo}
            style={{
              float: rtl ? "left" : "right",
              fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
            }}
          >
            {t("video-tutorial")}
          </button>
        </div>
        {!switching ? (
          <div
            ref={pdfWrapperRef}
            style={{
              height: "80%",
              width: "80%",
              backgroundColor: "#fff",
            }}
          >
            <Document
              file={`/assets/pdf/LAYER${router.query.id}.pdf`}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<div>loading pptx file</div>}
              error={<div>Failed to load PPTX. Please try again later.</div>}
            >
              <Page pageNumber={pageNumber} loading={""} />
            </Document>
          </div>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    {" "}
                    <TableSortLabel
                      active={true}
                      direction={"asc"}
                    ></TableSortLabel>
                    Code
                  </TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>Finish Date</TableCell>
                  <TableCell>Implementation Progress</TableCell>
                  <TableCell>Download Progress Report</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {monitor.map((data) => {
                  const dateStart = new Date(data.projectStartDate);
                  const dateEnd = new Date(data.projectEndDate);
                  const options = {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  };
                  const formattedDateStart = dateStart.toLocaleDateString(
                    rtl ? "ar-EG" : "en-US",
                    options
                  );
                  const formattedDateEnd = dateEnd.toLocaleDateString(
                    rtl ? "ar-EG" : "en-US",
                    options
                  );
                  return (
                    <TableRow key={data.id}>
                      <TableCell>{data.code}</TableCell>
                      <TableCell>
                        {parse(rtl ? data.title : data.titleEN)}
                      </TableCell>
                      <TableCell>{formattedDateStart}</TableCell>
                      <TableCell>{formattedDateEnd}</TableCell>
                      <TableCell>
                        <div
                          style={{
                            width: "100%",
                            position: "relative",
                          }}
                        >
                          <Box sx={{ width: "70%", color: "#63c69a" }}>
                            <LinearProgress
                              color="inherit"
                              variant="determinate"
                              value={20}
                              sx={{
                                height: 20,
                                borderRadius: "3px",
                              }}
                            />
                          </Box>
                          <Typography
                            variant="body1"
                            align="center"
                            sx={{
                              position: "absolute",
                              top: "50%",
                              left: "35%",
                              transform: "translate(-50%, -50%)",
                              zIndex: 99,
                              color: "#000",
                            }}
                          >
                            20%
                          </Typography>
                        </div>
                      </TableCell>
                      <TableCell>
                        {" "}
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "#63c69a",
                            width: "50%",
                            fontSize: "12px",
                          }}
                        >
                          Show
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};

export default MasterPlan;
