import React from "react";
import styles from "./report.module.css";
import Image from "next/image";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import parse from "html-react-parser";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const ReportPage = ({ data }) => {
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
  const {
    expectedBenefitCapacity,
    expectedBenefitOprationalEfficiency,
    expectedBenefitCostEfficiency,
    expectedBenefitSafety,
    expectedBenefitEnvironment,
    expectedBenefitSecurity,
    projectStartDate,
    projectEndDate,
    percentage,
    title,
    titleEN,
    descriptionEN,
    description,
  } = data.projectInformation;

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
              <p className={styles.stakholderAbout}>
                <Image
                  src="/assets/svg/plane-about-report.svg"
                  width={30}
                  height={30}
                  alt="plane"
                />
                Airport
              </p>
              <p className={styles.stakholderAbout}>
                <Image
                  src="/assets/svg/plane-arrival-report.svg"
                  width={30}
                  height={30}
                  alt="plane"
                />
                Terminal
              </p>
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
              <p className={styles.stakholderAbout}>
                <Image
                  src="/assets/svg/planet-report.svg"
                  width={30}
                  height={30}
                  alt="plane"
                />
                Not Applicable
              </p>
            </div>
          </div>
          <div className={styles.expectedBen}>
            <p>Expected Benefits (KPA)</p>
          </div>
          <div className={styles.activites}>
            <p>Activities</p>
            <PolarArea data={dataShart} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReportPage;
