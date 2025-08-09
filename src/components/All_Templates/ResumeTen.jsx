import React, { useRef } from "react";
import html2pdf from "html2pdf.js";
import user from "../../assets/images/user.png";
import {
  FaPhoneAlt,
  FaLinkedin,
  FaMapMarkerAlt,
  FaEnvelope,
  FaXing,
} from "react-icons/fa";
const ResumeTen = () => {
  const resumeRef = useRef();

  const handleDownload = () => {
    const element = resumeRef.current;

    const opt = {
      margin: 0,
      filename: "alex-stevens-resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="min-h-screen  ">
      <div className="text-center mb-4">
        <button
          onClick={handleDownload}
          className="bg-black border text-white px-5 py-2 rounded hover:bg-gray-800 transition-all"
        >
          Download as PDF
        </button>
      </div>
      <div
        ref={resumeRef}
        className="bg-white text-black w-[210mm]  mx-auto  !urbanist"
      >
        {/* Body */}
        <div className="flex justify-between  w-full">
          {/* Left Column */}
          <div className="w-[40%] space-y-6 bg-[#1B1E2F]  text-white py-10 ">
            {/* Header */}
            <div className="w-[100px] h-[100px] mx-auto shrink-0">
              <img
                src={user}
                alt="Alex Stevens"
                className="w-full h-full object-cover rounded-full border border-[#D9D9D9]"
              />
            </div>
            <div>
              <div className="space-y-3 ">
                <h2 className="text-sm font-semibold tracking-[2px] mb-3  leading-[24px] bg-[#fff]/15 px-4 py-2 border-l-[5px] border-[#FECB00]">
                  CONTACT
                </h2>
                <div className="px-4 ">
                <p className="text-xs flex items-center gap-2 leading-[18px] ">
                  <FaPhoneAlt className="text-[12px] " />
                  +49 1512 3456789
                </p>
                <p className="text-xs flex items-center gap-2">
                  <FaMapMarkerAlt className="text-[12px]" />
                  Schillerstraße 22, 60313 Frankfurt am Main, Germany
                </p>
                <p className="text-xs flex items-center gap-2">
                  <FaEnvelope className="text-[12px]" />
                  alexstevens@gmail.com
                </p>
                <p className="text-xs flex items-center gap-2">
                  <FaLinkedin className="text-[12px]" />
                  linkedin.com/in/Alex-Stevens
                </p>
                <p className="text-xs flex items-center gap-2">
                  <FaXing className="text-[12px]" />
                  xing.com/profile/Alex-Stevens
                </p>

                </div>
              </div>
            </div>

            <div>
                <h2 className="text-sm font-semibold tracking-[2px] mb-3  leading-[24px] bg-[#fff]/15 px-4 py-2 border-l-[5px] border-[#FECB00]">
                TRAINING
              </h2>
              <div className="px-4">
                <p className="font-medium leading-[18px] text-xs">
                  Siemens Training Center, Berlin
                </p>
                <p className="text-xs leading-[18px] font-medium flex justify-between items-center">
                  Advanced Project Management Certification
                </p>
                <p className="text-xs leading-[20px]">
                  February 2021 – April 2021
                </p>
              </div>
              <div className="mt-4 px-4">
                <p className="font-medium leading-[18px] text-xs">
                  AP Academy, Walldorf
                </p>
                <p className="text-xs leading-[18px] font-medium flex justify-between items-center">
                  SAP ERP Implementation and Integration
                </p>
                <p className="text-xs leading-[20px]">
                  June 2019 – August 2019
                </p>
              </div>
            </div>
            <div>
                <h2 className="text-sm font-semibold tracking-[2px] mb-3  leading-[24px] bg-[#fff]/15 px-4 py-2 border-l-[5px] border-[#FECB00]">
                LANGUAGE
              </h2>
              <p className="text-xs flex justify-between items-center px-4">
                German <span>Native</span>
              </p>
              <p className="text-xs flex justify-between items-center mt-2 px-4">
                English <span>Fluent</span>{" "}
              </p>
            </div>
            <div className="flex flex-col justify-center">
                <h2 className="text-sm font-semibold tracking-[2px] mb-3  leading-[24px] bg-[#fff]/15 px-4 py-2 border-l-[5px] border-[#FECB00]">
                SKILL
              </h2>
              <ul className="text-xs space-y-3 list-disc list-inside px-4">
                <li>Project Management</li>
                <li>Time Management</li>
                <li>Team Leadership</li>
                <li>Communication Skills</li>
              </ul>
            </div>
          </div>
          {/* Right Column */}
          <div className="w-[60%] space-y-6 py-8 mt-8 ">
            <div className="bg-[#F7F7F7] px-4 py-5 border-l-[5px] border-[#FECB00]">
              <h2 className="text-2xl font-bold tracking-[0.5px] pb-3 text-[#0D0D0D] leading-[24px]">
                Project Manager
              </h2>
              <p className="text-2xl font-normal leading-[24px] text-[#171717]">
                Project Manager
              </p>
            </div>
            <div>
              <h2 className="text-sm font-semibold tracking-[2px] mb-3 text-[#0D0D0D] leading-[24px] bg-[#F7F7F7] px-4 py-2 border-l-[5px] border-[#FECB00]">
                ABOUT
              </h2>
              <p className="text-xs leading-[18px] text-[#171717] px-4">
                Experienced Senior Project Manager with over 10 years in the
                German tech industry. Specializing in agile methodologies,
                cross-functional team leadership, and delivering complex
                software solutions. Passionate about driving innovation and
                exceeding client expectations.
              </p>
            </div>

            <div className="flex flex-col  justify-center">
              <h2 className="text-sm font-semibold tracking-[2px] mb-3  leading-[24px] bg-[#F7F7F7] px-4 py-2 border-l-[5px] border-[#FECB00]">
                EDUCATION
              </h2>
              <div className="px-4">
                <p className="font-medium leading-[18px] text-xs">
                  Technische Universität München (TUM)
                </p>
                <p className="text-xs leading-[18px] font-medium flex justify-between items-center">
                  Master of Science in Computer Science
                </p>
                <p className="text-xs leading-[18px]">
                  October 2013 – September 2015
                </p>
              </div>
              <div className="mt-4 px-4">
                <p className="font-medium leading-[18px] text-xs">
                  Hochschule München University of Applied Sciences
                </p>
                <p className="text-xs leading-[18px] font-medium flex justify-between items-center">
                  Bachelor of Engineering in Information Technology
                </p>
                <p className="text-xs">October 2009 – September 2013</p>
              </div>
              <div className="mt-4 px-4">
                <p className="font-medium leading-[18px] text-xs">
                  Gymnasium Frankfurt West
                </p>
                <p className="text-xs leading-[18px] font-medium flex justify-between items-center">
                  Abitur (German High School Diploma)
                </p>
                <p className="text-xs">September 2000 – June 2008</p>
              </div>
            </div>
            <div>
            <h2 className="text-sm font-semibold tracking-[2px] mb-3  leading-[24px] bg-[#F7F7F7] px-4 py-2 border-l-[5px] border-[#FECB00]">
                EXPERIENCE
              </h2>
              <div className="px-4">
                <p className="font-medium leading-[18px] text-xs">
                  Senior Project Manager
                </p>
                <p className="text-xs leading-[18px] font-medium flex justify-between items-center">
                  Deutsche Digital Solutions GmbH, Berlin
                  <span>2018 – 2023</span>
                </p>
                <p className="text-xs leading-[20px] mt-2">
                  At Deutsche Digital Solutions GmbH, I led cross-functional
                  project teams of up to 15 members, managing software
                  development projects from concept through delivery.
                </p>
              </div>
              <div className="mt-4 px-4">
                <p className="font-medium leading-[18px] text-xs">
                  IT Project Coordinator
                </p>
                <p className="text-xs leading-[18px] font-medium flex justify-between items-center">
                  Bavaria Tech Systems AG, Munich <span>2015 – 2018</span>
                </p>
                <p className="text-xs leading-[20px] mt-2">
                  Assisted in planning and scheduling IT infrastructure projects
                  while maintaining smooth communication between technical teams
                  and clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeTen;
