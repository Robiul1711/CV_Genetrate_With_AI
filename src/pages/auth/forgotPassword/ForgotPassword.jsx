import React, { useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../../../assets/images/logo.png";
import { Link, ScrollRestoration, useNavigate } from "react-router-dom";
import Title from "@/components/common/Title";
import { Mail } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useEmail } from "@/hooks/useEmail";

const ForgotPassword = () => {
    const IMG_URL = import.meta.env.VITE_IMG_URL;
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { setEmail, language } = useEmail();

  const t = {
    en: {
      heading: "Forget Password",
      subtitle:
        "No worries! Enter the email associated with your Storybook World account below. We'll send you a one-time verification code to reset your password.",
      emailLabel: "Your Registered Email",
      emailPlaceholder: "andrew.ainsley@yourdomain.com",
      sendBtn: "Send OTP Code",
      sending: "Sending OTP...",
      success: "OTP sent successfully",
      error: "Something went wrong. Try again.",
      required: "This field is required",
    },
    de: {
      heading: "Passwort vergessen",
      subtitle:
        "Keine Sorge! Geben Sie die E-Mail-Adresse ein, die mit Ihrem Storybook World-Konto verknüpft ist. Wir senden Ihnen einen einmaligen Bestätigungscode, um Ihr Passwort zurückzusetzen.",
      emailLabel: "Ihre registrierte E-Mail",
      emailPlaceholder: "andrew.ainsley@ihredomain.com",
      sendBtn: "OTP-Code senden",
      sending: "OTP wird gesendet...",
      success: "OTP erfolgreich gesendet",
      error: "Etwas ist schief gelaufen. Versuchen Sie es erneut.",
      required: "Dieses Feld ist erforderlich",
    },
  };

  const text = t[language || "en"];

  // Reset server messages on input change
  const emailValue = watch("email");
  React.useEffect(() => {
    setServerError("");
    setSuccessMessage("");
  }, [emailValue]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosPublic.post("/password-reset/request/", {
        email: data.email,
      });
      return res.data;
    },
    onSuccess: (data) => {
      setServerError("");
      setSuccessMessage(data.message || text.success);
      setEmail(data?.email || emailValue);
      setTimeout(() => navigate("/otp-code"), 1500);
    },
    onError: (error) => {
      setSuccessMessage("");
      setServerError(
        error?.response?.data?.message || text.error
      );
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };
  const {data:navData}=useQuery({
    queryKey: ["navData", language],
    queryFn: () =>
      axiosPublic.get("/about-system/", { params: { lan: language } }),
  })

  return (
    <div className="section-padding-x section-padding-y md:py-8 min-h-screen flex justify-center items-center">
      <ScrollRestoration />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl h-auto md:h-[440px] px-4 sm:px-8 lg:px-28 py-5 md:py-8 rounded-2xl border border-[#81FB84]/10 bg-[#0D0D0D]"
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Link to="/">
            <img src={IMG_URL + navData?.data?.data?.logo} alt="logo" className="h-12 md:h-16" />
          </Link>
        </div>

        <h2 className="text-lg font-semibold text-center mb-2">
          {text.heading}
        </h2>

        <Title level="title18" className="text-center mb-6 pb-2 !font-normal">
          {text.subtitle}
        </Title>

        {/* Server/Success Message */}
        {serverError && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm">
            {serverError}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500 rounded-lg text-green-500 text-sm">
            {successMessage}
          </div>
        )}

        {/* Email Input */}
        <div className="mb-4 relative">
          <label htmlFor="email" className="block mb-2 text-sm">
            {text.emailLabel}
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Mail size={16} />
            </span>
            <input
              type="email"
              id="email"
              placeholder={text.emailPlaceholder}
              {...register("email", { required: text.required })}
              className={`w-full px-3 py-1.5 pl-10 !text-xs md:text-base border ${
                errors.email ? "border-red-500" : "border-[#666666]"
              } rounded-lg bg-black focus:outline-none`}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-4">
          <button
            type="submit"
            disabled={isPending}
            className={`w-full ${
              isPending ? "bg-gray-400" : "bg-[#FFF]"
            } text-black py-2 my-3 text-sm font-medium rounded-lg flex justify-center items-center gap-2`}
          >
            {isPending ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                {text.sending}
              </>
            ) : (
              text.sendBtn
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
