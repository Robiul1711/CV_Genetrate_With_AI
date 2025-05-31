import Title from "@/components/common/Title";
import React from "react";

const Imprint = () => {
  return (
    <div className="section-padding-x section-padding-y space-y-4">
      <Title level="title48">Imprint Clever-CV </Title>
      <Title level="title16" className="my-2">
        Welcome to Clever-CV. Below you will find the legally required
        information about our company.
      </Title>

      <div className="mt-8 space-y-4">
        <Title level="title32">Company Information</Title>
        <Title level="title16">Company Name: Clever-CV GmbH</Title>
        <Title level="title16">
          Address: Example Street 12, 12345 Berlin, Germany{" "}
        </Title>
        <Title level="title16">Phone: +49 30 12345678 </Title>
        <Title level="title16">Email: contact@clever-cv.com </Title>
      </div>
      <div className="mt-8 space-y-4">
        <Title level="title32">Legal Representatives </Title>
        <Title level="title16">Managing Director: John Doe</Title>
        <Title level="title16">Commercial Register: HRB 123456, Berlin</Title>
        <Title level="title16">VAT ID: DE123456789 </Title>
      </div>
      <div className="mt-8 space-y-4">
        <Title level="title32">Disclaimer</Title>
        <Title level="title16">
          The content of this website is for general information purposes only.
        </Title>
        <Title level="title16">
          We do not accept liability for the accuracy or completeness of the
          information.
        </Title>
      </div>
      <div className="mt-8 space-y-4">
        <Title level="title32">Contact Us</Title>
        <Title level="title16">
          If you have any questions or concerns, please contact us at:
        </Title>
        <Title level="title16">Email: support@clever-cv.com </Title>
        <Title level="title16">Phone: +49 30 12345678</Title>
      </div>
    </div>
  );
};

export default Imprint;
