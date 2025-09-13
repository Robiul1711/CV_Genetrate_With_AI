import React, { useRef } from "react";
import Image from "@/assets/images/cv8.png";
import { useResume } from "@/providers/ResumeContext";
import dayjs from "dayjs";
import html2pdf from "html2pdf.js";
import DownloadButton from "../common/DownloadButton";
import WaterMark from "@/assets/images/watermark.png";
import { useStatusCheck } from "../common/useStatusCheck";

const TitleSection = ({ name }) => {
  return (
    <h2 className=" bg-[#FFFFFF] -ml-4 uppercase  rounded-tr-[16px] py-1.5 w-[140px] flex justify-center items-center text-base  text-[#0D0D0D] font-semibold leading-[20px] traking-[2px]">
      {name}
    </h2>
  );
};

const TitleSection2 = ({ name }) => {
  return (
    <h2 className=" bg-[#FFFFFF] uppercase  absolute top-4 right-0   rounded-tl-[16px] py-1.5 w-[120px] flex justify-center items-center text-base  text-[#0D0D0D] font-semibold leading-[20px] traking-[2px]">
      {name}
    </h2>
  );
};

export const SectionArea = ({ children }) => {
  return (
    <div className=" bg-[#1F1F1F]  rounded-t-[16px] rounded-bl-[16px] px-4 pb-2 pt-4 relative">
      {children}
    </div>
  );
};

