import { Check } from "lucide-react";
import React from "react";
import { UpgradeIcon } from "../AllIcons/HomeIcons";
import { Link } from "react-router-dom";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useEmail } from "@/hooks/useEmail";
import { useQuery } from "@tanstack/react-query";

const YourPlan = () => {
  const axiosPublic = useAxiosPublic();
  const { language } = useEmail();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['subscription', language],
    queryFn: () => axiosPublic.get('/subscription-packages', {
      params: { lan: language },
    })
  });

  if (isLoading) return <div>Loading plans...</div>;
  if (error) return <div>Error loading plans: {error.message}</div>;

  const plans = data?.data?.data || [];

  // Function to get the price display text
  const getPriceDisplay = (plan) => {
    if (plan.type === 'pay_per_download') {
      return `€${plan.price} / download`;
    }
    return `€${plan.price} / ${plan.type}`;
  };

  return (
    <div className="pb-12 py-6 md:py-10">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-[24px] md:text-[28px] font-bold ">
          Choose Your Plan
        </h1>
        <p className="text-[15px] md:text-base text-[#9B9B9B] pt-2">
          Flexible options for every job seeker.
        </p>
      </div>
      
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((plan) => (
          <div 
            key={plan.id} 
            className="hover:border border border-white/20 rounded-xl shadow-lg p-4 text-white hover:border-white duration-300 transition-all transform"
          >
            <div className="flex items-start flex-col h-full">
            <button className="border mb-4 flex items-center gap-2 text-sm font-semibold py-2 px-5 rounded-md">
              {plan.name}
              <UpgradeIcon />
            </button>

            <p className="text-2xl md:text-3xl font-bold">
              €{plan.price} <span className="text-gray-500 text-xl">/{plan.type === 'month' ? 'month' : 'month'}</span>
            </p>

            <div className="flex flex-col flex-grow justify-between">
              <div className="mt-2">
                <h3 className="font-medium mb-1 text-sm">
                  {plan.name === 'Free Plan' 
                    ? 'Start building - no strings attached' 
                    : plan.name === 'Basic Plan' 
                      ? 'Essential tools for your job search'
                      : plan.name === 'Pro Plan'
                        ? 'Advanced features for professionals'
                        : 'Pay only when you download'}
                </h3>
                
                <ul className="space-y-3 text-sm">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 overflow-visible" />
                      <span>{feature.name}</span>
                    </li>
                  ))}
                </ul>
                
              </div>
            </div>

                <Link
                  to={`/sign-in`}
                  className="text-center flex justify-center items-center w-full bg-white text-sm text-black font-semibold py-2 rounded-md mt-4"
                >
                  {plan.name === 'Free Plan' ? 'Start Free Trial' : 'Get Started'}
                </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourPlan;