// import { Check } from "lucide-react";
// import React, { useState } from "react";
// import { UpgradeIcon } from "../AllIcons/HomeIcons";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import useAxiosPublic from "@/hooks/useAxiosPublic";
// import useAxiosSecure from "@/hooks/useAxiosSecure";
// import { useEmail } from "@/hooks/useEmail";
// import Swal from "sweetalert2";
// import { useAuth } from "@/hooks/useAuth";

// const YourPlan = () => {
//   const axiosPublic = useAxiosPublic();
//   const axiosSecure = useAxiosSecure();
//   const { language } = useEmail();
//   const [loadingPlanId, setLoadingPlanId] = useState(null);
//   const VITE_PAYMENT_URL = import.meta.env.VITE_PAYMENT_URL;
//   const {user} =useAuth()

//   // Fetch subscription plans
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["subscription", language],
//     queryFn: () =>
//       axiosPublic.get("/subscription-packages", { params: { lan: language } }),
//   });

//   // Mutation for Stripe checkout
//   const planMutation = useMutation({
//     mutationFn: async (payload) => {
//       const response = await axiosSecure.post("/stripe-checkout/", payload);
//       return response.data;
//     },
//     onSuccess: (data) => {
//       setLoadingPlanId(null);
//       window.open(data?.data, "_blank");
//     },
//     onError: (error) => {
//       setLoadingPlanId(null);
//       console.error("Error during plan mutation:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text:
//           error?.response?.data?.message ||
//           "An error occurred while processing your request. Please try again.",
//       });
//     },
//   });

//   if (isLoading) return <div>Loading plans...</div>;
//   if (error) return <div>Error loading plans: {error.message}</div>;

//   const plans = data?.data?.data || [];

//   const handleClick = (plan) => {
//     setLoadingPlanId(plan.id);

//     const payload = {
//       price_id: plan.stripe_price_id,
//       type: plan.type,
//       success_url: `${VITE_PAYMENT_URL}/success`,
//       cancel_url: `${VITE_PAYMENT_URL}/canceled`,
//     };

//     planMutation.mutate(payload);
//   };

//   const getPlanType = (type) => {
//     if (!type) return "Unlimited";
//     if (type === "month") return {
//       de: "monat",
//       en: "month",
//     }[language || "en"];
//     return type;
//   };

//   return (
//     <div className="pb-12 py-6 md:py-10">
//       <div className="flex flex-col items-center text-center">
//         <h1 className="text-[24px] md:text-[28px] font-bold">
//           {language === "de" ? "Wählen Sie Ihren Plan" : "Choose Your Plan"}
//         </h1>
//         <p className="text-[15px] md:text-base text-[#9B9B9B] pt-2">
//           {language === "de"
//             ? "Flexible Optionen für jeden Arbeitssuchenden."
//             : "Flexible options for every job seeker."}
//         </p>
//       </div>

//       <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {plans.map((plan) => (
//           <div
//             key={plan.id}
//             className="hover:border border border-white/20 rounded-xl shadow-lg p-4 text-white hover:border-white duration-300 transition-all transform"
//           >
//             <div className="flex items-start flex-col h-full">
//               <button className="border mb-4 flex items-center gap-2 text-sm font-semibold py-2 px-5 rounded-md">
//                 {plan.name}
//                 <UpgradeIcon />
//               </button>

//               <p className="text-2xl md:text-3xl font-bold">
//                 €{plan.price}{" "}
//                 <span className="text-gray-500 text-xl">
//                   /{getPlanType(plan.type)}
//                 </span>
//               </p>

//               <div className="flex flex-col flex-grow justify-between">
//                 <div className="mt-2">
//                   <h3 className="font-medium mb-1 text-sm">
//                     {plan.name === "Free Plan"
//                       ? "Start building - no strings attached"
//                       : plan.name === "Basic Plan"
//                       ? "Essential tools for your job search"
//                       : plan.name === "Pro Plan"
//                       ? "Advanced features for professionals"
//                       : "Pay only when you download"}
//                   </h3>

//                   <ul className="space-y-3 text-sm">
//                     {plan.features.map((feature, index) => (
//                       <li key={index} className="flex items-start gap-2">
//                         <Check className="w-5 h-5 overflow-visible" />
//                         <span>{feature.name}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>

