import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import classes from "./downloads.module.css";
import Image from "next/image";
import { useTranslation } from "react-i18next";
const ResoucesTable = ({
  filterTerm,
  rtl,
  sortByDateDescending,
  sortByDateAscending,
}) => {
  const { t, i18n } = useTranslation();
  return (
    <TableContainer component={Paper} sx={{ direction: rtl ? "rtl" : "ltr" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
                textAlign: rtl ? "right" : "left",
              }}
            >
              {t("title")}
            </TableCell>
            <TableCell
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                textAlign: "right",
                gap: "10px",
                fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
              }}
            >
              {" "}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                }}
              >
                {" "}
                <Image
                  src="/assets/svg/arrowUp.svg"
                  width={15}
                  height={15}
                  alt="arrow-up"
                  onClick={sortByDateDescending}
                />{" "}
                <Image
                  src="/assets/svg/arrowUp.svg"
                  width={15}
                  height={15}
                  alt="arrow-up"
                  onClick={sortByDateAscending}
                  style={{ transform: "rotate(180deg)" }}
                />{" "}
              </div>
              {t("date")}
            </TableCell>
            <TableCell
              style={{
                fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
                textAlign: rtl ? "right" : "left",
              }}
            >
              {t("file-size")}
            </TableCell>
            <TableCell
              style={{
                fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
                textAlign: rtl ? "right" : "left",
              }}
            >
              {t("action")}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filterTerm.map((document) => {
            console.log(document);
            const dateCreated = new Date(document.createdAt);
            const dateUpdated = new Date(document.updatedAt);
            const options = {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            };
            const formattedDate = dateCreated.toLocaleDateString(
              i18n.language,
              options
            );
            const formatteUpdate = dateUpdated.toLocaleDateString(
              i18n.language,
              options
            );
            const pdfUrl = `${document.fileUrl}`;
            return (
              <TableRow key={document.id}>
                <TableCell
                  style={{
                    fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
                    textAlign: rtl ? "right" : "left",
                  }}
                >
                  {rtl
                    ? document.title.slice(0, 30)
                    : document.titleEN.slice(0, 30)}
                  ...
                </TableCell>
                <TableCell sx={{ textAlign: rtl ? "right" : "left" }}>
                  {formattedDate}
                </TableCell>
                <TableCell sx={{ textAlign: rtl ? "right" : "left" }}>
                  {document.fileSize}
                </TableCell>
                <TableCell sx={{ textAlign: rtl ? "right" : "left" }}>
                  <div
                    className={classes.downloadButton}
                    onClick={() => {
                      downloadPdfFile(pdfUrl, document.title);
                    }}
                  >
                    <Image
                      src="/assets/svg/download-resouces.svg"
                      width={25}
                      height={25}
                      alt="download"
                    />
                    <p>{t("download-file")}</p>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResoucesTable;
