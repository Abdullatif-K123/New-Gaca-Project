import React from "react";
import classes from "./downloads.module.css";
import DownloadedTable from "./DownloadedTable";
import Image from "next/image";
import { useRouter } from "next/router";
const Downloads = () => {
  const router = useRouter();
  return (
    <div className={classes.downloadPage}>
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
          <span>Downloads</span>
        </p>
      </div>
      <div className={classes.downloadContent}>
        <h1>Download Archive</h1>
        <p>
          Documents listed in the archive part are complementary to the content
          of the eATm Portal and may be downloaded by clicking the appropriate
          "Download" text. They were previously in the main{" "}
          <span>download</span> are and have been replaced by newer versions.
          Here they are kept for convenient user reference.
        </p>
      </div>
      <div>
        <div className={classes.tableHead}>
          <p>File name</p>
          <p>Date added</p>
          <p>File size</p>
          <p></p>
        </div>
        <DownloadedTable
          fileName={"European ATM Master Plan Executive summary (spanish)"}
          date={"24-05-2017"}
          fileSize={"634.54KB"}
        />
        <DownloadedTable
          fileName={"European ATM Master Plan Executive summary (English)"}
          date={"24-05-2017"}
          fileSize={"634.54KB"}
        />
        <DownloadedTable
          fileName={"European ATM Master Plan Executive summary (France)"}
          date={"24-05-2017"}
          fileSize={"634.54KB"}
        />
        <DownloadedTable
          fileName={"European ATM Master Plan Executive summary (Italy)"}
          date={"24-05-2017"}
          fileSize={"634.54KB"}
        />
        <DownloadedTable
          fileName={"European ATM Master Plan Executive summary (Spagitty)"}
          date={"24-05-2017"}
          fileSize={"634.54KB"}
        />
        <DownloadedTable
          fileName={"European ATM Master Plan Executive summary (spanish)"}
          date={"24-05-2017"}
          fileSize={"634.54KB"}
        />
        <DownloadedTable
          fileName={"European ATM Master Plan Executive summary (spanish)"}
          date={"24-05-2017"}
          fileSize={"634.54KB"}
        />
      </div>
    </div>
  );
};

export default Downloads;