const ResumeEight = () => {
  const VITE_IMG_URL = import.meta.env.VITE_IMG_URL;
  const { allRedumeData } = useResume();
  const resumeData = allRedumeData?.data || [];

  const { data: status } = useStatusCheck();
    const resumeRef = useRef();
  
 

  return (
    <div className=" min-h-screen">

         <DownloadButton resumeRef={resumeRef}  />

      <div ref={resumeRef} className=" flex relative flex-col bg-[#404040] gap-3 w-[210mm] h-[297mm] mx-auto mt-10">
         {status?.water_mark && (
          <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
            <img
              src={WaterMark}
              className="max-w-full max-h-full object-contain z-[100]"
            />
          </div>
        )}
      <header
        className={` bg-[#1F1F1F] pl-[153px] relative  pt-[34px] pb-4 pr-[172px] w-full`}
      >
        <div className=" flex flex-col gap-2 justify-end items-end w-full">
          <p className=" text-[32px] font-[800] !urbanist traking-[4px] leading-[30px] text-[#FFC805] ">
            {resumeData?.first_name} {resumeData?.last_name}
          </p>
          <p className=" text-[#D7D7D7] !urbanist text-sm font-medium capitalize leading-[20px] traking-[1px]">
            {resumeData?.job_title}
          </p>
        </div>

        <img
          src={VITE_IMG_URL + resumeData?.profile_photo || Image}
          className=" absolute top-4 right-4 z-50 w-[140px] h-[140px] "
        />
      </header>

      <div className=" flex gap-3 w-full h-full p-3">
        <div className=" flex flex-col  gap-3 w-[75%]">
          <SectionArea>
            <div className=" flex flex-col gap-1">
              <TitleSection name={allRedumeData?.data?.resume_language === "en" ? "About Me" : "Über mich"} />
              <p className=" text-xs  text-white font-normal leading-[18px] !urbanist">
                {resumeData?.about}
              </p>
            </div>
          </SectionArea>
{
  resumeData.work_experiences?.length > 0 &&(
    
          <SectionArea>
            <div className=" flex flex-col gap-2">
              <TitleSection name={allRedumeData?.data?.resume_language === "en" ? "Work Experience" : "Arbeitszeit"} />
              <div className=" flex flex-col gap-2 w-full">
                {resumeData?.work_experiences &&
                  resumeData.work_experiences.map((experience, index) => (
                    <div
                      key={index}
                      className=" flex flex-row gap-2 items-start"
                    >
                      <div className=" w-[117px] flex flex-col gap-2">
                        <p className="text-white !urbanist text-xs font-medium leading-[15px] ">
                          {experience?.company_name}
                        </p>
                        <p className="text-white !urbanist text-xs font-normal leading-[15px]">
                          {dayjs(experience?.start_date).format("YYYY")} –{" "}
                          {dayjs(experience?.end_date).format("YYYY")}
                        </p>
                      </div>
                      <div className=" flex-1  flex-col gap-2">
                        <p className=" text-sm font-semibold leading-[18px]  !text-[#FECB00] !urbanist">
                          {experience?.job_title}
                        </p>
                        <p className=" text-xs  text-white font-normal leading-[18px] !urbanist">
                          {experience?.responsibilities}
                        </p>
                      </div>
                    </div>
                  ))}

                {/* <div className=" flex flex-row gap-2">
                  <div className=" w-[117px] flex flex-col gap-2">
                    <p className="text-white !urbanist text-xs font-medium leading-[15px] ">
                      Deutsche Digital Solutions GmbH,Berlin
                    </p>
                    <p className="text-white !urbanist text-xs font-normal leading-[15px]">
                      2018 – 2023
                    </p>
                  </div>
                  <div className=" flex flex-1  flex-col gap-2">
                    <p className=" text-sm font-semibold leading-[18px]  !text-[#FECB00] !urbanist">
                      Senior Project Manager
                    </p>
                    <p className=" text-xs  text-white font-normal leading-[18px] !urbanist">
                      At Deutsche Digital Solutions GmbH, I led cross-functional
                      project teams of up to 15 members, managing software
                      development projects from concept through delivery.
                    </p>
                  </div>
                </div>
                <div className=" flex flex-row gap-2">
                  <div className=" w-[117px] flex flex-col gap-2">
                    <p className="text-white !urbanist text-xs font-medium leading-[15px] ">
                      Bavaria Tech Systems AG, Munich
                    </p>
                    <p className="text-white !urbanist text-xs font-normal leading-[15px]">
                      2015 – 2018
                    </p>
                  </div>
                  <div className=" flex flex-1  flex-col gap-2">
                    <p className=" text-sm font-semibold leading-[18px]  !text-[#FECB00] !urbanist">
                      IT Project Coordinator
                    </p>
                    <p className=" text-xs  text-white font-normal leading-[18px] !urbanist">
                      At Bavaria Tech Systems AG, I assisted in planning and
                      scheduling IT infrastructure projects while maintaining
                      smooth communication between technical teams and clients
                    </p>
                  </div>
                </div> */}
              </div>
            </div>
          </SectionArea>
  )
}

          <SectionArea>
            <div className=" flex flex-col gap-2">
              <TitleSection name={allRedumeData?.data?.resume_language === "en" ? "Skills" : "Fähigkeiten"} />
              <div className=" grid grid-cols-2  gap-2">
                {resumeData?.skills &&
                  resumeData.skills.map((skill, index) => (
                    <div
                      key={index}
                      className=" flex gap-2 items-center justify-between"
                    >
                      <p className="text-xs  text-white font-normal leading-[18px] !urbanist">
                        {skill?.skill}
                      </p>
                      <div className=" flex-1 rounded-[16px] bg-[#FECB00] h-1"></div>
                    </div>
                  ))}
              </div>
            </div>
          </SectionArea>

          <SectionArea>
            <div className=" flex flex-col gap-2">
              <TitleSection name={allRedumeData?.data?.resume_language === "en" ? "Languages" : "Sprachen"} />

              <div className=" grid grid-cols-2">
                {resumeData?.languages &&
                  resumeData.languages.map((language, index) => (
                    <div
                      key={index}
                      className=" flex gap-2 items-center justify-between"
                    >
                      <p className="text-xs pl-4 pr-6  text-white font-normal leading-[18px] !urbanist">
                        {language?.language}
                      </p>
                      <p className="text-xs  text-white font-normal leading-[18px] !urbanist">
                        {language?.level}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </SectionArea>

          <SectionArea>
            <div className=" flex flex-col gap-2">
              <TitleSection name={allRedumeData?.data?.resume_language === "en" ? "Trainings" : "Trainings"} />

              <div className=" grid gap-1 grid-cols-1">
                {resumeData?.courses_and_training_details &&
                  resumeData.courses_and_training_details.map(
                    (training, index) => (
                      <div key={index} className=" flex  gap-2">
                        <div className=" flex flex-col gap-1 w-[171px]">
                          <p className=" text-xs text-white leading-[15px] font-medium !urbanist">
                            {training?.name_of_institute}
                          </p>
                          <p className="text-[10px] text-white  font-normal !urbanist">
                            {training?.start_date} - {training?.end_date}
                          </p>
                        </div>
                        <p className=" !urbanist text-xs w-[144px] text-[#FECB00] font-semibold leading-[18px]">
                          {training?.course_name}
                        </p>
                      </div>
                    )
                  )}
                {/* <div className=" flex  gap-2">
                  <div className=" flex flex-col gap-1 w-[171px]">
                    <p className=" text-xs text-white leading-[15px] font-medium !urbanist">
                      Siemens Training Centre, Berlin
                    </p>
                    <p className="text-[10px] text-white  font-normal !urbanist">
                      February 2021 – April 2021
                    </p>
                  </div>
                  <p className=" !urbanist text-xs w-[144px] text-[#FECB00] font-semibold leading-[18px]">
                    Advanced Project Management Certification
                  </p>
                </div>
                <div className=" flex  gap-2">
                  <div className=" flex flex-col gap-1 w-[171px]">
                    <p className=" text-xs text-white leading-[15px] font-medium !urbanist">
                      AP Academy, Walldorf
                    </p>
                    <p className="text-[10px] text-white  font-normal !urbanist">
                      June 2019 – August 2019
                    </p>
                  </div>
                  <p className=" !urbanist text-xs w-[144px] text-[#FECB00] font-semibold leading-[18px]">
                    SAP ERP Implementation and Integration
                  </p>
                </div> */}
              </div>
            </div>
          </SectionArea>
        </div>

        <div className=" w-[25%] mt-8 flex flex-col gap-3">
          <SectionArea>
            <div className=" flex flex-col gap-2">
              <TitleSection2 name={allRedumeData?.data?.resume_language === "en" ? "Education" : "Ausbildung"} />
            </div>
            <div className=" grid  gap-2 mt-9">
              {resumeData?.educations &&
                resumeData.educations.map((education, index) => (
                  <div className=" flex flex-col gap-1">
                    <p className=" text-[10px] text-white !urbanist leading-[15px] font-normal">
                      {dayjs(education?.start_date).format("YYYY")} –{" "}
                      {dayjs(education?.end_date).format("YYYY")}
                    </p>
                    <p className="text-[#FECB00] text-xs leading-[18px] font-semibold">
                      {education?.degree}
                    </p>
                    <p className=" !urbanist text-xs leading-[18px] font-medium text-white">
                      {education?.institute_name}
                    </p>
                  </div>
                ))}
            </div>
          </SectionArea>

          <SectionArea>
            <div className=" flex flex-col gap-2">
              <TitleSection2 name={allRedumeData?.data?.resume_language === "en" ? "Contact" : "Kontakt"} />

              <div className=" grid  gap-2 mt-9">
                <div className=" flex flex-col gap-1">
                  <p className=" text-[#FECB00] text-xs font-semibold leading-[18px] !urbanist uppercase">
                    {allRedumeData?.data?.resume_language === "en"
                      ? "Phone"
                      : "Telefon"}
                  </p>
                  <p className=" text-[10px] font-normal leading-[16px] text-white !urbanist">
                    {resumeData?.phone_number}
                  </p>
                </div>
                <div className=" flex flex-col gap-1">
                  <p className=" text-[#FECB00] text-xs font-semibold leading-[18px] !urbanist uppercase">
                    {allRedumeData?.data?.resume_language === "en"
                      ? "Location"
                      : "Standort"}
                  </p>
                  <p className=" text-[10px] font-normal leading-[16px] text-white !urbanist">
                    {resumeData?.address}
                  </p>
                </div>
                <div className=" flex flex-col gap-1">
                  <p className=" text-[#FECB00] text-xs font-semibold leading-[18px] !urbanist uppercase">
                   {allRedumeData?.data?.resume_language === "en" ? "Email" : "E-Mail"}
                  </p>
                  <p className=" text-[10px] font-normal leading-[16px] text-white !urbanist">
                    {resumeData?.email}
                  </p>
                </div>
                <div className=" flex flex-col gap-1">
                  <p className=" text-[#FECB00] text-xs font-semibold leading-[18px] !urbanist uppercase">
                    {allRedumeData?.data?.resume_language === "en"
                      ? "Linkedin"
                      : "Linkedin"}
                  </p>
                  <a
                    href={resumeData?.linked_in_profile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-normal leading-[16px] text-white !urbanist break-words underline uppercase"
                  >
                    {resumeData?.linked_in_profile}
                  </a>
                </div>
                <div className=" flex flex-col gap-1">
                  <p className=" text-[#FECB00] text-xs font-semibold leading-[18px] !urbanist uppercase">
                   {allRedumeData?.data?.resume_language === "en" ? "Xing" : "Xing"}
                  </p>
                  <a
                    href={resumeData?.xing_profile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-normal leading-[16px] text-white !urbanist break-words underline "
                  >
                    {resumeData?.xing_profile}
                  </a>
                </div>
              </div>
            </div>
          </SectionArea>
        </div>
      </div>
    </div>

    </div>
  );
};

export default ResumeEight;
