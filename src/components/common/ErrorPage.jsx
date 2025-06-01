import React from "react";
import image from "../../assets/images/error.png";
import Title from "./Title";

const ErrorPage = () => {
  return (
    <div className="section-padding-x section-padding-y flex flex-col lg:flex-row justify-between items-center gap-5">
      <div>
        <img src={image} alt="image" />
      </div>
      <div>
        <Title level="titlle64">Oops! Page not found.</Title>
        <Title level="titlle20">
          The page you’re looking for doesn’t exist or has been moved.
        </Title>
        <button className="px-[18px] py-[12px] bg-[#FFf] font-medium my-4">
          Go To Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
