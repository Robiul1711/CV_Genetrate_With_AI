import React from "react";
import Title from "../common/Title";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const Subscription = () => {
  const axiosSecure = useAxiosSecure();

  const { data: mySubscriptionPlan, isLoading, error } = useQuery({
    queryKey: ["subscription-plans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/current-subscription-plan/");
      return res.data;
    },
  });

  if (isLoading) return <div>Loading subscription plan...</div>;
  if (error) return <div>Error loading subscription plan</div>;

  const plan = mySubscriptionPlan?.data;

  return (
    <div className="max-w-6xl w-full p-2 lg:p-6">
      <Title level="title22">Subscription Plans</Title>
      <Title level="title16" className="my-2">
        Manage your subscription plan
      </Title>

      {plan ? (
        <div className="border p-3 lg:p-6 border-[#81FB84]/40 rounded-xl mt-10 py-10 sm:py-20 relative bg-[#0E0E10] flex flex-col gap-2 sm:flex-row justify-between">
          <div className="flex flex-col gap-2">
            <Title level="title40">{plan.package?.name || "N/A"}</Title>
            <Title level="title20">
              €{plan.package?.price || "0.00"}/{plan.package?.type || "Unlimited"}
            </Title>
            <div className="flex gap-3 items-center text-[#9B9B9B] mt-2">
              <Title level="title20" className="text-xs">
                Start Date: {plan.start_date ? dayjs(plan.start_date).format("MM/DD/YYYY") : "N/A"}
              </Title>
              <span className="bg-[#9B9B9B] size-2 rounded-full"></span>
              <Title level="title20" className="text-xs">
                End Date: {plan.end_date ? dayjs(plan.end_date).format("MM/DD/YYYY") : "Unlimited"}
              </Title>
            </div>
          </div>

          <div className="absolute top-0 md:left-[10%] left-1/2 -translate-x-1/2 -translate-y-1/2">
            <button className="px-2 sm:px-4 py-2 border bg-black text-white rounded-full text-xs">
              Current Plan
            </button>
          </div>

          <div className="w-full sm:flex justify-end items-start">
            <Link to={`/price`}  className="font-semibold border border-white px-2 py-2 text-sm rounded-md bg-white text-black transition-colors duration-300">
              Upgrade Plan
            </Link>
          </div>
        </div>
      ) : (
        <div className="border p-3 lg:p-6 border-gray-300 rounded-xl mt-10 py-10 sm:py-20 bg-[#0E0E10] text-white text-center">
          <Title level="title20">No active subscription plan</Title>
        </div>
      )}
    </div>
  );
};

export default Subscription;