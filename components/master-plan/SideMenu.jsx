import React, { useState, useEffect } from "react";
import classes from "./masterPlan.module.css";
import Image from "next/image";
import MyTreeView from "./TreeView/MyTreeView";
import sampleData from "./simpleData";
import {
  filterTree,
  expandFilteredNodes,
  getIDsExpandFilter,
} from "../../utils/filterTreeUitls";
const SideMenu = ({
  singleSelectHandling,
  expanded,
  selected,
  handleToggle,
  handleSelect,
  data,
  rtl
}) => {
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
    <div className={classes.sideMenuMP}>
      <div className={classes.searchSideMenu}>
        <Image
          src="/assets/svg/search-normal.svg"
          width={24}
          height={24}
          alt="search"
        />
        <input type="text" placeholder={rtl? "البحث..." : "Search..."} onKeyUp={onFilterMouseUp} />
      </div>
      <div className={classes.sideMenuTreeView}>
        <p>{rtl? "الخطة":"Master Plan"}</p>
        <div className={classes.treeViewSideMenu}>
          <MyTreeView
            singleSelectHandling={singleSelectHandling}
            data={subjectData}
            expanded={expanded}
            handleToggle={handleToggle}
            handleSelect={handleSelect}
            selectedTree={selected}
            rtl={rtl}
          />
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
