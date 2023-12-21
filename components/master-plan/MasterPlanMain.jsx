import React, { useEffect, useState } from "react";
import SideMenu from "./SideMenu";
import MasterPlan from "./MasterPlan";
import classes from "./masterPlan.module.css";
import Footer from "../footer/footer";
import Image from "next/image";
import findNodeAndParentsByName from "@/utils/findNodeAndParent";
import { findNodeAndParentsById } from "@/utils/findNodeAndParent";
import { useRouter } from "next/router";
const MasterPlanMain = ({ plan, data, f1, f2, f3, f4, f5, conVersion }) => {
  const router = useRouter();
  const pin = router.query.plan;

  data[0].children = f1;
  data[1].children = f2;
  data[2].children = f3;
  data[3].children = f4;
  data[4].children = f5;
  data[0].id = "root1";
  data[1].id = "root2";
  data[2].id = "root3";
  data[3].id = "root4";
  data[4].id = "root5";
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
            data={data}
          />
          <MasterPlan singleElem={singleElemSelecting} />
        </div>
      </div>
      <Footer conVersion={conVersion} />
    </>
  );
};

export default MasterPlanMain;
