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
import { Assistant } from "../AllIcons/HomeIcons";
import { Progress } from "@/components/ui/progress"
const Generating_Modal = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          {" "}
          <button className="font-semibold  border-white bg-white text-black py-4 px-16 text-lg rounded-md hover:bg-[#69CA6A] hover:text-white transition-colors duration-300">
            Apply
          </button>
        </DialogTrigger>
        <DialogContent className="!bg-black max-w-xl">
          <DialogHeader>
            <div className="text-center flex flex-col items-center py-10 gap-4 mb-10">
              <Title level="title20">Generating Your Resume...</Title>
              <Assistant />
              <Title level="title14">
                Please wait while we create your new resume
              </Title>
<Progress value={80} />
              <Title level="title14">Almost done, please wait…</Title>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Generating_Modal;
