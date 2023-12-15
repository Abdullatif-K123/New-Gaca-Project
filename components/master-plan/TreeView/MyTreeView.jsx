import React, { useState } from "react";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import Image from "next/image";
import classes from "./treeFilter.module.css";
const MyTreeView = ({
  singleSelectHandling,
  data,
  expanded,
  handleToggle,
  handleSelect,
  selectedTree,
}) => {
  const [selected, setSelected] = useState("");
  const renderTree = (nodes, index) => {
    const isParent = Array.isArray(nodes.children);
    if (!nodes || nodes.length === 0) {
      return null;
    }

    return (
      <TreeItem
        key={nodes.id}
        nodeId={nodes.id}
        label={
          isParent ? (
            <div className={classes.parentIcon}>
              <Image
                src={`/assets/svg/${imgs[index]}.svg`}
                width={18}
                height={18}
                alt="shape"
              />{" "}
              <p className={classes.children}>{nodes.name}</p>
            </div>
          ) : (
            <p
              className={`${classes.childrens} ${
                selected === nodes.name ? classes.childSelected : null
              }`}
              onClick={() => {
                setSelected(nodes.name);
                singleSelectHandling(nodes.name);
              }}
            >
              {nodes.name}
            </p>
          )
        }
      >
        {isParent ? nodes.children.map((node) => renderTree(node)) : null}
      </TreeItem>
    );
  };
  const imgs = ["triangle", "briefcase", "folder-cloud", "folder-open", "book"];
  return (
    <TreeView
      expanded={expanded}
      onNodeToggle={handleToggle}
      defaultCollapseIcon={
        <Image
          src="/assets/svg/ArrowDown.svg"
          width={16}
          height={16}
          alt="arrowDown"
        />
      }
      defaultExpandIcon={
        <Image
          src="/assets/svg/Chevron.svg"
          width={16}
          height={16}
          alt="chevron"
        />
      }
      className={classes.treeviewMain}
    >
      {data?.map((nodes, index) => {
        return renderTree(nodes, index);
      })}
    </TreeView>
  );
};

export default MyTreeView;
