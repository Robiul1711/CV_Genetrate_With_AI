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
import { useEmail } from "@/hooks/useEmail"; // assuming it provides { language }
import { useStatusCheck } from "@/components/common/useStatusCheck";

const AdminDashboard = () => {
  const { language } = useEmail(); 

    const { data: status } = useStatusCheck();


      const createResumePath =
    status?.has_subscription === false
      ? "/price"
      : "/dashboard/create-new-resume";
  const updateResumePath =
    status?.has_subscription === false
      ? "/price"
      : "/dashboard/update-existing-resume";
  const coverLetterPath =
    status?.has_subscription === false && status?.cover_letter === false
      ? "/price"
      : "/dashboard/create-cover-letter";

  const data = [
    {
      id: 1,
      title: language === "de" ? "Neuen Lebenslauf erstellen" : "Create New Resume",
      descript:
        language === "de"
          ? "Lassen Sie die KI einen erfolgreichen Lebenslauf von Grund auf erstellen."
          : "Let AI help you craft a job-winning resume from zero",
      icons: <CreateNewResumeIcon />,
      link: createResumePath,
    },
    {
      id: 2,
      title: language === "de" ? "Vorhandenen Lebenslauf aktualisieren" : "Update Existing Resume",
      descript:
        language === "de"
          ? "Laden Sie Ihren aktuellen Lebenslauf hoch, und die KI verbessert ihn für den Erfolg."
          : "Upload your current resume and let AI enhance it for success.",
      icons: <UpdateExistingResumeIcon />,
      link: updateResumePath,
    },
    {
      id: 3,
      title: language === "de" ? "Anschreiben erstellen" : "Create Cover Letter",
      descript:
        language === "de"
          ? "Personalisierte Anschreiben, abgestimmt auf Ihren Lebenslauf und die Zielstelle."
          : "Personalized letters matched to your resume and target job.",
      icons: <CreateCoverLetterIcon />,
      link: coverLetterPath,
    },
  ];

  return (
    <div>
      <div className="bg-[#0E0E10] p-5 rounded-[8px] flex gap-6 justify-around">
        <div className="flex flex-col gap-6 px-4">
          <div className="flex items-center text-sm gap-4">
            <Title level="title28">
              {language === "de"
                ? "Willkommen in Ihrem Cleveres Lebenslauf-Dashboard!"
                : "Welcome to Your Clever CV Dashboard!"}
            </Title>
            <img src={hi} alt="" />
          </div>
          <Title level="title20">
            {language === "de"
              ? "Erstellen, Optimieren, Beeindrucken – Ihren Traumjob finden – alles auf einer intelligenten Plattform."
              : "Craft, Optimize, Impress, Land Your Dream Job — All in One Smart Platform"}
          </Title>
        </div>
        <div className="hidden md:block px-4">
          <img src={dashboard} alt="" className="w-full size-32 xl:size-48" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 xl:gap-6 mt-4 xl:mt-6">
        {data.map((item) => (
          <Link
            to={item.link}
            key={item.id}
            className="bg-[#0E0E10] p-4 xl:p-10 rounded-[16px] flex flex-col gap-3 xl:gap-6 items-center text-center justify-center"
          >
            <span>{item.icons}</span>
            <Title level="title32">{item.title}</Title>
            <Title level="title16">{item.descript}</Title>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