//               <button
//                 onClick={() => handleClick(plan)}
//                 disabled={loadingPlanId === plan.id}
//                 className={`text-center flex justify-center items-center w-full bg-white text-sm text-black font-semibold py-2 rounded-md mt-4 transition-all ${
//                   loadingPlanId === plan.id
//                     ? "opacity-60 cursor-not-allowed"
//                     : ""
//                 }`}
//               >
//                 {loadingPlanId === plan.id
//                   ? language === "de"
//                     ? "Verarbeitung..."
//                     : "Processing..."
//                   : plan.name === "Free Plan"
//                   ? language === "de"
//                     ? "Kostenlose Testversion starten"
//                     : "Start Free Trial"
//                   : language === "de"
//                   ? "Jetzt starten"
//                   : "Get Started"}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default YourPlan;


import { Check } from "lucide-react";
import React, { useState } from "react";
import { UpgradeIcon } from "../AllIcons/HomeIcons";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useEmail } from "@/hooks/useEmail";
import Swal from "sweetalert2";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const YourPlan = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { language } = useEmail();
  const [loadingPlanId, setLoadingPlanId] = useState(null);
  const VITE_PAYMENT_URL = import.meta.env.VITE_PAYMENT_URL;
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch subscription plans
  const { data, isLoading, error } = useQuery({
    queryKey: ["subscription", language],
    queryFn: () =>
      axiosPublic.get("/subscription-packages", { params: { lan: language } }),
  });

  // Mutation for Stripe checkout
  const planMutation = useMutation({
    mutationFn: async (payload) => {
      const response = await axiosSecure.post("/stripe-checkout/", payload);
      return response.data;
    },
    onSuccess: (data) => {
      setLoadingPlanId(null);
      window.open(data?.data, "_blank");
    },
    onError: (error) => {
      setLoadingPlanId(null);
      console.error("Error during plan mutation:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error?.response?.data?.message ||
          "An error occurred while processing your request. Please try again.",
      });
    },
  });

  if (isLoading) return <div>Loading plans...</div>;
  if (error) return <div>Error loading plans: {error.message}</div>;

  const plans = data?.data?.data || [];

  const handleClick = (plan) => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: language === "de" ? "Nicht eingeloggt!" : "Not Logged In!",
        text:
          language === "de"
            ? "Bitte melden Sie sich an, um einen Plan zu abonnieren."
            : "Please log in to subscribe to a plan.",
        showCancelButton: true,
        confirmButtonText: language === "de" ? "Anmelden" : "Login",
        cancelButtonText: language === "de" ? "Abbrechen" : "Cancel",
        confirmButtonColor: "#000",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/sign-in");
        }
      });
      return;
    }

    setLoadingPlanId(plan.id);

    const payload = {
      price_id: plan.stripe_price_id,
      type: plan.type,
      success_url: `${VITE_PAYMENT_URL}/success`,
      cancel_url: `${VITE_PAYMENT_URL}/canceled`,
    };

    planMutation.mutate(payload);
  };

  const getPlanType = (type) => {
    if (!type) return "Unlimited";
    if (type === "month")
      return {
        de: "monat",
        en: "month",
      }[language || "en"];
    return type;
  };

  return (
    <div className="pb-12 py-6 md:py-10">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-[24px] md:text-[28px] font-bold">
          {language === "de" ? "Wählen Sie Ihren Plan" : "Choose Your Plan"}
        </h1>
        <p className="text-[15px] md:text-base text-[#9B9B9B] pt-2">
          {language === "de"
            ? "Flexible Optionen für jeden Arbeitssuchenden."
            : "Flexible options for every job seeker."}
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
                €{plan.price}{" "}
                <span className="text-gray-500 text-xl">
                  /{getPlanType(plan.type)}
                </span>
              </p>

              <div className="flex flex-col flex-grow justify-between">
                <div className="mt-2">
                  {/* <h3 className="font-medium mb-1 text-sm">
                    {plan.name === "Free Plan"
                      ? "Start building - no strings attached"
                      : plan.name === "Basic Plan"
                      ? "Essential tools for your job search"
                      : plan.name === "Pro Plan"
                      ? "Advanced features for professionals"
                      : "Pay only when you download"}
                  </h3> */}

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

              <button
                onClick={() => handleClick(plan)}
                disabled={loadingPlanId === plan.id}
                className={`text-center flex justify-center items-center w-full bg-white text-sm text-black font-semibold py-2 rounded-md mt-4 transition-all ${
                  loadingPlanId === plan.id
                    ? "opacity-60 cursor-not-allowed"
                    : ""
                }`}
              >
                {loadingPlanId === plan.id
                  ? language === "de"
                    ? "Verarbeitung..."
                    : "Processing..."
                  : plan.name === "Free Plan"
                  ? language === "de"
                    ? "Kostenlose Testversion starten"
                    : "Start Free Trial"
                  : language === "de"
                  ? "Jetzt starten"
                  : "Get Started"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourPlan;
