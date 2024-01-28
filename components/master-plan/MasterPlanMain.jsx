import React, { useEffect, useState } from "react";
import SideMenu from "./SideMenu";
import MasterPlan from "./MasterPlan";
import classes from "./masterPlan.module.css";
import Footer from "../footer/footer";
import Image from "next/image";
import findNodeAndParentsByName from "@/utils/findNodeAndParent";
import { findNodeAndParentsById } from "@/utils/findNodeAndParent";
import { useRouter } from "next/router";
const MasterPlanMain = ({ plan, data, elementSelect, conVersion }) => {
  const router = useRouter();
  const pin = router.query.plan;
  const [selectingElem, setSelectingElem] = useState([elementSelect]);
  const [singleElemSelecting, setSingleElemSelecting] = useState(elementSelect);
  const [selected, setSelected] = useState([]);
  const [singleSelectingDesc, setSignelDesc] = useState("");
  const [expanded, setExpanded] = useState([`root${pin ? pin : 1}`]);
  const handleSelectSingleElem = (elem, idSelect) => {
    setSingleElemSelecting(elem.title);
    setSignelDesc(elem.description);
  };
  const { select } = router.query;

  useEffect(() => {
    if (select && select.length > 0) {
      const result = findNodeAndParentsByName(data, select);

      if (result.length > 0 && result[0].description) {
        setSelectingElem(() => [result[0].path[0], result[0].title]);
        handleSelectSingleElem(result[0], result[0].id);
      }
    }
  }, []);
  useEffect(() => {
    const result = findNodeAndParentsByName(data, singleElemSelecting);

    if (result.length > 0) {
      setSelectingElem(() => [result[0].path[0], result[0].title]);
      router.push(
        {
          pathname: router.pathname,
          query: { plan: result[0].masterPlanId, select: result[0].title },
        },
        undefined,
        { shallow: true }
      );
    }
  }, [singleElemSelecting]);
  useEffect(() => {
    setSelectingElem(data ? [data[pin ? pin - 1 : 0].name] : []);
  }, []);
  //  Toggling to specifc plan

  const handleToggle = (event, nodeIds) => {
    let expandedTemp = expanded;

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
          <MasterPlan
            singleDesc={singleSelectingDesc}
            singleElem={singleElemSelecting}
            data={data}
          />
        </div>
      </div>
      <Footer conVersion={conVersion} />
    </>
  );
};

export default MasterPlanMain;
