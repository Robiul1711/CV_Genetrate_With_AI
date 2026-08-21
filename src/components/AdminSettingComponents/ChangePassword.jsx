import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, ShieldCheck, Check, X, KeyRound } from "lucide-react";
import { toast } from "sonner";

const ChangePassword = () => {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const newPasswordValue = watch("new_password") || "";

  // Password requirements checklist
  const requirements = [
    { label: "At least 8 characters", met: newPasswordValue.length >= 8 },
    { label: "Contains a number (0-9)", met: /\d/.test(newPasswordValue) },
    { label: "Contains an uppercase letter", met: /[A-Z]/.test(newPasswordValue) },
    { label: "Contains a special character", met: /[^A-Za-z0-9]/.test(newPasswordValue) },
  ];

  const onSubmit = (data) => {
    toast.success("Password updated successfully!");
    reset();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-6 border-b border-[#262626]">
        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <KeyRound className="text-[#81FB84]" size={24} />
          Change Password
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Ensure your account remains safe with a strong, unique password.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Password Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-7 space-y-5">
          {/* Old Password */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
              Old Password *
            </label>
            <div className="relative">
              <input
                type={showOld ? "text" : "password"}
                placeholder="Enter current password"
                className="w-full bg-[#141416] border border-[#333] focus:border-white p-3 pr-10 rounded-xl text-sm text-white focus:outline-none transition"
                {...register("old_password", {
                  required: "Current password is required",
                })}
              />
              <button
                type="button"
                onClick={() => setShowOld((prev) => !prev)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
              >
                {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.old_password && (
              <p className="text-red-500 text-xs mt-1">{errors.old_password.message}</p>
            )}
          </div>

          {/* New Password */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
              New Password *
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                placeholder="Enter new strong password"
                className="w-full bg-[#141416] border border-[#333] focus:border-white p-3 pr-10 rounded-xl text-sm text-white focus:outline-none transition"
                {...register("new_password", {
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowNew((prev) => !prev)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.new_password && (
              <p className="text-red-500 text-xs mt-1">{errors.new_password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
              Confirm New Password *
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm your new password"
                className="w-full bg-[#141416] border border-[#333] focus:border-white p-3 pr-10 rounded-xl text-sm text-white focus:outline-none transition"
                {...register("confirm_password", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("new_password") || "Passwords do not match",
                })}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((prev) => !prev)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirm_password && (
              <p className="text-red-500 text-xs mt-1">{errors.confirm_password.message}</p>
            )}
          </div>

          {/* Submit */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3 bg-white text-black font-semibold rounded-xl text-sm hover:bg-gray-200 transition shadow-md"
            >
              Update Password
            </button>
          </div>
        </form>

        {/* Security Checklist Card */}
        <div className="lg:col-span-5 bg-[#141416] border border-[#262626] rounded-xl p-5 space-y-4 h-fit">
          <div className="flex items-center gap-2 text-white font-medium text-sm">
            <ShieldCheck size={18} className="text-[#81FB84]" />
            <span>Password Requirements</span>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed">
            A strong password helps prevent unauthorized access to your account and generated documents.
          </p>

          <div className="space-y-2.5 pt-2 border-t border-[#262626]">
            {requirements.map((req, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs">
                {req.met ? (
                  <span className="w-4 h-4 rounded-full bg-[#81FB84]/20 text-[#81FB84] flex items-center justify-center flex-shrink-0">
                    <Check size={11} />
                  </span>
                ) : (
                  <span className="w-4 h-4 rounded-full bg-gray-800 text-gray-500 flex items-center justify-center flex-shrink-0">
                    <X size={11} />
                  </span>
                )}
                <span className={req.met ? "text-white font-medium" : "text-gray-400"}>
                  {req.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
