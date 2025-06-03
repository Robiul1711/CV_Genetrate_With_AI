import React from 'react'
import { DocumentIcon } from "@/components/AllIcons/DashboardAllIcons";
import Title from "@/components/common/Title";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Progress } from "@/components/ui/progress";
const Step_3 = () => {
  return (
     <div className="max-w-6xl mx-auto w-full">
         <div className="text-center flex flex-col items-center gap-4 mb-10">
           <Title level="title32"> Upload Resume</Title>
  
         </div>
 
         <div className="flex items-center justify-center w-full">
           <label
             htmlFor="dropzone-file"
             className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer"
           >
             <div className="flex flex-col items-center justify-center pt-5 pb-6">
               <svg
                 className="w-8 h-8 mb-4 text-gray-500 "
                 aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg"
                 fill="none"
                 viewBox="0 0 20 16"
               >
                 <path
                   stroke="currentColor"
                   strokeLinecap="round"
                   strokeLinejoin="round"
                   strokeWidth={2}
                   d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                 />
               </svg>
               <p className="mb-2 text-sm text-gray-500 ">
                 <span className="font-semibold">Click to upload</span> or drag
                 and drop
               </p>
               <p className="text-xs text-gray-500 ">
                 SVG, PNG, JPG or GIF (MAX. 800x400px)
               </p>
             </div>
             <input id="dropzone-file" type="file" className="hidden" />
           </label>
         </div>
         <div className="border border-[#262626] p-5 rounded-xl mt-16">
           <div className="flex items-center justify-between ">
             <div className="flex items-center gap-4">
               <DocumentIcon />
               <div className="flex flex-col">
                 <h1 className="text-xl font-semibold">luca weber.pdf</h1>
                 <p className="text-[#9B9B9B]">60 KB of 12O KB uploaded</p>
               </div>
             </div>
             <IoIosCloseCircleOutline className="text-2xl" />
           </div>
           <div className="mt-8">
             <Progress value={80} />
           </div>
         </div>
 
       </div>
  )
}

export default Step_3
