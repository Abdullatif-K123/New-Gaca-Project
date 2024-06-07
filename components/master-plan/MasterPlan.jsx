"use client";
import React, { useEffect, useRef, useState } from "react";
import classes from "./masterPlan.module.css";
import WelcomeDialog from "../ui/WelcomeToGaca";
import { Document, Page, pdfjs } from "react-pdf";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import MasterPlanTable from "./MasterPlanTable";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
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
          <div ref={pdfWrapperRef} className={classes.documentMasterPlan}>
            <Document
              file={`/assets/pdf/LAYER${router.query.id}.pdf`}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <div style={{ position: "fixed", left: "50%", top: "60%" }}>
                  <span class="loaderPdf"></span>
                  <p style={{ color: "#000", fontSize: "15px" }}>Loading...</p>
                </div>
              }
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
                  <TableCell className={classes.tableHover}>Title</TableCell>
                  <TableCell className={classes.tableHover}>
                    Start Date
                  </TableCell>
                  <TableCell className={classes.tableHover}>
                    Finish Date
                  </TableCell>
                  <TableCell className={classes.tableHover}>
                    Implementation Progress
                  </TableCell>
                  <TableCell className={classes.tableHover}>
                    Download Progress Report
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {monitor.map((data) => {
                  return <MasterPlanTable data={data} rtl={rtl} />;
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
