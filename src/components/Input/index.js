// Library
import React, { forwardRef } from "react";
import { toInteger } from "lodash";
// Styles
import "./Input.styles.scss";

const Input = forwardRef(({ children, className, x, y, ...props }, ref) => {
  return (
    <input
      ref={ref}
      style={{ top: toInteger(y), left: toInteger(x) }}
      className={"input " + (className ? className : "")}
      draggable
      {...props}
    />
  );
});

export default Input;
