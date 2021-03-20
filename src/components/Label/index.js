// Library
import React, { forwardRef } from "react";
import { toInteger } from "lodash";
// Styles
import "./Label.styles.scss";

const Label = forwardRef(
  ({ children, className, x, y, fontSize, fontWeight, ...props }, ref) => {
    return (
      <label
        ref={ref}
        style={{
          top: toInteger(y),
          left: toInteger(x),
          fontSize: toInteger(fontSize),
          fontWeight: toInteger(fontWeight),
        }}
        className={"label " + (className ? className : "")}
        draggable
        {...props}
      >
        {children}
      </label>
    );
  }
);

export default Label;
