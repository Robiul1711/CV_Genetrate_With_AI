import React from "react";
import banner from "../../assets/images/banner.png";
import users from "../../assets/images/users.png";
import { AiTwotoneThunderbolt } from "react-icons/ai";
import { FaArrowRightLong } from "react-icons/fa6";
import { EditIcon, UpgradeIcon } from "../AllIcons/HomeIcons";
const Banner = () => {
  return (
    <div className="py-12 md:py-20">
      <div className="flex flex-col gap-6 items-center justify-center text-center">
        <button className="flex items-center gap-2 p-2 rounded-full border">
          <AiTwotoneThunderbolt />
          Smarter resumes. Better job prospects.
          <FaArrowRightLong className="text-2xl bg-dark p-1 rounded-full" />
        </button>
        <h1 className="text-[36px] md:text-[68px] font-bold max-w-[956px]">
          Build Your Perfect Resume Smarter, Faster, with AI.
        </h1>

        <p className="max-w-[600px] md:text-xl text-primary ">
          Professional resumes made easy — create or upgrade with real-time
          smart suggestions.
        </p>
        <div className="flex flex-col md:flex-row items-center gap-5">
          <button className="flex items-center gap-2 px-8 py-4 rounded-xl border">
            Create your Resume <EditIcon />
          </button>
          <button className="flex items-center gap-2 px-8 py-4 rounded-xl border">
            Create your Resume <UpgradeIcon />
          </button>
        </div>
        <button className="flex items-center gap-2 p-2 rounded-full border">
          {" "}
          <img src={users} alt="" />
          Loved by over 3 million users
        </button>
      </div>
      <div className="">
        <img src={banner} alt="" className="w-full" />
      </div>
    </div>
  );
};

export default Banner;
