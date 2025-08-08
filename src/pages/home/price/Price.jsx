import ResumeFour from "@/components/All_Templates/ResumeFour";
import ResumeOne from "@/components/All_Templates/ResumeOne";
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

    </div>
      <ReadyToLand />
    </div>
  );
};

export default Price;
