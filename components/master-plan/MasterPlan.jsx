'use client';
import React, { useEffect, useRef, useState } from "react";
import classes from "./masterPlan.module.css";
import WelcomeDialog from "../ui/WelcomeToGaca";
import { Document, Page, pdfjs } from "react-pdf"; 

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const MasterPlan = ({ singleElem, pptFile, videoUrl, rtl }) => {
  const [openVid, setOpenVid] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const pdfWrapperRef = useRef(null);
  console.log(pptFile)
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
      pdfWrapper.addEventListener('wheel', handleScroll, { passive: false });
    }
    return () => {
      if (pdfWrapper) {
        pdfWrapper.removeEventListener('wheel', handleScroll);
      }
    };
  }, [pageNumber, numPages]);

  useEffect(()=>{
    setPageNumber(singleElem.pageNumber)
  },[singleElem.pageNumber])

  const onDocumentLoadSuccess = ({ numPages }) => {
 
    setNumPages(numPages);
    setPageNumber(1);
  };

  return (
    <div className={classes.sideContent}>
      <div className={classes.contentPlan}>
        <div>
          {openVid && <WelcomeDialog videoUrl={videoUrl} onClose={handleClose} />}
          <button
            className={classes.videoShow}
            onClick={handleOpenVideo}
            style={{
              float: rtl ? "left" : "right",
              fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
            }}
          >
            {rtl ? "فيديو توضيحي" : "Video tutorial"}
          </button>
        </div>
        <div
          ref={pdfWrapperRef}
          style={{
            height: "80%",
            width: "80%",
            backgroundColor: "#fff", 
          }}
        >
          <Document file={pptFile} onLoadSuccess={onDocumentLoadSuccess} loading={<div>loading pptx file</div>}  error={<div>Failed to load PPTX. Please try again later.</div>}>
            <Page pageNumber={pageNumber} loading={""} />
          </Document>
        </div>
      </div>
    </div>
  );
};

export default MasterPlan;
