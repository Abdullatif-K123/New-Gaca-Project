import React from "react";
import classes from "./downloads.module.css";
import Image from "next/image";
const DownloadedTable = ({ fileName, date, fileSize }) => {
  return (
    <div className={classes.downloadTable}>
      <div className={classes.tableHead}>
        <p>
          {" "}
          <Image
            src="/assets/svg/Document.svg"
            width={18}
            height={18}
            alt="document"
          />
          {fileName}
        </p>
        <p>{date}</p>
        <p>{fileSize}</p>
        <p>Downloads</p>
      </div>
    </div>
  );
};

export default DownloadedTable;
