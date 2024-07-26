import React, { useState, useEffect } from "react";
import classes from "./masterPlan.module.css";
import Image from "next/image";
import MyTreeView from "./TreeView/MyTreeView";
import { filterTree } from "../../utils/filterTreeUitls";
import { useTranslation } from "react-i18next";
const SideMenu = ({
  singleSelectHandling,
  expanded,
  selected,
  handleToggle,
  handleSelect,
  data,
  rtl,
  monitor,
  handleSwitching,
  toggleMenuVisibility,
  isMenuVisible,
}) => {
  const { t } = useTranslation();
  const [subjectData, setSubjectData] = useState(data);
  // Filter input function
  const onFilterMouseUp = (e) => {
    const value = e.target.value;
    const filter = value.trim();
    if (!filter) {
      setSubjectData(() => data);
      handleToggle("b", []);
      return;
    }
    let filtred = data?.map((data) => {
      const pathed = filterTree(data, filter);
      return pathed.children?.length ? pathed : {};
    });
    let filtredUpdate = filtred.filter((data) => (data.title ? data : null));
    setSubjectData(filtredUpdate);
    handleToggle("b", ["root1", "root2", "root3"]);
  };

  return (
    <div className={classes.sideMenuMain}>
      {/* <button onClick={toggleMenuVisibility} className={classes.toggleButton}>
        {isMenuVisible ? "Hide Menu" : "Show Menu"}
      </button> */}
      <div
        className={`${classes.sideMenuMP} ${
          isMenuVisible ? classes.show : classes.hide
        }`}
      >
        <div className={classes.searchSideMenu}>
          <Image
            src="/assets/svg/search-normal.svg"
            width={24}
            height={24}
            alt="search"
          />
          <input
            type="text"
            placeholder={t("search")}
            onKeyUp={onFilterMouseUp}
          />
        </div>
        <div className={classes.sideMenuTreeView} data-aos="fade-right">
          <p>{t("masterplan")}</p>
          <div className={classes.treeViewSideMenu}>
            <MyTreeView
              singleSelectHandling={singleSelectHandling}
              data={subjectData}
              expanded={expanded}
              handleToggle={handleToggle}
              handleSelect={handleSelect}
              selectedTree={selected}
              rtl={rtl}
              monitor={monitor}
              handleSwitching={handleSwitching}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
