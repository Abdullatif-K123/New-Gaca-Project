import React, { useState } from "react";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import Image from "next/image";
import classes from "./treeFilter.module.css";

const MyTreeView = ({ singleSelectHandling, data }) => {
  const [selected, setSelected] = useState("");
  const [expanded, setExpanded] = useState([]);

  const renderTree = (nodes) => {
    if (!nodes) {
      return null;
    }

    const hasChildren = Array.isArray(nodes.children) && nodes.children.length > 0;
    const hasDataMenus = Array.isArray(nodes.dataMenus) && nodes.dataMenus.length > 0;
    console.log(hasChildren )
    return (
      <TreeItem
        key={nodes.id}
        nodeId={nodes.id}
        label={
          <div className={classes.parentIcon}>
            <p className={classes.children}>{nodes.titleEN}</p>
            <Image
              src={`/assets/svg/masterPlanHome.svg`}
              width={25}
              height={25}
              alt="shape"
            />
          </div>
        }
        endIcon={hasChildren || hasDataMenus ? undefined : null} // Show end icon only if there are children or dataMenus
      >
        {hasChildren && nodes.children.map((node) => renderTree(node))}
        {hasDataMenus && nodes.dataMenus.map((menu) => (
          <TreeItem
            key={menu.id}
            nodeId={menu.id}
            label={
              <p
                className={`${classes.childrens} ${
                  selected === menu.titleEN ? classes.childSelected : null
                }`}
                style={{ direction: "ltr" }}
                onClick={() => {
                  setSelected(menu.title);
                  singleSelectHandling(menu);
                }}
              >
                {menu.titleEN}
              </p>
            }
          />
        ))}
      </TreeItem>
    );
  };

  const handleNodeToggle = (event, nodeIds) => {
    setExpanded(nodeIds);

    // Clear selected if the parent is collapsed
    if (!nodeIds.includes(selected)) {
      setSelected("");
    }
  };

  return (
    <TreeView
      expanded={expanded}
      onNodeToggle={handleNodeToggle}
      style={{ direction: "rtl" }}
      defaultCollapseIcon={
        <Image
          src="/assets/svg/ArrowDown.svg"
          width={20}
          height={20}
          alt="arrowDown"
        />
      }
      defaultExpandIcon={
        <Image
          src="/assets/svg/Chevron.svg"
          width={20}
          height={20}
          alt="chevron"
        />
      }
      className={classes.treeviewMain}
    >
      {data?.map((nodes) => renderTree(nodes))}
    </TreeView>
  );
};

export default MyTreeView;
