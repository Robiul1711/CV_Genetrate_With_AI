import ReadyToLand from "@/components/Home_components/ReadyToLand";
import YourPlan from "@/components/Home_components/YourPlan";
import FAQ from "@/components/Home_components/FAQ";
import React from "react";
import { ScrollRestoration } from "react-router-dom";
import { motion } from "framer-motion";

const Price = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="section-padding-x section-padding-y"
    >
      <ScrollRestoration />
      <YourPlan />
      <FAQ />
      <ReadyToLand />
    </motion.div>
  );
};

export default Price;


