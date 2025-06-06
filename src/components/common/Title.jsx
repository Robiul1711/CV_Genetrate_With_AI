import React, { forwardRef } from "react";
import clsx from "clsx";

// const sizeMap = {
//   title64: "text-[34px] sm:text-[64px] font-bold",
//   title48: "text-xl font-semibold",
//   title40: "text-xl xl:text-[40px] font-medium",
//   title32: "xl:text-xl  font-medium",
//   title28: "text-xl xlg:text-[24px] font-medium",
//   title24: "text-bsse  font-medium",
//   title22: "lg:text-base xl:text-[22px] font-medium",
//   title20: " text-base  xl:text-xl font-normal",
//   title18: "text-sm  font-normal",
//   title16: "text-sm font-normal",
//   title14: "text-sm sm:text-base font-normal",
//   title12: "text-xs sm:text-sm font-normal",
// };
const sizeMap = {
  title64: "text-[34px] sm:text-[64px] font-bold",
  title48: "text-xl font-semibold",
  title40: "text-xl  font-medium",
  title32: "text-base font-medium",
  title28: "text-xl  font-medium",
  title24: "text-bsse  font-medium",
  title20: " text-base   font-normal",
  title18: "text-sm  font-normal",
  title16: "text-sm font-normal",
  title14: "text-sm sm:text-base font-normal",
  title12: "text-xs sm:text-sm font-normal",
};

const Title = forwardRef(
  ({ children, level, className = "", ...rest }, ref) => {
    return (
      <h2 ref={ref} className={clsx(sizeMap[level], className)} {...rest}>
        {children}
      </h2>
    );
  }
);

Title.displayName = "Title";
export default Title;
