// Library
import React from "react";
// Styles
import "./VerticalEllipsis.styles.scss";

const VerticalEllipsis = ({ className, ...props }) => {
  return (
    <div
      className={"vertical-ellipsis " + (className ? className : "")}
      {...props}
    >
      <div className={"individual-dot"}></div>
      <div className={"individual-dot"}></div>

      <div className={"individual-dot"}></div>
      <div className={"individual-dot"}></div>

      <div className={"individual-dot"}></div>
      <div className={"individual-dot"}></div>
    </div>
  );
};

export default VerticalEllipsis;
