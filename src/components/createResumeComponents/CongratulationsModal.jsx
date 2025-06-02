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
import { Download } from "lucide-react";

const CongratulationsModal = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          {" "}
         <button className='font-semibold flex items-center max-w-sm gap-2 border-white/20 bg-white text-black py-4 px-8 text-lg rounded-md hover:bg-[#69CA6A] hover:text-white transition-colors duration-300'>
<Download size={20} /> Download
  </button>
        </DialogTrigger>
        <DialogContent className="!bg-black max-w-xl">
          <DialogHeader>
            <div className="text-center flex flex-col items-center  gap-4 py-10">
              <Title level="title20">Congratulations</Title>
              <CongratulationsModalIcon />

              <Title level="title14">
                {" "}
                Download Status (2/5 used), Only 3 downloads remaining this
                month!{" "}
              </Title>
              <div className="flex gap-4 w-full">
              <button className="font-semibold border w-full border-white py-4  text-lg rounded-md bg-white text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              Upgrade Now
              </button>
              <button className="font-semibold border w-full border-white py-4  text-lg rounded-md bg-white text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
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
