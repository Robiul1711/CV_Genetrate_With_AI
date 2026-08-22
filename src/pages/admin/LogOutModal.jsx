import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import Title from "@/components/common/Title";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LogOutModal = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Dialog>
      <DialogTrigger>
        <button className="w-full flex items-center gap-2 text-[#FFF] hover:bg-[#466b55] hover:text-[#ffffff] cursor-pointer text-sm transition rounded-lg px-4 py-2">
          <FiLogOut className="text-xl" />
          Log Out
        </button>
      </DialogTrigger>

      <DialogContent className="!bg-black max-w-xl">
        <DialogHeader>
          <div className="text-center flex flex-col items-center gap-4 py-10">
            <Title level="title22">Are you sure you want to log out?</Title>
            <Title level="title14">
              You’ll be signed out of your Clever-CV Account
            </Title>

            <div className="flex gap-4 w-full items-center justify-center py-5">
              <DialogClose asChild>
                <button className="font-semibold border border-white hover:bg-white hover:text-black px-5 py-2 rounded-md bg-black text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                  Cancel
                </button>
              </DialogClose>
              <DialogClose asChild>
                <button
                  onClick={handleLogout}
                  className="font-semibold border border-white hover:bg-white hover:text-black px-5 py-2 rounded-md bg-black text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Yes, Log Out
                </button>
              </DialogClose>
            </div>

            <Title level="title14">
              Your data is safe and securely stored.
            </Title>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LogOutModal;
