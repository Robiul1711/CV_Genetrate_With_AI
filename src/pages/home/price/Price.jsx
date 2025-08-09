import CoverLetter from "@/components/All_Templates/CoverLetter";
import ResumeEleven from "@/components/All_Templates/ResumeEleven";
import ResumeFive from "@/components/All_Templates/ResumeFive";
import ResumeFour from "@/components/All_Templates/ResumeFour";
import ResumeOne from "@/components/All_Templates/ResumeOne";
import ResumeSix from "@/components/All_Templates/ResumeSix";
import ResumeTen from "@/components/All_Templates/ResumeTen";
import ResumeThree from "@/components/All_Templates/ResumeThree";
import ResumeTwo from "@/components/All_Templates/ResumeTwo";
import ReadyToLand from "@/components/Home_components/ReadyToLand";
import YourPlan from "@/components/Home_components/YourPlan";
import PlanTable from "@/components/priceComponents/PlanTable";
import React from "react";
import { ScrollRestoration } from "react-router-dom";

const Price = () => {
  return (
    <div className="section-padding-x section-padding-y">
      <ScrollRestoration />
      <YourPlan />
    <PlanTable />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <ResumeOne />
    <ResumeTwo />
    <ResumeThree />
    <ResumeFour />
    <ResumeFive />
    <CoverLetter />
    <ResumeSix />
    <ResumeTen />
    <ResumeEleven />

    </div>
      <ReadyToLand />
    </div>
  );
};

export default Price;
