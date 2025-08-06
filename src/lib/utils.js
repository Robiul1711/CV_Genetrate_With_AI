import { clsx } from "clsx";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}



// Tostyfy 
export const showLoadingToast = (message = "Loading...") => {
  return toast.loading(message);
};

export const updateToastSuccess = (toastId, message = "Success!") => {
  toast.success(message, { id: toastId });
};

export const updateToastError = (toastId, message = "Something went wrong!") => {
  toast.error(message, { id: toastId });
};