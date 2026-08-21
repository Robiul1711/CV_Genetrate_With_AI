import { clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const showLoadingToast = (message = "Loading...") => {
  return toast.loading(message);
};

export const updateToastSuccess = (toastId, message = "Success!") => {
  toast.dismiss(toastId);
  toast.success(message);
};

export const updateToastError = (toastId, message = "Something went wrong!") => {
  toast.dismiss(toastId);
  toast.error(message);
};