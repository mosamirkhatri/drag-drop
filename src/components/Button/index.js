// Library
import React, { forwardRef } from "react";
import { toInteger } from "lodash";
// Styles
import "./Button.styles.scss";

const Button = forwardRef(({ children, className, x, y, ...props }, ref) => {
  return (
    <label
      ref={ref}
      style={{ top: toInteger(y), left: toInteger(x) }}
      className={"button " + (className ? className : "")}
      draggable
      {...props}
    >
      {children}
    </label>
  );
});

export default Button;
