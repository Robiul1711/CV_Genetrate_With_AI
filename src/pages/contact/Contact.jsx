import ContactForm from "@/components/contactComponents/ContactForm";
import ReadyToLand from "@/components/Home_components/ReadyToLand";
import React from "react";
import { ScrollRestoration } from "react-router-dom";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className=""
    >
      <ScrollRestoration />
      <ContactForm />
      <div className="">
        <ReadyToLand />
      </div>
    </motion.div>
  );
};

export default Contact;

