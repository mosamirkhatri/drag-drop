// Library
import { forwardRef } from "react";
import { toInteger } from "lodash";

const elementize = (Component) =>
  forwardRef(({ x, y, ...props }, ref) => (
    <Component
      ref={ref}
      style={{ top: toInteger(y), left: toInteger(x) }}
      {...props}
    />
  ));

export default elementize;
