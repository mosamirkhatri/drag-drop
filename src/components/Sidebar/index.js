// Library
import React from "react";
// Styles
import "./Sidebar.styles.scss";

const Sidebar = ({ children, className, ...props }) => {
  return (
    <div className={"sidebar " + (className ? className : "")} {...props}>
      {children}
    </div>
  );
};

export default Sidebar;
