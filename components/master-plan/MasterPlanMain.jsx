import React, { useEffect, useState } from "react";
import SideMenu from "./SideMenu";
import MasterPlan from "./MasterPlan";
import classes from "./masterPlan.module.css";
import Footer from "../footer/footer";
import Image from "next/image";
import findNodeAndParentsByName from "@/utils/findNodeAndParent";
import { findNodeAndParentsById } from "@/utils/findNodeAndParent";
import { useRouter } from "next/router";
const MasterPlanMain = ({ plan, data }) => {
  const router = useRouter();
  const pin = router.query.plan;

  const [selectingElem, setSelectingElem] = useState([]);
  const [singleElemSelecting, setSingleElemSelecting] = useState("");
  const [selected, setSelected] = useState([]);
  const [expanded, setExpanded] = useState([`root${pin ? pin : 1}`]);
  const handleSelecingThing = (elem) => {};
  const handleSelectSingleElem = (elem, idSelect) => {
    setSingleElemSelecting(elem);
    setExpanded([`root${idSelect}`]);
  };
  useEffect(() => {
    const result = findNodeAndParentsByName(data, singleElemSelecting);

    setSelectingElem(() => {
      return result.length ? [result[0].path[0], result[0].name] : [];
    });
  }, [singleElemSelecting]);
  useEffect(() => {
    setSelectingElem(data ? [data[pin ? pin - 1 : 0].name] : []);
  }, [pin]);
  //  Toggling to specifc plan

  const handleToggle = (event, nodeIds) => {
    let expandedTemp = expanded;
    console.log(nodeIds);
    expandedTemp = nodeIds;

    setExpanded(expandedTemp);
  };

  const handleSelect = async (event, nodeIds) => {};

  return (
    <>
      <div className={classes.masterPlanMain}>
        <div className={classes.choosen}>
          <p>
            <span
              onClick={() => {
                router.push("/");
              }}
            >
              Home
            </span>
            <Image
              src="/assets/svg/Chevron.svg"
              width={16}
              height={16}
              alt="chevron"
            />
            <span
              onClick={() => {
                router.push("/#masterplan");
              }}
            >
              Master Plan
            </span>
            {selectingElem.length ? (
              <>
                {" "}
                <Image
                  src="/assets/svg/Chevron.svg"
                  width={16}
                  height={16}
                  alt="chevron"
                />
                <span>{selectingElem[0]}</span>{" "}
                <Image
                  src="/assets/svg/Chevron.svg"
                  width={16}
                  height={16}
                  alt="chevron"
                />
                <span>{selectingElem[1]}</span>
              </>
            ) : null}
          </p>
        </div>
        <div className={classes.masterPlanContent}>
          <SideMenu
            singleSelectHandling={handleSelectSingleElem}
            expanded={expanded}
            selected={selected}
            handleToggle={handleToggle}
            handleSelect={handleSelect}
          />
          <MasterPlan singleElem={singleElemSelecting} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MasterPlanMain;
