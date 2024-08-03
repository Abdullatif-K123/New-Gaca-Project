import React, { useEffect, useState } from "react";
import classes from "./downloads.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import { Grid, TextField, FormLabel, Select, MenuItem } from "@mui/material";
import ResoucesTable from "./ResoucesTable";
import ReactPaginate from "react-paginate";
import Subscribe from "../ui/Subscribe";
import { useFontSize } from "@/store/FontSizeContext";
import { useTranslation } from "react-i18next";
import classestwo from "../home/Home-main/home-one.module.css";
import ResourcesFAQ from "./ResoucesFAQ";
const Downloads = ({ data, conversion, rtl }) => {
  const { t, i18n } = useTranslation();
  const { fontSizeGeneral } = useFontSize();
  const [filterTerm, setFilterTerm] = useState(data.development[0].lists);
  const [currentPage, setCurrentPage] = useState(0);
  const [switchHead, setSwitchHead] = useState("development");
  const [switchSideSelect, setSwitchSideSelect] = useState(0);
  const [mainSectionSelect, setMainSectionSelect] = useState(0);
  const [imgHead, setImageHead] = useState("box-1");
  //types
  const development_type = ["Development", "InProgress"];
  const documents_type = ["Annex", "Documents"];
  const dataObjectives_type = [
    "operation",
    "regulatory",
    "services",
    "kpi",
    "stakeholder",
  ];
  //Filter but selecting options
  const [selectedOption, setSelectedOption] = useState(6);

  const handleSelectChange = (event) => {
    setCurrentPage((prev) => {
      return 0;
    });
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    setFilterTerm((prevData) => {
      return data.development[0].lists.filter((item, index) => {
        return (
          index >= currentPage * selectedOption &&
          index < (currentPage + 1) * selectedOption
        );
      });
    });
  }, [currentPage, selectedOption]);

  // Function to search for a specific title in the array
  function searchByTitle(searchTerm) {
    // Convert the search term to lowercase for case-insensitive search
    const searchTermLower = searchTerm.toLowerCase().trim();

    // Filter the array to get objects that match the search term in their title
    const searchResults = data.filter((item) =>
      rtl
        ? item.title.includes(searchTermLower)
        : item.titleEN.toLowerCase().includes(searchTermLower)
    );
    setFilterTerm(searchResults);
  }

  //sorting section
  //Function to sort the array by dateCreated in ascending order
  const sortByDateAscending = () => {
    setFilterTerm((prevData) => {
      return [...prevData].sort(
        (a, b) => new Date(a.dateCreated) - new Date(b.dateCreated)
      );
    });
  };

  const sortByDateDescending = () => {
    setFilterTerm((prevData) => {
      return [...prevData].sort(
        (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
      );
    });
  };
  const router = useRouter();

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
  // Switching between the section in resources page
  const handleSwitchSection = (id) => {
    setSwitchSideSelect(0);
    setMainSectionSelect(id);
    if (!id) {
      setSwitchHead("development");
      if (data?.development[0].type !== "Development")
        setFilterTerm(data?.development[1].lists);
      else setFilterTerm(data?.development[0].lists);
    } else if (id === 1) {
      setSwitchHead("documents");
      if (data?.documents[0].type !== "Documents")
        setFilterTerm(data?.documents[1].lists);
      else setFilterTerm(data?.documents[1].lists);
    } else {
      setSwitchHead("services");
      const index = data.dataObjectives.findIndex(
        (obj) => obj.type === "Services"
      );
      setFilterTerm(data?.dataObjectives[index].lists);
    }
    setImageHead("box-1");
  };
  // Switching between the section in side sections
  const handleSwitchSideSection = (id, title) => {
    setSwitchHead(title);
    setSwitchSideSelect(id);
    if (mainSectionSelect === 0) {
      setFilterTerm(data?.development[id].lists);
    } else if (mainSectionSelect === 1) {
      setFilterTerm(data?.documents[id ? 0 : 1]?.lists);
    } else {
      setFilterTerm(data?.dataObjectives[id]?.lists);
    }
    setImageHead("box-" + (id + 1));
    if (title === "services") setImageHead("box-" + 1);
    else if (title === "operation-evn") setImageHead("box-" + 2);
    else if (title === "stakholders") setImageHead("box-" + 3);
    else if (title === "regulatory") setImageHead("box-" + 4);
    else if (title === "kpi-overview") setImageHead("box-" + 5);
    else if (title === "kpa-overview") setImageHead("box-" + 6);
  };
  return (
    <div
      className={classes.downloadPage}
      style={{ direction: rtl ? "rtl" : "ltr" }}
    >
      <div className={classes.choosen}>
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
            alt="chevron"
          />
        </p>
        <h1 style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}>
          {t("download")}
        </h1>
      </div>
      <div className={classes.downloadContent}>
        <div className={classes.downloadSectionContent}>
          <p
            style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}
            className={`${
              mainSectionSelect === 0 ? classes.selectSection : null
            }`}
            onClick={() => {
              handleSwitchSection(0);
            }}
          >
            {t("developments")}
          </p>
          <p
            style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}
            className={`${
              mainSectionSelect === 1 ? classes.selectSection : null
            }`}
            onClick={() => {
              handleSwitchSection(1);
            }}
          >
            {t("documents")}
          </p>
          <p
            style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}
            className={`${
              mainSectionSelect === 2 ? classes.selectSection : null
            }`}
            onClick={() => {
              handleSwitchSection(2);
            }}
          >
            {t("data-objectives")}
          </p>
        </div>
      </div>
      <div className={classes.resourceMain}>
        {mainSectionSelect === 0 ? (
          <div className={classes.resourceSection}>
            <div
              className={`${classes.resminiSeciton} ${classes.resminiSecHead} `}
            >
              <Image
                src={`/assets/svg/books.svg`}
                width={20}
                height={20}
                alt="icon"
              />
              <p style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}>
                {t("developments")}
              </p>
            </div>

            <div
              className={`${classes.resminiSeciton} ${
                switchSideSelect === 0
                  ? classes.selectSideSection
                  : classes.notSelectSideSec
              }`}
              onClick={() => {
                handleSwitchSideSection(0, "development");
              }}
            >
              <Image
                src={`/assets/svg/box-1.svg`}
                width={20}
                height={20}
                alt="icon"
                style={{
                  filter:
                    switchSideSelect === 0 ? "invert(0)" : "brightness(0.2)",
                }}
              />
              <p style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}>
                {t("development")}
              </p>
            </div>
            <div
              className={`${classes.resminiSeciton} ${
                switchSideSelect === 1
                  ? classes.selectSideSection
                  : classes.notSelectSideSec
              }`}
              onClick={() => {
                handleSwitchSideSection(1, "in-progress");
              }}
            >
              <Image
                src={`/assets/svg/box-2.svg`}
                width={20}
                height={20}
                alt="icon"
                style={{
                  filter:
                    switchSideSelect === 1
                      ? "brightness(10)"
                      : "brightness(0.2)",
                }}
              />
              <p style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}>
                {t("in-progress")}
              </p>
            </div>
          </div>
        ) : mainSectionSelect === 1 ? (
          <div className={classes.resourceSection}>
            <div
              className={`${classes.resminiSeciton} ${classes.resminiSecHead}`}
            >
              <Image
                src={`/assets/svg/books.svg`}
                width={20}
                height={20}
                alt="icon"
              />
              <p style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}>
                {t("documents")}
              </p>
            </div>
            <div
              className={`${classes.resminiSeciton} ${
                switchSideSelect === 0
                  ? classes.selectSideSection
                  : classes.notSelectSideSec
              }`}
              onClick={() => {
                handleSwitchSideSection(0, "data-documents");
              }}
            >
              <Image
                src={`/assets/svg/box-1.svg`}
                width={20}
                height={20}
                alt="icon"
                style={{
                  filter:
                    switchSideSelect === 0 ? "invert(0)" : "brightness(0.2)",
                }}
              />
              <p style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}>
                {t("data-documents")}
              </p>
            </div>
            <div
              className={`${classes.resminiSeciton} ${
                switchSideSelect === 1
                  ? classes.selectSideSection
                  : classes.notSelectSideSec
              }`}
              onClick={() => {
                handleSwitchSideSection(1, "annex");
              }}
            >
              <Image
                src={`/assets/svg/box-2.svg`}
                width={20}
                height={20}
                alt="icon"
                style={{
                  filter:
                    switchSideSelect === 1
                      ? "brightness(10)"
                      : "brightness(0.2)",
                }}
              />
              <p style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}>
                {t("annex")}
              </p>
            </div>
          </div>
        ) : (
          <div className={classes.resourceSection}>
            <div
              className={`${classes.resminiSeciton}  ${classes.resminiSecHead}`}
            >
              <Image
                src={`/assets/svg/books.svg`}
                width={20}
                height={20}
                alt="icon"
              />
              <p style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}>
                {t("data-objectives")}
              </p>
            </div>
            <div
              className={`${classes.resminiSeciton} ${
                switchHead === "services"
                  ? classes.selectSideSection
                  : classes.notSelectSideSec
              }`}
              onClick={() => {
                handleSwitchSideSection(
                  data.dataObjectives.findIndex(
                    (obj) => obj.type === "Services"
                  ),
                  "services"
                );
              }}
            >
              <Image
                src={`/assets/svg/box-1.svg`}
                width={20}
                height={20}
                alt="icon"
                style={{
                  filter:
                    switchHead === "services" ? "invert(0)" : "brightness(0.2)",
                }}
              />
              <p style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}>
                {t("services")}
              </p>
            </div>
            <div
              className={`${classes.resminiSeciton} ${
                switchHead === "operation-evn"
                  ? classes.selectSideSection
                  : classes.notSelectSideSec
              }`}
              onClick={() => {
                handleSwitchSideSection(
                  data.dataObjectives.findIndex(
                    (obj) => obj.type === "OperatingEnvironment"
                  ),
                  "operation-evn"
                );
              }}
            >
              <Image
                src={`/assets/svg/box-2.svg`}
                width={20}
                height={20}
                alt="icon"
                style={{
                  filter:
                    switchHead === "operation-evn"
                      ? "brightness(10)"
                      : "brightness(0.2)",
                }}
              />
              <p style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}>
                {t("operation-evn")}
              </p>
            </div>
            <div
              className={`${classes.resminiSeciton} ${
                switchHead === "stakholders"
                  ? classes.selectSideSection
                  : classes.notSelectSideSec
              }`}
              onClick={() => {
                handleSwitchSideSection(
                  data.dataObjectives.findIndex(
                    (obj) => obj.type === "Stakeholders"
                  ),
                  "stakholders"
                );
              }}
            >
              <Image
                src={`/assets/svg/box-3.svg`}
                width={20}
                height={20}
                alt="icon"
                style={{
                  filter:
                    switchHead === "stakholders"
                      ? "brightness(10)"
                      : "brightness(0.2)",
                }}
              />
              <p style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}>
                {t("stakholders")}
              </p>
            </div>
            <div
              className={`${classes.resminiSeciton} ${
                switchHead === "regulatory"
                  ? classes.selectSideSection
                  : classes.notSelectSideSec
              }`}
              onClick={() => {
                handleSwitchSideSection(
                  data.dataObjectives.findIndex(
                    (obj) => obj.type === "Regulatory"
                  ),
                  "regulatory"
                );
              }}
            >
              <Image
                src={`/assets/svg/box-4.svg`}
                width={20}
                height={20}
                alt="icon"
                style={{
                  filter:
                    switchHead === "regulatory"
                      ? "brightness(10)"
                      : "brightness(0.2)",
                }}
              />
              <p style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}>
                {t("regulatory")}
              </p>
            </div>
            <div
              className={`${classes.resminiSeciton} ${
                switchHead === "kpi-overview"
                  ? classes.selectSideSection
                  : classes.notSelectSideSec
              }`}
              onClick={() => {
                handleSwitchSideSection(
                  data.dataObjectives.findIndex((obj) => obj.type === "KPI"),
                  "kpi-overview"
                );
              }}
            >
              <Image
                src={`/assets/svg/box-5.svg`}
                width={20}
                height={20}
                alt="icon"
                style={{
                  filter:
                    switchHead === "kpi-overview"
                      ? "brightness(10)"
                      : "brightness(0.2)",
                }}
              />
              <p style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}>
                {t("kpi-overview")}
              </p>
            </div>
            <div
              className={`${classes.resminiSeciton} ${
                switchHead === "kpa-overview"
                  ? classes.selectSideSection
                  : classes.notSelectSideSec
              }`}
              onClick={() => {
                handleSwitchSideSection(
                  data.dataObjectives.findIndex((obj) => obj.type === "KPA"),
                  "kpa-overview"
                );
              }}
            >
              <Image
                src={`/assets/svg/box-6.svg`}
                width={20}
                height={20}
                alt="icon"
                style={{
                  filter:
                    switchHead === "kpa-overview"
                      ? "brightness(10)"
                      : "brightness(0.2)",
                }}
              />
              <p style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}>
                {t("kpa-overview")}
              </p>
            </div>
          </div>
        )}
        {filterTerm?.length > 0 ? (
          <div className={classes.downloadTables}>
            <div className={classes.downloadHead}>
              <div className={classes.downloadImgHead}>
                <Image
                  src={`/assets/svg/${imgHead}.svg`}
                  width={30}
                  height={30}
                  alt="logo-credit"
                  style={{
                    filter: "brightness(10)",
                  }}
                />
              </div>
              <p
                style={{
                  fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
                  fontSize: `${19 + fontSizeGeneral}px`,
                }}
              >
                {t(switchHead)}
              </p>
            </div>
            {mainSectionSelect !== 2 && (
              <div className={classes.filteringDocument}>
                <div className={classes.filterByNumber}>
                  <FormLabel
                    style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}
                  >
                    {t("show")}
                  </FormLabel>
                  <Select
                    size="small"
                    value={selectedOption}
                    onChange={handleSelectChange}
                    defaultValue={"6"}
                  >
                    <MenuItem value={1}>3</MenuItem>
                    <MenuItem value={2}>4</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                  </Select>
                  <FormLabel
                    style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}
                  >
                    {t("entries")}
                  </FormLabel>
                </div>
                <Grid alignItems="center">
                  <Grid
                    item
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <FormLabel
                      htmlFor="search"
                      style={{
                        fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
                      }}
                    >
                      {t("search")}
                    </FormLabel>
                    <TextField
                      size="small"
                      variant="outlined"
                      placeholder={t("title")}
                      onChange={(e) => searchByTitle(e.target.value)}
                      id="search"
                    />
                  </Grid>
                </Grid>
              </div>
            )}
            {mainSectionSelect === 2 && (
              <ResourcesFAQ
                filterTerm={filterTerm}
                rtl={rtl}
                fontSizeGeneral={fontSizeGeneral}
              />
            )}
            {mainSectionSelect !== 2 && (
              <ResoucesTable
                filterTerm={filterTerm}
                rtl={rtl}
                sortByDateDescending={sortByDateDescending}
                sortByDateAscending={sortByDateAscending}
              />
            )}
            <div className={classes.paginationContainer}>
              {/* Render pagination links with updated styles */}
              <ReactPaginate
                containerClassName={classes.pagination}
                pageClassName={classes.pageItem}
                activeClassName={classes.active}
                onPageChange={(event) => setCurrentPage(event.selected)}
                pageCount={Math.ceil(filterTerm.length / selectedOption)}
                onPageActive={currentPage}
                breakLabel="..."
                previousLabel={
                  <div className={classes.paginationTerm}>{t("previous")}</div>
                }
                nextLabel={
                  <div className={classes.paginationTerm}>{t("next")}</div>
                }
              />
            </div>
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

      <Subscribe rtl={rtl} />
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
    </div>
  );
};

export default Downloads;
