import React, { useState } from "react";
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
import { Download } from "lucide-react";

const CongratulationsModal = () => {
  const [open, setOpen] = useState(false); // control modal open/close

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            onClick={() => setOpen(true)}
            className="font-semibold flex items-center max-w-sm gap-2 border-white/20 bg-white text-black py-4 px-8 text-lg rounded-md hover:bg-[#69CA6A] hover:text-white transition-colors duration-300"
          >
            <Download size={20} /> Download
          </button>
        </DialogTrigger>

        <DialogContent className="!bg-black max-w-xl">
          <DialogHeader>
            <div className="text-center flex flex-col items-center gap-4 py-10">
              <Title level="title20">Congratulations</Title>
              <CongratulationsModalIcon />
              <Title level="title14">
                Download Status (2/5 used), Only 3 downloads remaining this
                month!
              </Title>
    <div className="flex gap-4 w-full">
  <button
    onClick={handleClose}
    className="font-semibold w-full border border-white py-4 text-lg rounded-md bg-black text-white hover:text-black hover:bg-[#fff] transition-colors duration-300 hover:border-green-400"
  >
    Upgrade Now
  </button>
  <button
    onClick={handleClose}
    className="font-semibold w-full border border-white py-4 text-lg rounded-md bg-black text-white hover:text-black hover:bg-[#fff] transition-colors duration-300 hover:border-green-400"
  >
    Continue with 3 left
  </button>
</div>

            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CongratulationsModal;

