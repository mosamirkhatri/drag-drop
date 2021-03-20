// Library
import React from "react";
// Components
import VerticalEllipsis from "components/VerticalEllipsis";
// Styles
import "./Block.styles.scss";

const Block = ({ type, children, className, ...props }) => {
  return (
    <div
      draggable={true}
      className={"block " + (className ? className : "")}
      {...props}
    >
      <VerticalEllipsis className={"block__ellipsis"} />
      <p>{children}</p>
    </div>
  );
};

export default Block;
