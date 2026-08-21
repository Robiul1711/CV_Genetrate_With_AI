import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  return (
    <Sonner
      theme="dark"
      position="bottom-right"
      richColors
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[#0E0E10] group-[.toaster]:text-white group-[.toaster]:border-[#262626] group-[.toaster]:shadow-2xl group-[.toaster]:rounded-xl font-sans",
          description: "group-[.toast]:text-gray-400",
          actionButton:
            "group-[.toast]:bg-[#81FB84] group-[.toast]:text-black font-semibold",
          cancelButton:
            "group-[.toast]:bg-[#1A1A1A] group-[.toast]:text-gray-300",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
