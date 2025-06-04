import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Title from "../common/Title";
import { CongratulationsModalIcon } from "../AllIcons/DashboardAllIcons";

const PasswordSuccessModal = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          {" "}
          <button className="font-semibold flex items-center max-w-sm gap-2 border-white/20 bg-white text-black  md:py-4  px-2 sm:px-8 py-2 text-sm sm:text-lg rounded-md hover:bg-[#69CA6A] hover:text-white transition-colors duration-300">
        Save New Password
          </button>
        </DialogTrigger>
        <DialogContent className="!bg-black max-w-xl">
          <DialogHeader>
            <div className="text-center flex flex-col items-center  gap-4 py-10">
              <Title level="title20">Password Changed Successfully!</Title>
              <CongratulationsModalIcon />

              <Title level="title14">
                You can now sign in with your new password
              </Title>
              <div className="flex gap-4 w-full">
                <button className="font-semibold border w-full border-white py-4  text-lg rounded-md bg-white text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
        Back to Dashboard
                </button>
                <button className="font-semibold border w-full border-white py-4  text-lg rounded-md bg-white text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                 Sign in Now
                </button>
              </div>
                 <Title level="title14">
               Remember to keep your password secure and never share it with anyone
              </Title>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PasswordSuccessModal;
