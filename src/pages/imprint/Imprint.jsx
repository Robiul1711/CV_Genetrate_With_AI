import Title from "@/components/common/Title";
import React from "react";
import { ScrollRestoration } from "react-router-dom";
import { motion } from "framer-motion";

const Imprint = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="section-padding-x section-padding-y space-y-6 max-w-4xl mx-auto"
    >
      <ScrollRestoration />

      <Title level="title48">Imprint – Clever CV</Title>
      <Title level="title16" className="my-2 text-gray-300">
        Welcome to Clever-CV. Below you will find the legally required information about our company.
      </Title>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mt-8 space-y-3 bg-[#0E0E10] border border-[#262626] rounded-2xl p-6 hover:border-[#81FB84]/30 transition"
      >
        <Title level="title32" className="text-[#81FB84]">Company Information</Title>
        <Title level="title16" className="text-gray-300">Company Name: Softvence Technologies</Title>
        <Title level="title16" className="text-gray-300">Address: Softvence, 4-7th Floor, Medona Tower, 99 Bir Uttam AK Khandakar Rd, Dhaka 1212</Title>
        <Title level="title16" className="text-gray-300">Email: support@clever-cv.com</Title>
      </motion.div>


      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="mt-8 space-y-3 bg-[#0E0E10] border border-[#262626] rounded-2xl p-6 hover:border-[#81FB84]/30 transition"
      >
        <Title level="title32" className="text-[#81FB84]">Legal Representatives</Title>
        <Title level="title16" className="text-gray-300">Managing Director: John Doe</Title>
        <Title level="title16" className="text-gray-300">Commercial Register: HRB 123456, Berlin</Title>
        <Title level="title16" className="text-gray-300">VAT ID: DE123456789</Title>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-8 space-y-3 bg-[#0E0E10] border border-[#262626] rounded-2xl p-6 hover:border-[#81FB84]/30 transition"
      >
        <Title level="title32" className="text-[#81FB84]">Disclaimer</Title>
        <Title level="title16" className="text-gray-300">
          The content of this website is for general information purposes only.
        </Title>
        <Title level="title16" className="text-gray-300">
          We do not accept liability for the accuracy or completeness of the information.
        </Title>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="mt-8 space-y-3 bg-[#0E0E10] border border-[#262626] rounded-2xl p-6 hover:border-[#81FB84]/30 transition"
      >
        <Title level="title32" className="text-[#81FB84]">Contact Us</Title>
        <Title level="title16" className="text-gray-300">If you have any questions or concerns, please contact us at:</Title>
        <Title level="title16" className="text-gray-300">Email: contact@clever-cv.com</Title>
        <Title level="title16" className="text-gray-300">Phone: +49 30 12345678</Title>
      </motion.div>
    </motion.div>
  );
};

export default Imprint;

