import React from "react";
import image from "../../assets/images/error.png";
import Title from "./Title";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="section-padding-x section-padding-y flex flex-col lg:flex-row justify-center items-center gap-16">
      <div>
        <img src={image} alt="image" />
      </div>
      <div>
        <Title level="title64" className="my-6">
          Oops! Page not found.
        </Title>
        <Title level="title20" className="leading-10 text-[#E1E1E1]">
          The page you’re looking for doesn’t exist <br /> or has been moved.
        </Title>
        <Link to={"/"}>
          <button className="px-[22px] py-[12px] bg-[#FFf]  text-black rounded-xl font-medium my-6">
            Go To Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
