import React, { forwardRef } from "react";
import clsx from "clsx";

const sizeMap = {
  title64: "text-[34px] sm:text-[64px] font-bold",
  title48: "text-2xl sm:text-[38px] xl:text-[48px] font-semibold",
  title40: "text-2xl sm:text-[32px] xl:text-[40px] font-medium",
  title32: "xl:text-xl lg:text-2xl xl:text-3xl font-medium",
  title28: "text-2xl sm:text-[28px] font-medium",
  title24: "text-bsse sm:text-lg md:text-2xl font-medium",
  title22: "lg:text-base xl:text-[22px] font-medium",
  title20: " text-base  xl:text-xl font-normal",
  title18: "text-base sm:text-lg font-normal",
  title16: "text-base sm:text-[16px] font-normal",
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
