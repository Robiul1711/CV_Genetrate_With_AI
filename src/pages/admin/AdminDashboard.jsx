import React from "react";
import dashboard from "../../assets/images/dashboard.png";
import hi from "../../assets/images/hi.png";
import Title from "@/components/common/Title";
import {
  CreateCoverLetterIcon,
  CreateNewResumeIcon,
  UpdateExistingResumeIcon,
} from "@/components/AllIcons/DashboardAllIcons";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const data = [
    {
      id: 1,
      title: "Create New Resume",
      descript: "Let AI help you craft a job-winning resume from zero.",
      icons: <CreateNewResumeIcon />,
      link: "/dashboard/create-new-resume",
    },
    {
      id: 2,
      title: "Update Existing Resume",
      descript: "Upload your current resume and let AI enhance it for success.",
      icons: <UpdateExistingResumeIcon />,
      link: "/dashboard/update-existing-resume",
    },
    {
      id: 3,
      title: "Create Cover Letter",
      descript: "Personalized letters matched to your resume and target job.",
      icons: <CreateCoverLetterIcon />,
      link: "/dashboard/create-cover-letter",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Welcome Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-[#0E0E10] border border-white/10 hover:border-[#81FB84]/30 p-6 sm:p-8 rounded-2xl flex gap-6 justify-between items-center shadow-xl transition duration-300 relative overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#81FB84]/10 blur-3xl rounded-full pointer-events-none" />
        <div className="flex flex-col gap-4 px-2 max-w-2xl">
          <div className="flex items-center text-sm gap-3">
            <Title level="title28">
              Welcome to Your Clever CV Dashboard!
            </Title>
            <img src={hi} alt="Wave" className="w-8 h-8 animate-bounce" />
          </div>
          <Title level="title20" className="text-gray-400 font-normal">
            Craft, Optimize, Impress, Land Your Dream Job — All in One Smart Platform
          </Title>
        </div>
        <div className="hidden md:block flex-shrink-0">
          <img src={dashboard} alt="Dashboard preview" className="w-36 h-36 lg:w-44 lg:h-44 object-contain" />
        </div>
      </motion.div>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-6">
        {data.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1, ease: "easeOut" }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="h-full"
          >
            <Link
              to={item.link}
              className="bg-[#0E0E10] border border-white/10 hover:border-[#81FB84]/40 p-6 xl:p-8 rounded-2xl flex flex-col gap-4 items-center text-center justify-center transition-all duration-300 hover:shadow-[0_10px_30px_rgba(129,251,132,0.12)] group h-full"
            >
              <span className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:border-[#81FB84]/40 group-hover:scale-110 transition duration-300">{item.icons}</span>
              <Title level="title24" className="group-hover:text-[#81FB84] transition">{item.title}</Title>
              <Title level="title16" className="text-gray-400 font-normal text-sm leading-relaxed">{item.descript}</Title>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AdminDashboard;

