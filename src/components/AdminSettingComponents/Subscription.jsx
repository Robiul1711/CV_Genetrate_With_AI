import React, { useState } from "react";
import Title from "../common/Title";

const Subscription = () => {
  return (
    <div className="max-w-6xl w-full p-2 lg:p-6">
      <Title level="title22">Subscription Plans</Title>
      <Title level="title16" className="my-2">
        Manage your subscription plan
      </Title>

<div className="border p-3 lg:p-6 border-[#81FB84]/40 rounded-xl mt-10 sm:mt-16 py-10 sm:py-20 relative bg-[#0E0E10] flex flex-col gap-2 sm:flex-row justify-between">

<div className="flex flex-col gap-2  ">
  <Title level="title40">Pro Plan</Title>
  <Title level="title20">€9.99/month</Title>
  <div className="flex gap-3 items-center text-[#9B9B9B] mt-2 sm:mt-5">
  <Title level="title20" className="text-xs">Start Date : 5/22/2025</Title>
  <span className="bg-[#9B9B9B] size-2 rounded-full"></span>
  <Title level="title20" className="text-xs">End Date : 5/22/2025</Title>

  </div>
</div>
<div className="absolute top-0 md:left-[10%] left-1/2 -translate-x-1/2 -translate-y-1/2">

<button className="px-2 sm:px-4 py-2 border bg-black text-white rounded-full text-xs sm:text-base  ">Current Plan</button>
</div>
<div className="w-full sm:flex justify-end items-start">
<button className="font-semibold border border-white  md:py-4  px-2 sm:px-4 py-2 text-sm  rounded-md bg-white text-black transition-colors duration-300 ">Upgrade Plan</button>
</div>
</div>

      <div className="border p-3 lg:p-6 border-[#81FB84]/40 rounded-xl mt-10 sm:mt-16 py-10 sm:py-20 relative bg-[#0E0E10] flex flex-col gap-2 sm:flex-row justify-between">
        <div className="flex flex-col gap-2 mt-4">
          <Title level="title40">Pro Plan</Title>
          <Title level="title20">€9.99/month</Title>
          <div className="flex gap-3 items-center text-[#9B9B9B] mt-2 sm:mt-5">
            <Title level="title20">Start Date : 5/22/2025</Title>
            <span className="bg-[#9B9B9B] size-2 rounded-full"></span>
            <Title level="title20">End Date : 5/22/2025</Title>
          </div>
        </div>
        <div className="absolute top-0 md:left-[10%] left-1/2 -translate-x-1/2 -translate-y-1/2">
          <button className="px-4 py-1.5 border bg-black text-white rounded-full ">
            Current Plan
          </button>
        </div>
        <div className="w-full sm:flex justify-end items-start">
          <button className="font-semibold border border-white  md:py-4  px-2 sm:px-4 py-2 text-sm  rounded-md bg-white text-black transition-colors duration-300 ">
            Upgrade Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
