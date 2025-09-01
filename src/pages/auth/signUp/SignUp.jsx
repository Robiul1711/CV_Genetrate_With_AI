import React, { useState } from "react";
import logo from "../../../assets/images/logo.png";
import Title from "@/components/common/Title";
import { Check, Eye, EyeOff, Mail } from "lucide-react";
import { Lock } from "@/components/CustomIcons/CustomIcon";
import { Link, ScrollRestoration, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useEmail } from "@/hooks/useEmail";

const SignUp = () => {
  const { language } = useEmail(); // 'en' or 'de'

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [checked, setChecked] = useState(false);
  const [serverError, setServerError] = useState(null);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const password = watch("password");

  // Language content
  const text = {
    en: {
      createAccount: "Create Your Account",
      subtitle:
        "Join Clever-CV to build, optimize, and land your dream job with AI-powered resumes and cover letters.",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      emailPlaceholder: "andrew.ainsley@yourdomain.com",
      password: "Password",
      passwordPlaceholder: "••••••••",
      confirmPassword: "Confirm Password",
      terms:
        "I agree to the terms of service and privacy policy",
      signUp: "Sign Up",
      processing: "Processing...",
      alreadyAccount: "Already have an account?",
      signIn: "Sign In",
      agreeError: "You must agree to the terms and conditions",
    },
    de: {
      createAccount: "Erstellen Sie Ihr Konto",
      subtitle:
        "Melden Sie sich bei Clever-CV an, um Ihren Lebenslauf zu erstellen, zu optimieren und mit KI-gestützten Anschreiben Ihren Traumjob zu erreichen.",
      firstName: "Vorname",
      lastName: "Nachname",
      email: "E-Mail",
      emailPlaceholder: "andrew.ainsley@ihrdomain.com",
      password: "Passwort",
      passwordPlaceholder: "••••••••",
      confirmPassword: "Passwort bestätigen",
      terms: "Ich stimme den Nutzungsbedingungen und der Datenschutzrichtlinie zu",
      signUp: "Registrieren",
      processing: "Verarbeitung...",
      alreadyAccount: "Sie haben bereits ein Konto?",
      signIn: "Anmelden",
      agreeError: "Sie müssen den Nutzungsbedingungen zustimmen",
    },
  };

  const t = text[language || "en"];

  const signUpMutation = useMutation({
    mutationFn: async (data) => {
      const payload = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: data.password,
      };
      const res = await axiosPublic.post(`/signup/`, payload);
      return res.data;
    },
    onSuccess: (data) => {
      reset();
      setServerError(null);
      toast.success(data?.message);
      navigate("/sign-in");
    },
    onError: (error) => {
      setServerError(
        error?.response?.data?.message || "Something went wrong. Try again."
      );
    },
  });

  const onSubmit = async (data) => {
    if (!checked) {
      setServerError(t.agreeError);
      return;
    }
    setServerError(null);
    signUpMutation.mutate(data);
  };

  return (
    <div className="section-padding-x section-padding-y md:py-4 min-h-screen flex justify-center items-center overflow-auto md:overflow-y-hidden">
      <ScrollRestoration />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl px-4 sm:px-4 md:px-12 lg:px-24 xl:px-32 py-5 rounded-2xl border border-[#81FB84]/10 bg-[#0D0D0D]"
        noValidate
      >
        <div className="flex justify-center mb-4">
          <Link to={"/"}>
            <img src={logo} alt="logo" className="h-12 md:h-16" />
          </Link>
        </div>

        <h2 className="text-xl font-semibold text-center mb-2">{t.createAccount}</h2>
        <Title level="title18" className="text-center !text-[14px] pb-3 !font-normal">
          {t.subtitle}
        </Title>

        {serverError && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm">
            {serverError}
          </div>
        )}

        {/* Name Input */}
        <div className="flex flex-col md:flex-row gap-5 w-full pt-2">
          <div className="mb-1 w-full">
            <label htmlFor="firstName" className="block mb-2 text-sm">{t.firstName}</label>
            <input
              type="text"
              id="firstName"
              {...register("firstName", { required: t.firstName + " is required" })}
              placeholder={t.firstName}
              className={`w-full px-3 py-1.5 text-xs border ${errors.firstName ? "border-red-500" : "border-[#666666]"} text-[15px] rounded-lg bg-black focus:outline-none`}
            />
            {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>}
          </div>

          <div className="mb-1 w-full">
            <label htmlFor="lastName" className="block mb-2 text-sm">{t.lastName}</label>
            <input
              type="text"
              id="lastName"
              {...register("lastName", { required: t.lastName + " is required" })}
              placeholder={t.lastName}
              className={`w-full px-3 py-1.5 text-xs border ${errors.lastName ? "border-red-500" : "border-[#666666]"} text-[15px] rounded-lg bg-black focus:outline-none`}
            />
            {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>}
          </div>
        </div>

        {/* Email Input */}
        <div className="mb-1 relative">
          <label htmlFor="email" className="block mb-2 text-sm">{t.email}</label>
          <div className={`relative flex items-center w-full px-3 py-1.5 gap-3 !text-xs md:text-base border rounded-lg ${errors.email ? "border-red-500" : "border-[#666666]"}`}>
            <Mail size={16} />
            <input
              type="email"
              id="email"
              {...register("email", {
                required: t.email + " is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder={t.emailPlaceholder}
              className="w-full bg-black focus:outline-none"
            />
          </div>
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>

        {/* Passwords */}
        <div className="flex flex-col md:flex-row gap-5 w-full pt-2">
          {/* Password */}
          <div className="mb-1 relative w-full">
            <label htmlFor="password" className="block mb-2 text-sm">{t.password}</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Lock size={16} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password", {
                  required: t.password + " is required",
                  minLength: { value: 8, message: t.password + " must be at least 8 characters" },
                })}
                placeholder={t.passwordPlaceholder}
                className={`w-full px-3 py-1.5 pl-10 !text-xs border ${errors.password ? "border-red-500" : "border-[#666666]"} rounded-lg bg-black`}
              />
              <span
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
              </span>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div className="mb-1 relative w-full">
            <label htmlFor="confirmPassword" className="block mb-2 text-sm">{t.confirmPassword}</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Lock size={16} />
              </span>
              <input
                type={showPassword1 ? "text" : "password"}
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: t.confirmPassword + " is required",
                  validate: (value) => value === password || "Passwords do not match",
                })}
                placeholder={t.passwordPlaceholder}
                className={`w-full px-3 py-1.5 pl-10 !text-xs border ${errors.confirmPassword ? "border-red-500" : "border-[#666666]"} rounded-lg bg-black`}
              />
              <span
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword1((prev) => !prev)}
              >
                {showPassword1 ? <Eye size={16} /> : <EyeOff size={16} />}
              </span>
            </div>
            {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>}
          </div>
        </div>

        {/* Terms */}
        <div className="my-4 text-sm">
          <label className="flex items-start gap-3 cursor-pointer">
            <span className={`w-4 h-4 flex justify-center items-center border rounded-sm mt-0.5 ${checked ? "border-[#81FB84] bg-black" : "border-[#666666] bg-black"}`}>
              {checked && <Check size={14} className="text-[#81FB84]" />}
            </span>
            <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} className="hidden" />
            <span className="text-sm">
              {t.terms.split("terms of service")[0]}
              <Link to="/terms" className="text-[#81FB84] underline">terms of service</Link>
              {t.terms.split("privacy policy")[1]}
              <Link to="/privacy" className="text-[#81FB84] underline">privacy policy</Link>
            </span>
          </label>
          {!checked && serverError === t.agreeError && <p className="mt-1 text-xs text-red-500">{serverError}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={signUpMutation.isPending}
          className={`w-full ${signUpMutation.isPending ? "bg-gray-400" : "bg-[#FFF]"} text-black py-2 my-3 text-sm font-medium rounded-lg flex justify-center items-center gap-2`}
        >
          {signUpMutation.isPending ? t.processing : t.signUp}
        </button>

        {/* Already Account */}
        <p className="text-center text-sm my-3">
          {t.alreadyAccount}{" "}
          <Link to={"/sign-in"}>
            <span className="font-medium cursor-pointer text-[#81FB84] underline">{t.signIn}</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
