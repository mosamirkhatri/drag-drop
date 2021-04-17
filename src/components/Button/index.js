// Library
import React, { forwardRef } from "react";
// HOC
import elementize from "utils/HOC/Elementize";
// Styles
import "./Button.styles.scss";

const Button = forwardRef(({ children, className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={"button " + (className ? className : "")}
      draggable
      {...props}
    >
      {children}
    </label>
  );
});

export default elementize(Button);
