// Library
import React from "react";
// Styles
import "./TranslucentBackground.styles.scss";

const TranslucentBackground = ({ children, className }) => {
  return (
    <div className={"translucent-background " + (className ? className : "")}>
      {children}
    </div>
  );
};

export default TranslucentBackground;
