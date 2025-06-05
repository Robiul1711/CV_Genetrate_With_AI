import { Check } from "lucide-react";
import React from "react";
import { UpgradeIcon } from "../AllIcons/HomeIcons";

const YourPlan = () => {
  return (
    <div className="pb-8 md:pb-16 lg:pb-20 xl:pb-28">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-[28px] md:text-[48px] font-bold">
          Choose Your Plan
        </h1>
        <p className="md:text-xl text-[#9B9B9B] pt-2 ">
          Flexible options for every job seeker.
        </p>
      </div>
      <div className="mt-8 md:mt-12 lg:mt-16 xl:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div className=" border rounded-xl shadow-lg xlg:p-6 p-5 md:p-3 text-white hover:border hover:border-white duration-300 transition-all transform">
          <button className="border mb-6 flex items-center gap-2  font-semibold py-2 px-5  rounded-md">
            Free Plan
            <UpgradeIcon />
          </button>

          <p className="text-2xl md:text-5xl font-bold">
            €0 <span className="text-gray-500 text-2xl">/month</span>
          </p>
          {/* Button */}

          {/* Features List */}
          <div className="flex flex-col flex-grow justify-between mt-4">
            <div className="lg:mt-6 mt-3">
              <h3 className="font-medium mb-2">
                Start building - no strings attached
              </h3>
              <ul className="xlg:space-y-6 md:space-y-4 space-y-3 ">
                {[
                  "Resume Creation",
                  "No Watermark",
                  "Basic Template",
                  "Multilingual",
                  "Export as PNG",
                  "Export as PNG",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start  gap-2">
                    <Check className=" w-5 h-5 overflow-visible" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-white text-black font-semibold py-2 rounded-md mt-4">
                Start Free Trail
              </button>
            </div>
          </div>
        </div>
        <div className=" border rounded-xl shadow-lg xlg:p-6 p-3 text-white hover:border hover:border-white duration-300 transition-all transform">
          <button className="border mb-6 flex items-center gap-2  font-semibold py-2 px-5  rounded-md">
           Basic Plan
            <UpgradeIcon />
          </button>

          <p className="text-2xl md:text-5xl font-bold">
            €4.99 <span className="text-gray-500 text-2xl">/month</span>
          </p>
          {/* Button */}

          {/* Features List */}
          <div className="flex flex-col flex-grow justify-between mt-4">
            <div className="lg:mt-6 mt-3">
              <h3 className="font-medium mb-2">
                Start building - no strings attached
              </h3>
              <ul className="xlg:space-y-6 md:space-y-4 space-y-3 ">
                {[
                  "Resume Creation",
                  "No Watermark",
                  "Basic Template",
                  "Multilingual",
                  "Export as PNG",
                  "Export as PNG",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start  gap-2">
                    <Check className=" w-5 h-5 overflow-visible" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-white text-black font-semibold py-2 rounded-md mt-4">
                Start Free Trail
              </button>
            </div>
          </div>
        </div>
        <div className="relative border rounded-xl shadow-lg xlg:p-6 mt-3 lg:mt-0 p-3 text-white hover:border hover:border-white duration-300 transition-all transform">
          <div className="absolute -top-5 translate-x-[80%] md:translate-x-[55%]">
            <button className="border border-[#262626] bg-[#131316] px-4 py-1.5 rounded-2xl">
              Most Popular
            </button>
          </div>
          <button className="border mb-6 mt-4 flex items-center gap-2  font-semibold py-2 px-5  rounded-md">
          Pro Plan
            <UpgradeIcon />
          </button>

          <p className="text-2xl md:text-5xl font-bold">
            €9.99 <span className="text-gray-500 text-2xl">/month</span>
          </p>
          {/* Button */}

          {/* Features List */}
          <div className="lg:mt-6 mt-3">
            <h3 className="font-medium mb-2">
              Start building - no strings attached
            </h3>
            <ul className="xlg:space-y-6 md:space-y-4 space-y-3 ">
              {[
                "Resume Creation",
                "No Watermark",
                "Basic Template",
                "Multilingual",
                "Export as PNG",
                "Export as PNG",
              ].map((feature, index) => (
                <li key={index} className="flex items-start  gap-2">
                  <Check className=" w-5 h-5 overflow-visible" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button className="w-full bg-white text-black font-semibold py-2 rounded-md mt-4">
              Start Free Trail
            </button>
          </div>
        </div>
        <div className=" border rounded-xl shadow-lg xlg:p-6 p-3 text-white hover:border hover:border-white duration-300 transition-all transform">
          <button className="border mb-6 flex items-center gap-2  font-semibold py-2 px-5  rounded-md">
      Pay-Per-Download
            <UpgradeIcon />
          </button>

          <p className="text-2xl md:text-5xl font-bold">
            €4.99<span className="text-gray-500 text-2xl">/month</span>
          </p>
          {/* Button */}

          {/* Features List */}
          <div className="flex flex-col flex-grow justify-between mt-4">
            <div className="lg:mt-6 mt-3">
              <h3 className="font-medium mb-2">
                Start building - no strings attached
              </h3>
              <ul className="xlg:space-y-6 md:space-y-4 space-y-3 ">
                {[
                  "Resume Creation",
                  "No Watermark",
                  "Basic Template",
                  "Multilingual",
                  "Export as PNG",
                  "Export as PNG",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start  gap-2">
                    <Check className=" w-5 h-5 overflow-visible" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-white text-black font-semibold py-2 rounded-md mt-4">
                Start Free Trail
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourPlan;
