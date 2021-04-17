// Library
import React, { forwardRef } from "react";
// HOC
import elementize from "utils/HOC/Elementize";
// import { toInteger } from "lodash";
// Styles
import "./Input.styles.scss";

const Input = forwardRef(({ children, className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      // style={{ top: toInteger(y), left: toInteger(x) }}
      className={"input " + (className ? className : "")}
      draggable
      {...props}
    />
  );
});

export default elementize(Input);
