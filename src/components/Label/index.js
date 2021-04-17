// Library
import React, { forwardRef } from "react";
import { toInteger } from "lodash";
// HOC
import elementize from "utils/HOC/Elementize";
// Styles
import "./Label.styles.scss";

const Label = forwardRef(
  ({ children, className, style, fontSize, fontWeight, ...props }, ref) => {
    return (
      <label
        ref={ref}
        style={{
          ...style,
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

export default elementize(Label);
