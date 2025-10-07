import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Title from "../common/Title";
import { useAuth } from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  showLoadingToast,
  updateToastError,
  updateToastSuccess,
} from "@/lib/utils";
import { useEmail } from "@/hooks/useEmail"; // For language switching

const ChangePassword = () => {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { user } = useAuth();
  const userEmail = user?.profile?.user?.email;
  const axiosSecure = useAxiosSecure();
  const { language } = useEmail(); // "en" or "de"

  // Translation texts
  const texts = {
    en: {
      title: "Change Password",
      subtitle: "Update your password regularly to keep your account secure.",
      oldPassword: "Old Password",
      newPassword: "New Password",
      confirmPassword: "Confirm New Password",
      oldPasswordPlaceholder: "Enter old password",
      newPasswordPlaceholder: "Enter new password",
      confirmPasswordPlaceholder: "Confirm new password",
      oldPasswordRequired: "Old password is required",
      newPasswordRequired: "New password is required",
      newPasswordMinLength: "Password must be at least 6 characters",
      confirmPasswordRequired: "Please confirm your password",
      passwordsMismatch: "Passwords do not match",
      cancel: "Cancel",
      savePassword: "Save Password",
      updatingPassword: "Password Updating...",
      passwordUpdated: "Password updated successfully.",
      passwordUpdateFailed: "Failed to update password.",
    },
    de: {
      title: "Passwort ändern",
      subtitle: "Aktualisieren Sie Ihr Passwort regelmäßig, um Ihr Konto zu sichern.",
      oldPassword: "Altes Passwort",
      newPassword: "Neues Passwort",
      confirmPassword: "Neues Passwort bestätigen",
      oldPasswordPlaceholder: "Altes Passwort eingeben",
      newPasswordPlaceholder: "Neues Passwort eingeben",
      confirmPasswordPlaceholder: "Neues Passwort bestätigen",
      oldPasswordRequired: "Altes Passwort ist erforderlich",
      newPasswordRequired: "Neues Passwort ist erforderlich",
      newPasswordMinLength: "Das Passwort muss mindestens 6 Zeichen lang sein",
      confirmPasswordRequired: "Bitte bestätigen Sie Ihr Passwort",
      passwordsMismatch: "Passwörter stimmen nicht überein",
      cancel: "Abbrechen",
      savePassword: "Passwort speichern",
      updatingPassword: "Passwort wird aktualisiert...",
      passwordUpdated: "Passwort erfolgreich aktualisiert.",
      passwordUpdateFailed: "Passwort konnte nicht aktualisiert werden.",
    },
  };

  const t = language === "de" ? texts.de : texts.en;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const updatePasswordMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosSecure.post("/update-password/", data);
      return response.data;
    },
    // onMutate: () => {
    //   const toastId = showLoadingToast(t.updatingPassword);
    //   return { toastId };
    // },
    onSuccess: (data, _variables, context) => {
      updateToastSuccess(
        context.toastId,
        data?.message || t.passwordUpdated
      );
      reset();
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || t.passwordUpdateFailed
      );
    },
  });

  const onSubmit = (data) => {
    updatePasswordMutation.mutate({
      email: userEmail,
      old_password: data.old_password,
      new_password: data.new_password,
      confirm_password: data.confirm_password,
    });
  };

  return (
    <div className="max-w-6xl w-full p-2 lg:p-3">
      <Title level="title22">{t.title}</Title>
      <Title level="title16" className="my-2">{t.subtitle}</Title>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6 mt-6">
          {/* Old Password */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="old_password" className="text-sm text-white">
              {t.oldPassword}
            </label>
            <div className="relative">
              <input
                type={showOld ? "text" : "password"}
                id="old_password"
                placeholder={t.oldPasswordPlaceholder}
                className="w-full border border-[#262626] bg-[#0E0E10] rounded-[10px] px-3 py-1.5 text-xs text-white"
                {...register("old_password", {
                  required: t.oldPasswordRequired,
                })}
              />
              <span
                onClick={() => setShowOld((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white cursor-pointer"
              >
                {showOld ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
            {errors.old_password && (
              <p className="text-red-500 text-xs">{errors.old_password.message}</p>
            )}
          </div>

          {/* New Password */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="new_password" className="text-sm text-white">
              {t.newPassword}
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                id="new_password"
                placeholder={t.newPasswordPlaceholder}
                className="w-full border border-[#262626] bg-[#0E0E10] rounded-[10px] px-3 py-1.5 text-xs text-white"
                {...register("new_password", {
                  required: t.newPasswordRequired,
                  minLength: {
                    value: 6,
                    message: t.newPasswordMinLength,
                  },
                })}
              />
              <span
                onClick={() => setShowNew((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white cursor-pointer"
              >
                {showNew ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
            {errors.new_password && (
              <p className="text-red-500 text-xs">{errors.new_password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="confirm_password" className="text-sm text-white">
              {t.confirmPassword}
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                id="confirm_password"
                placeholder={t.confirmPasswordPlaceholder}
                className="w-full border border-[#262626] bg-[#0E0E10] rounded-[10px] px-3 py-1.5 text-xs text-white"
                {...register("confirm_password", {
                  required: t.confirmPasswordRequired,
                  validate: (value) =>
                    value === watch("new_password") || t.passwordsMismatch,
                })}
              />
              <span
                onClick={() => setShowConfirm((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white cursor-pointer"
              >
                {showConfirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
            {errors.confirm_password && (
              <p className="text-red-500 text-xs">{errors.confirm_password.message}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap sm:justify-end gap-4">
            <button
              type="button"
              onClick={() => reset()}
              className="border border-white text-white px-3 py-1.5 text-sm rounded-md hover:bg-white hover:text-black transition"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="bg-white text-black px-3 py-1.5 text-sm rounded-md hover:bg-gray-200 transition"
            >
              {t.savePassword}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
