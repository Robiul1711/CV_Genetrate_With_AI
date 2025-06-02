import React, { useState } from "react";
import Title from "../common/Title";

const Subscription = () => {


  return (
    <div className="max-w-6xl w-full p-6">
      <Title level="title22">Subscription Plans</Title>
      <Title level="title16" className="my-2">
Manage your subscription plan
      </Title>

<div className="border p-6 border-[#81FB84]/40 rounded-xl mt-16 py-20 relative bg-[#0E0E10] flex justify-between">

<div className="flex flex-col gap-2  ">
  <Title level="title40">Pro Plan</Title>
  <Title level="title20">€9.99/month</Title>
  <div className="flex gap-3 items-center text-[#9B9B9B] mt-5">
  <Title level="title20">Start Date : 5/22/2025</Title>
  <span className="bg-[#9B9B9B] size-2 rounded-full"></span>
  <Title level="title20">End Date : 5/22/2025</Title>

  </div>
</div>
<div className="absolute top-0 left-[10%] -translate-x-1/2 -translate-y-1/2">

<button className="px-4 py-2 border bg-black text-white rounded-full ">Current Plan</button>
</div>
<div>
<button className="font-semibold border border-white py-4 px-8 text-lg rounded-md bg-white text-black transition-colors duration-300 ">Upgrade Plan</button>
</div>
</div>
    </div>
  );
};

export default Subscription;
