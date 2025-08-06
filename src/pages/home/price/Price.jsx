import ResumeOne from "@/components/All_Templates/ResumeOne";
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
    <ResumeOne />
      <ReadyToLand />
    </div>
  );
};

export default Price;
