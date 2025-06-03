import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import Title from "@/components/common/Title";
import { FiLogOut } from "react-icons/fi";

const LogOutModal = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          {" "}
          <button className="w-full flex items-center gap-2 text-[#FFF] hover:bg-[#466b55] hover:text-[#ffffff] cursor-pointer  transition  rounded-lg px-4 py-2">
            <span>
              <FiLogOut />
            </span>
            Log Out
          </button>
        </DialogTrigger>
        <DialogContent className="!bg-black max-w-xl">
          <DialogHeader>
            <div className="text-center flex flex-col items-center  gap-4 py-10">
              <Title level="title22">Are you sure you want To log out?</Title>

              <Title level="title14">
                You’ll be signed out of your Clever-CV Account
              </Title>
              <div className="flex gap-4 w-full py-5">
                <button className="font-semibold border w-full border-white py-4  text-lg rounded-md bg-black text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                  Cancel
                </button>
                <button className="font-semibold border w-full border-white py-4  text-lg rounded-md bg-black text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                  Yes, Log Out
                </button>
              </div>
              <Title level="title14">
                Your data is safe and securely stored.
              </Title>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LogOutModal;
