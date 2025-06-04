import React from "react";
import clsx from "clsx";

const StepProgressBar = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between px-2 sm:px-4 py-6 mx-auto w-full overflow-x-auto">
      {steps.map((step, index) => {
        const isActive = index + 1 === currentStep;
        const isCompleted = index + 1 < currentStep;
        const isLastStep = index === steps.length - 1;

        return (
          <div 
            key={index} 
            className="flex-1 flex flex-col items-center relative"
          >
            {/* Connector Line - before each step except the first */}
            {index !== 0 && (
              <div className="absolute top-3 left-0 right-1/2 h-1 sm:h-2">
                <div
                  className={clsx(
                    "h-full w-full",
                    isCompleted || isActive ? "bg-green-500" : "bg-gray-300"
                  )}
                />
              </div>
            )}

            {/* Connector Line - after each step except the last */}
            {!isLastStep && (
              <div className="absolute top-3 left-1/2 right-0 h-1 sm:h-2">
                <div
                  className={clsx(
                    "h-full w-full",
                    isCompleted ? "bg-green-500" : "bg-gray-300"
                  )}
                />
              </div>
            )}

            {/* Step Circle */}
            <div
              className={clsx(
                "z-10 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold border-2 transition-all duration-300",
                isActive
                  ? "bg-green-500 text-white border-green-500 sm:shadow-lg sm:shadow-green-500/30"
                  : isCompleted
                  ? "bg-green-500 text-white  border-green-500"
                  : "bg-white text-gray-400 border-gray-300"
              )}
            >
              {isCompleted ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 sm:h-4 sm:w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                index + 1
              )}
            </div>

            {/* Step Label */}
            <div className={clsx(
              "text-xs sm:text-sm md:text-base text-center mt-1 py-1.5 px-2 mx-1 bg-[#18181A] sm:mt-2 font-medium whitespace-nowrap rounded-md",
              isActive ? "text-green-500 font-semibold" : isCompleted ? "text-green-600" : "text-gray-400"
            )}>
              {step}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StepProgressBar;