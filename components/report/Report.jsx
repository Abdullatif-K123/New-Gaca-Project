import React from "react";
import styles from "./report.module.css";
import Image from "next/image";
import { PolarArea } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import parse from "html-react-parser";

ChartJS.register(
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const ReportPage = ({ data }) => {
  const dataLine = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My Dataset",
        data: [12, 19, 3, 5, 2, 3, 9],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const optionsLine = {
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Value",
        },
        suggestedMin: 0,
        suggestedMax: 20,
      },
    },
  };
  const dataShart = {
    labels: ["Ethiopia", "Germany", "Romaina", "Denmark", "Tunisa", "Malta"],
    datasets: [
      {
        label: "My Dataset",
        data: [11, 16, 7, 3, 14, 9],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(201, 203, 207, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(255, 205, 86)",
          "rgb(201, 203, 207)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    scales: {
      r: {
        ticks: {
          display: false, // Hide the numbers
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "right", // Move legend to the right
      },
      title: {
        display: true,
        text: "Polar Area Chart Example", // Add a title to the chart
      },
    },
  };

  const {
    expectedBenefitCapacity,
    expectedBenefitOprationalEfficiency,
    expectedBenefitCostEfficiency,
    expectedBenefitSafety,
    expectedBenefitEnvironment,
    expectedBenefitSecurity,
    operatingEnvironmentAirport,
    operatingEnvironmentTerminal,
    operatingEnvironmentACC,
    operatingEnvironmentNotApplicable,
    projectStartDate,
    projectEndDate,
    percentage,
    title,
    titleEN,
    descriptionEN,
    description,
  } = data.projectInformation;
  // Configure for download the report as pdf
  const downloadPdf = () => {
    setTimeout(() => {
      const pdf = new jsPDF("p", "mm", "a4"); // A4 size in mm
      const pageHeight = pdf.internal.pageSize.getHeight();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 10; // Add some margin to avoid cutting off content

      const content = document.body;
      const padding = 100; // 100px padding from left and right
      const button = document.getElementById("downloadButton");
      // Hide the button before capturing the content
      button.style.display = "none";

      html2canvas(content, {
        windowWidth: content.scrollWidth,
        windowHeight: content.scrollHeight,
        x: padding,
        width: content.scrollWidth - 2 * padding,
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = imgWidth / pageWidth;
        const pdfHeight = imgHeight / ratio;

        let heightLeft = pdfHeight;
        let position = 0;

        // Add the first page
        pdf.addImage(imgData, "PNG", 0, position, pageWidth, pdfHeight);
        heightLeft -= pageHeight - margin;

        // Add more pages if necessary
        while (heightLeft > 0) {
          position -= pageHeight - margin;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, pageWidth, pdfHeight);
          heightLeft -= pageHeight - margin;
        }

        pdf.save("Report.pdf");
      });
    }, 500);
  };

  //  getting the date now in specific format
  const getFormattedDate = () => {
    const now = new Date();

    const padTo2Digits = (num) => num.toString().padStart(2, "0");

    const day = padTo2Digits(now.getDate());
    const month = padTo2Digits(now.getMonth() + 1); // Months are 0-based
    const year = now.getFullYear();

    let hours = now.getHours();
    const minutes = padTo2Digits(now.getMinutes());
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    const strTime = `${padTo2Digits(hours)}:${minutes} ${ampm}`;

    return `${day}/${month}/${year} ${strTime}`;
  };
  //Parse the ISO date string into a date object
  const startDate = new Date(projectStartDate);
  const endDate = new Date(projectEndDate);
  //Extract the day, month, and year start project
  const dayStart = startDate.getUTCDate();
  const monthStart = startDate.getUTCMonth() + 1;
  const yearStart = startDate.getUTCFullYear();
  //Extract the day, month, and year of end project
  const dayEnd = endDate.getUTCDate();
  const monthEnd = endDate.getUTCMonth() + 1;
  const yearEnd = endDate.getUTCFullYear();
  //Formated the date as dd/mm/yy
  const formattedStart = `${dayStart}/${monthStart}/${yearStart}`;
  const formattedEnd = `${dayEnd}/${monthEnd}/${yearEnd}`;

  //calculating the completion of the projects
  const statusText = percentage < 85 ? "Late" : "Done";
  return (
    <div className={styles.reportMain}>
      <Image
        src="/assets/svg/plane-report.svg"
        width={80}
        height={80}
        alt="plane"
        className={styles.planeReport}
      />
      <div className={styles.container}>
        <button id="downloadButton" onClick={downloadPdf}>
          Download this page as PDF
        </button>
        <div className={styles.headSection}>
          <Image
            src="/assets/svg/gaca-logo-report.svg"
            width={120}
            height={80}
            alt="logo-report"
          />
          <div className={styles.projectDate}>
            <p>Project Start Date: &nbsp;&nbsp;&nbsp; {formattedStart}</p>
            <p>Project End Date: &nbsp;&nbsp;&nbsp;&nbsp; {formattedEnd}</p>
            <p>
              Project Status:
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span
                className={`${
                  statusText === "Late"
                    ? styles.statusLate
                    : styles.statusComplete
                }`}
              >
                {statusText}
              </span>{" "}
            </p>
          </div>
        </div>
        <div className={styles.titleDesc}>
          <div className={styles.titleSec}>
            <p>
              {" "}
              <Image
                src="/assets/svg/news-report.svg"
                width={30}
                height={30}
                alt="news-report"
              />
              {titleEN}
            </p>
            <p>%{percentage}</p>
          </div>
          <p>{parse(descriptionEN)}</p>
        </div>
        <div className={styles.boxes}>
          <div className={styles.aboutBox}>
            <div className={styles.aboutSec}>
              <p>ABOUT</p>
              <p className={styles.stakholderAbout}>
                {" "}
                <Image
                  src="/assets/svg/check-about-report.svg"
                  width={30}
                  height={30}
                  alt="plane"
                />
                Project Owner: &nbsp; {data.projectOwner.userName}
              </p>
            </div>
            <div className={styles.aboutSec}>
              <p>Stakholders</p>
              {data.projectStakeholders.map((project) => {
                return (
                  <p className={styles.stakholderAbout}>
                    <Image
                      src="/assets/svg/world-report.svg"
                      width={27}
                      height={27}
                      alt="world"
                    />{" "}
                    {project.userName}
                  </p>
                );
              })}
            </div>
            <div className={styles.aboutSec}>
              <p> Operation Enviroment</p>
              {operatingEnvironmentAirport && (
                <p className={styles.stakholderAbout}>
                  <Image
                    src="/assets/svg/plane-about-report.svg"
                    width={30}
                    height={30}
                    alt="plane"
                  />
                  Airport
                </p>
              )}
              {operatingEnvironmentTerminal && (
                <p className={styles.stakholderAbout}>
                  <Image
                    src="/assets/svg/plane-arrival-report.svg"
                    width={30}
                    height={30}
                    alt="plane"
                  />
                  Terminal
                </p>
              )}
              {operatingEnvironmentACC && (
                <p className={styles.stakholderAbout}>
                  {" "}
                  <Image
                    src="/assets/svg/acc-report.svg"
                    width={30}
                    height={30}
                    alt="plane"
                  />
                  ACC
                </p>
              )}
              {operatingEnvironmentNotApplicable && (
                <p className={styles.stakholderAbout}>
                  <Image
                    src="/assets/svg/planet-report.svg"
                    width={30}
                    height={30}
                    alt="plane"
                  />
                  Not Applicable
                </p>
              )}
            </div>
          </div>
          <div className={styles.expectedBen}>
            <p>Expected Benefits (KPA)</p>
            <div className={styles.gridContainer}>
              <div className={styles.gridItem}>
                <Image
                  src={`/assets/imges/capacity-${
                    expectedBenefitCapacity ? "blue" : "gray"
                  }.png`}
                  width={60}
                  height={40}
                  alt="capacity"
                />
                <p
                  style={{
                    color: expectedBenefitCapacity ? "#3c5495" : "gray",
                  }}
                >
                  {" "}
                  Capacity
                </p>
              </div>
              <div className={styles.gridItem}>
                <Image
                  src={`/assets/imges/operation-${
                    expectedBenefitOprationalEfficiency ? "blue" : "gray"
                  }.png`}
                  width={50}
                  height={40}
                  alt="capacity"
                />
                <p
                  style={{
                    color: expectedBenefitOprationalEfficiency
                      ? "#3c5495"
                      : "gray",
                  }}
                >
                  Operational efficiency
                </p>
              </div>
              <div className={styles.gridItem}>
                <Image
                  src={`/assets/imges/cost-${
                    expectedBenefitCostEfficiency ? "blue" : "gray"
                  }.png`}
                  width={60}
                  height={40}
                  alt="capacity"
                />
                <p
                  style={{
                    color: expectedBenefitCostEfficiency ? "#3c5495" : "gray",
                  }}
                >
                  cost efficiency
                </p>
              </div>
              <div className={styles.gridItem}>
                <Image
                  src={`/assets/imges/seat-${
                    expectedBenefitSafety ? "blue" : "gray"
                  }.png`}
                  width={50}
                  height={40}
                  alt="capacity"
                />
                <p
                  style={{
                    color: expectedBenefitSafety ? "#3c5495" : "gray",
                  }}
                >
                  Safety
                </p>
              </div>
              <div className={styles.gridItem}>
                <Image
                  src={`/assets/imges/evniroment-${
                    expectedBenefitEnvironment ? "blue" : "gray"
                  }.png`}
                  width={50}
                  height={40}
                  alt="capacity"
                />
                <p
                  style={{
                    color: expectedBenefitEnvironment ? "#3c5495" : "gray",
                  }}
                >
                  Enviroment
                </p>
              </div>
              <div className={styles.gridItem}>
                <Image
                  src={`/assets/imges/secure-${
                    expectedBenefitSecurity ? "blue" : "gray"
                  }.png`}
                  width={50}
                  height={40}
                  alt="capacity"
                />
                <p
                  style={{
                    color: expectedBenefitSecurity ? "#3c5495" : "gray",
                  }}
                >
                  Security
                </p>
              </div>
            </div>
          </div>
          <div className={styles.activites}>
            <p>Activities</p>
            <PolarArea data={dataShart} options={options} />
          </div>
        </div>
        <Line data={dataLine} options={optionsLine} />
        <div className={styles.dateMain}>
          <div className={styles.dateNow}>Date: {getFormattedDate()}</div>
        </div>
      </div>
    </div>
  );
};
export default ReportPage;
