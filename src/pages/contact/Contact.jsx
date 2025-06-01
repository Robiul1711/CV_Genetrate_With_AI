import ContactForm from "@/components/contactComponents/ContactForm";
import ReadyToLand from "@/components/Home_components/ReadyToLand";
import React from "react";
import { ScrollRestoration } from "react-router-dom";

const Contact = () => {
  return (
    <div className="section-padding-y">
      <ScrollRestoration />
      <ContactForm />
      <div className="section-padding-x">
        <ReadyToLand />
      </div>
    </div>
  );
};

export default Contact;
