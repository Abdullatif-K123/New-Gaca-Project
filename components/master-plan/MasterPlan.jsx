import React, { useState } from "react";
import classes from "./masterPlan.module.css";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import WelcomeDialog from "../ui/WelcomeToGaca";
const MasterPlan = ({ singleDesc, pptFile, videoUrl}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [openVid, setOpenVid] = useState(false);
  const handleClose = ()=>{
     setOpenVid(false);
  }
  const handleOpenVideo = ()=>{
     setOpenVid(true)
  }
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDocumentLoad = (doc) => {
    setTotalPages(doc.numPages);
  };

  const renderNavigation = () => {
    const navItems = [];
    for (let i = 1; i <= totalPages; i++) {
      navItems.push(
        <li key={i}>
          <button onClick={() => handlePageChange(i)}>Page {i}</button>
        </li>
      );
    }
    return navItems;
  };

  return (
    <div className={classes.sideContent}>
      <div className={classes.contentPlan}
      >
     {openVid && <WelcomeDialog videoUrl={videoUrl} onClose={handleClose} />}
         <button className={classes.videoShow} onClick={handleOpenVideo}>Video tutorial</button>
        <DocViewer
          documents={[
            {
              uri:  pptFile,
              fileType: "pptx",  
              fileName: "Dialgo.ppt",
            },
          ]}
          initialActiveDocumentIndex={1}
          pluginRenderers={DocViewerRenderers}
          theme={{
            primary: "#fff",
            secondary: "#ffffff",
            tertiary: "#fff",
            textPrimary: "#ffffff",
            textSecondary: "#fff",
            textTertiary: "#fff",
            background: "#fff",
    
            disableThemeScrollbar: false,
          }}
          style={{ height: "80%", width: "80%", backgroundColor: "#fff", background: "#fff" }}
     
          onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
          onDocumentLoad={handleDocumentLoad}
        />
      </div>
      <div className={classes.navigation}>
        <ul>{renderNavigation()}</ul>
      </div>
    </div>
  );
};

export default MasterPlan;
