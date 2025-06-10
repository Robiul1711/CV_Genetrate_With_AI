import { Check } from "lucide-react";
import React from "react";
import { UpgradeIcon } from "../AllIcons/HomeIcons";
import { Link } from "react-router-dom";

const YourPlan = () => {
  return (
    <div className="pb-12 py-6 md:py-10 ">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-[24px] md:text-[28px]  font-bold">
          Choose Your Plan
        </h1>
        <p className="text-[15px] md:text-base text-[#9B9B9B] pt-2 ">
          Flexible options for every job seeker.
        </p>
      </div>
      <div className="mt-8  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className=" hover:border border border-white/20 rounded-xl shadow-lg p-4 text-white  hover:border-white duration-300 transition-all transform">
          <button className="border mb-4 flex items-center gap-2 text-sm  font-semibold py-2 px-5  rounded-md">
            Free Plan
            <UpgradeIcon />
          </button>

          <p className="text-2xl md:text-3xl font-bold">
            €0 <span className="text-gray-500 text-xl">/month</span>
          </p>
          {/* Button */}

          {/* Features List */}
          <div className="flex flex-col flex-grow justify-between ">
            <div className=" mt-2">
              <h3 className="font-medium mb-1 text-sm">
                Start building - no strings attached
              </h3>
              <ul className=" space-y-3 text-sm">
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
              <Link
                to={`/sign-in`}
                className=" text-center flex justify-center items-center bg-white text-sm text-black font-semibold py-2 rounded-md mt-4"
              >
                Start Free Trail
              </Link>
            </div>
          </div>
        </div>
        <div className=" hover:border border border-white/20 rounded-xl shadow-lg p-4 text-white  hover:border-white duration-300 transition-all transform">
          <button className="border mb-4 flex items-center gap-2 text-sm  font-semibold py-2 px-5  rounded-md">
            Free Plan
            <UpgradeIcon />
          </button>

          <p className="text-2xl md:text-3xl font-bold">
            €0 <span className="text-gray-500 text-xl">/month</span>
          </p>
          {/* Button */}

          {/* Features List */}
          <div className="flex flex-col flex-grow justify-between ">
            <div className=" mt-2">
              <h3 className="font-medium mb-1 text-sm">
                Start building - no strings attached
              </h3>
              <ul className=" space-y-3 text-sm">
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
              <Link
                to={`/sign-in`}
                className=" text-center flex justify-center items-center bg-white text-sm text-black font-semibold py-2 rounded-md mt-4"
              >
                Start Free Trail
              </Link>
            </div>
          </div>
        </div>
        <div className=" hover:border border border-white/20 rounded-xl shadow-lg p-4 text-white  hover:border-white duration-300 transition-all transform">
          <button className="border mb-4 flex items-center gap-2 text-sm  font-semibold py-2 px-5  rounded-md">
            Free Plan
            <UpgradeIcon />
          </button>

          <p className="text-2xl md:text-3xl font-bold">
            €0 <span className="text-gray-500 text-xl">/month</span>
          </p>
          {/* Button */}

          {/* Features List */}
          <div className="flex flex-col flex-grow justify-between ">
            <div className=" mt-2">
              <h3 className="font-medium mb-1 text-sm">
                Start building - no strings attached
              </h3>
              <ul className=" space-y-3 text-sm">
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
              <Link
                to={`/sign-in`}
                className=" text-center flex justify-center items-center bg-white text-sm text-black font-semibold py-2 rounded-md mt-4"
              >
                Start Free Trail
              </Link>
            </div>
          </div>
        </div>
        <div className=" hover:border border border-white/20 rounded-xl shadow-lg p-4 text-white  hover:border-white duration-300 transition-all transform">
          <button className="border mb-4 flex items-center gap-2 text-sm  font-semibold py-2 px-5  rounded-md">
            Free Plan
            <UpgradeIcon />
          </button>

          <p className="text-2xl md:text-3xl font-bold">
            €0 <span className="text-gray-500 text-xl">/month</span>
          </p>
          {/* Button */}

          {/* Features List */}
          <div className="flex flex-col flex-grow justify-between ">
            <div className=" mt-2">
              <h3 className="font-medium mb-1 text-sm">
                Start building - no strings attached
              </h3>
              <ul className=" space-y-3 text-sm">
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
              <Link
                to={`/sign-in`}
                className=" text-center flex justify-center items-center bg-white text-sm text-black font-semibold py-2 rounded-md mt-4"
              >
                Start Free Trail
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourPlan;
