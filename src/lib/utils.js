import { clsx } from "clsx";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// The safer way is to use toast.dismiss before showing success/error
export const showLoadingToast = (message = "Loading...") => {
  return toast.loading(message); // returns toastId
};

export const updateToastSuccess = (toastId, message = "Success!") => {
  toast.dismiss(toastId); // close the loading toast
  toast.success(message);
};

export const updateToastError = (toastId, message = "Something went wrong!") => {
  toast.dismiss(toastId); // close the loading toast
  // toast.error(message);
};

// // Tostyfy 
// export const showLoadingToast = (message = "Loading...") => {
//   return toast.loading(message);
// };

// export const updateToastSuccess = (toastId, message = "Success!") => {
//   toast.success(message, { id: toastId });
// };

// export const updateToastError = (toastId, message = "Something went wrong!") => {
//   toast.error(message, { id: toastId });
// };