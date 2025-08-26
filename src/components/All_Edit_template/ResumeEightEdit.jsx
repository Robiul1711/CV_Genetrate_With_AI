// import React, { useEffect, useRef, useState } from "react";
// import Image from "@/assets/images/cv8.png";
// import { useResume } from "@/providers/ResumeContext";
// import { useFormContext } from "react-hook-form";
// import dayjs from "dayjs";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import DownloadButton from "../common/DownloadButton";

// const TitleSection = ({ name }) => {
//   return (
//     <h2 className="bg-[#FFFFFF] -ml-4 rounded-tr-[16px] py-1.5 w-[140px] flex justify-center items-center text-base text-[#0D0D0D] font-semibold leading-[20px] tracking-[2px]">
//       {name}
//     </h2>
//   );
// };

// const TitleSection2 = ({ name }) => {
//   return (
//     <h2 className="bg-[#FFFFFF] absolute top-4 right-0 rounded-tl-[16px] py-1.5 w-[120px] flex justify-center items-center text-base text-[#0D0D0D] font-semibold leading-[20px] tracking-[2px]">
//       {name}
//     </h2>
//   );
// };

// const SectionArea = ({ children }) => {
//   return (
//     <div className="bg-[#1F1F1F] rounded-t-[16px] rounded-bl-[16px] px-4 pb-2 pt-4 relative">
//       {children}
//     </div>
//   );
// };

// const ResumeEightEdit = () => {
//   const VITE_IMG_URL = import.meta.env.VITE_IMG_URL;
//   const { allRedumeData } = useResume();
//   const { watch } = useFormContext();
//   const formData = watch();
//   const [profilePreview, setProfilePreview] = useState(Image);

//   // Merge form and context data
//   const resumeData = {
//     first_name: formData?.first_name || allRedumeData?.data?.first_name || "",
//     last_name: formData?.last_name || allRedumeData?.data?.last_name || "",
//     job_title: formData?.job_title || allRedumeData?.data?.job_title || "",
//     about: formData?.about || allRedumeData?.data?.about || "",
//     profile_photo:
//       formData?.profile_photo || allRedumeData?.data?.profile_photo || "",
//     phone_number:
//       formData?.phone_number || allRedumeData?.data?.phone_number || "",
//     email: formData?.email || allRedumeData?.data?.email || "",
//     address: formData?.address || allRedumeData?.data?.address || "",
//     linked_in_profile:
//       formData?.linked_in_profile ||
//       allRedumeData?.data?.linked_in_profile ||
//       "",
//     xing_profile:
//       formData?.xing_profile || allRedumeData?.data?.xing_profile || "",
//     educations: formData?.educations || allRedumeData?.data?.educations || [],
//     skills: formData?.skills || allRedumeData?.data?.skills || [],
//     languages: formData?.languages || allRedumeData?.data?.languages || [],
//     work_experiences:
//       formData?.work_experiences ||
//       allRedumeData?.data?.work_experiences ||
//       [],
//     courses_and_training_details:
//       formData?.courses_and_training_details ||
//       allRedumeData?.data?.courses_and_training_details ||
//       [],
//   };

//   // Set profile preview
//   useEffect(() => {
//     if (formData?.profile_photo && !formData.profile_photo.startsWith("/media")) {
//       setProfilePreview(formData.profile_photo);
//     } else if (resumeData.profile_photo) {
//       setProfilePreview(VITE_IMG_URL + resumeData.profile_photo);
//     } else {
//       setProfilePreview(Image);
//     }
//   }, [formData?.profile_photo, resumeData.profile_photo]);

//     const resumeRef = useRef();

    
  
 
//   return (
//    <div className=" min-h-screen">
//    <DownloadButton resumeRef={resumeRef} />
//  <div ref={resumeRef} className="flex flex-col bg-[#404040] gap-3 w-[210mm] mx-auto mt-10 ">
//       {/* Header */}
//       <header className="bg-[#1F1F1F] pl-[153px] relative pt-[34px] pb-4 pr-[172px] w-full">
//         <div className="flex flex-col gap-2 justify-end items-end w-full">
//           <p className="text-[32px] font-[800] !urbanist tracking-[4px] leading-[30px] text-[#FFC805]">
//             {resumeData.first_name} {resumeData.last_name}
//           </p>
//           <p className="text-[#D7D7D7] !urbanist text-sm font-medium capitalize leading-[20px] tracking-[1px]">
//             {resumeData.job_title}
//           </p>
//         </div>
//         <img
//           src={profilePreview}
//           alt="Profile"
//           className="absolute top-4 right-4 z-50 w-[140px] h-[140px]"
//         />
//       </header>

//       <div className="flex gap-3 w-full p-3">
//         {/* Left Column */}
//         <div className="flex flex-col justify-between gap-3 w-[75%]">
//           {/* Profile */}
//           <SectionArea>
//             <div className="flex flex-col gap-1">
//               <TitleSection name="Profile" />
//               <p className="text-xs text-white font-normal leading-[18px] !urbanist">
//                 {resumeData.about}
//               </p>
//             </div>
//           </SectionArea>

//           {/* Experience */}
//           <SectionArea>
//             <div className="flex flex-col gap-2">
//               <TitleSection name="Experience" />
//               <div className="flex flex-col gap-2 w-full">
//                 {resumeData.work_experiences.map((exp, i) => (
//                   <div key={i} className="flex flex-row gap-2 items-start">
//                     <div className="w-[117px] flex flex-col gap-2">
//                       <p className="text-white !urbanist text-xs font-medium leading-[15px]">
//                         {exp.company_name}
//                       </p>
//                       <p className="text-white !urbanist text-xs font-normal leading-[15px]">
//                         {dayjs(exp.start_date).format("YYYY")} –{" "}
//                         {exp.end_date
//                           ? dayjs(exp.end_date).format("YYYY")
//                           : "Present"}
//                       </p>
//                     </div>
//                     <div className="flex-1 flex-col gap-2">
//                       <p className="text-sm font-semibold leading-[18px] !text-[#FECB00] !urbanist">
//                         {exp.job_title}
//                       </p>
//                       <p className="text-xs text-white font-normal leading-[18px] !urbanist">
//                         {exp.responsibilities}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </SectionArea>

//           {/* Skills */}
//           <SectionArea>
//             <div className="flex flex-col gap-2">
//               <TitleSection name="Skills" />
//               <div className="grid grid-cols-2 gap-2">
//                 {resumeData.skills.map((skill, i) => (
//                   <div
//                     key={i}
//                     className="flex gap-2 items-center justify-between"
//                   >
//                     <p className="text-xs text-white font-normal leading-[18px] !urbanist">
//                       {skill.skill}
//                     </p>
//                     <div className="flex-1 rounded-[16px] bg-[#FECB00] h-1"></div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </SectionArea>

//           {/* Languages */}
//           <SectionArea>
//             <div className="flex flex-col gap-2">
//               <TitleSection name="Language" />
//               <div className="grid grid-cols-2">
//                 {resumeData.languages.map((lang, i) => (
//                   <div
//                     key={i}
//                     className="flex gap-2 items-center justify-between"
//                   >
//                     <p className="text-xs pl-4 pr-6 text-white font-normal leading-[18px] !urbanist">
//                       {lang.language}
//                     </p>
//                     <p className="text-xs text-white font-normal leading-[18px] !urbanist">
//                       {lang.level}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </SectionArea>

//           {/* Training */}
//           <SectionArea>
//             <div className="flex flex-col gap-2">
//               <TitleSection name="Training" />
//               <div className="grid gap-1 grid-cols-1">
//                 {resumeData.courses_and_training_details.map((training, i) => (
//                   <div key={i} className="flex gap-2">
//                     <div className="flex flex-col gap-1 w-[171px]">
//                       <p className="text-xs text-white leading-[15px] font-medium !urbanist">
//                         {training.name_of_institute}
//                       </p>
//                       <p className="text-[10px] text-white font-normal !urbanist">
//                         {training.start_date} - {training.end_date}
//                       </p>
//                     </div>
//                     <p className="!urbanist text-xs w-[144px] text-[#FECB00] font-semibold leading-[18px]">
//                       {training.course_name}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </SectionArea>
//         </div>

//         {/* Right Column */}
//         <div className="w-[25%] mt-8 flex flex-col gap-3">
//           {/* Education */}
//           <SectionArea>
//             <div className="flex flex-col gap-2">
//               <TitleSection2 name="Education" />
//             </div>
//             <div className="grid gap-2 mt-9">
//               {resumeData.educations.map((edu, i) => (
//                 <div key={i} className="flex flex-col gap-1">
//                   <p className="text-[10px] text-white !urbanist leading-[15px] font-normal">
//                     {dayjs(edu.start_date).format("YYYY")} –{" "}
//                     {dayjs(edu.end_date).format("YYYY")}
//                   </p>
//                   <p className="text-[#FECB00] text-xs leading-[18px] font-semibold">
//                     {edu.degree}
//                   </p>
//                   <p className="!urbanist text-xs leading-[18px] font-medium text-white">
//                     {edu.institute_name}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </SectionArea>

//           {/* Contact */}
//           <SectionArea>
//             <div className="flex flex-col gap-2">
//               <TitleSection2 name="Contact" />
//               <div className="grid gap-2 mt-9">
//                 <div className="flex flex-col gap-1">
//                   <p className="text-[#FECB00] text-xs font-semibold leading-[18px] !urbanist">
//                     Phone
//                   </p>
//                   <p className="text-[10px] font-normal leading-[16px] text-white !urbanist">
//                     {resumeData.phone_number}
//                   </p>
//                 </div>
//                 <div className="flex flex-col gap-1">
//                   <p className="text-[#FECB00] text-xs font-semibold leading-[18px] !urbanist">
//                     Location
//                   </p>
//                   <p className="text-[10px] font-normal leading-[16px] text-white !urbanist">
//                     {resumeData.address}
//                   </p>
//                 </div>
//                 <div className="flex flex-col gap-1">
//                   <p className="text-[#FECB00] text-xs font-semibold leading-[18px] !urbanist">
//                     E-mail
//                   </p>
//                   <p className="text-[10px] font-normal leading-[16px] text-white !urbanist">
//                     {resumeData.email}
//                   </p>
//                 </div>
//                 {resumeData.linked_in_profile && (
//                   <div className="flex flex-col gap-1">
//                     <p className="text-[#FECB00] text-xs font-semibold leading-[18px] !urbanist">
//                       Linked-in
//                     </p>
//                     <a
//                       href={resumeData.linked_in_profile}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-[10px] font-normal leading-[16px] text-white !urbanist break-words underline"
//                     >
//                       {resumeData.linked_in_profile}
//                     </a>
//                   </div>
//                 )}
//                 {resumeData.xing_profile && (
//                   <div className="flex flex-col gap-1">
//                     <p className="text-[#FECB00] text-xs font-semibold leading-[18px] !urbanist">
//                       Xing
//                     </p>
//                     <a
//                       href={resumeData.xing_profile}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-[10px] font-normal leading-[16px] text-white !urbanist break-words underline"
//                     >
//                       {resumeData.xing_profile}
//                     </a>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </SectionArea>
//         </div>
//       </div>
//     </div>
//    </div>
//   );
// };

// export default ResumeEightEdit;


import React, { useEffect, useRef, useState } from "react";
import Image from "@/assets/images/cv8.png";
import { useResume } from "@/providers/ResumeContext";
import { useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const TitleSection = ({ name }) => {
  return (
    <h2 style={{
      backgroundColor: "#FFFFFF",
      marginLeft: "-16px",
      borderTopRightRadius: "16px",
      padding: "6px 0",
      width: "140px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "16px",
      color: "#0D0D0D",
      fontWeight: "600",
      lineHeight: "20px",
      letterSpacing: "2px",
      marginBottom: "8px"
    }}>
      {name}
    </h2>
  );
};

const TitleSection2 = ({ name }) => {
  return (
    <h2 style={{
      backgroundColor: "#FFFFFF",
      position: "absolute",
      top: "16px",
      right: "0",
      borderTopLeftRadius: "16px",
      padding: "6px 0",
      width: "120px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "16px",
      color: "#0D0D0D",
      fontWeight: "600",
      lineHeight: "20px",
      letterSpacing: "2px"
    }}>
      {name}
    </h2>
  );
};

const SectionArea = ({ children }) => {
  return (
    <div style={{
      backgroundColor: "#1F1F1F",
      borderTopLeftRadius: "16px",
      borderTopRightRadius: "16px",
      borderBottomLeftRadius: "16px",
      padding: "16px",
      paddingTop: "32px",
      position: "relative",
      marginBottom: "12px"
    }}>
      {children}
    </div>
  );
};

const ResumeEightEdit = () => {
  const VITE_IMG_URL = import.meta.env.VITE_IMG_URL;
  const { allRedumeData } = useResume();
  const { watch } = useFormContext();
  const formData = watch();
  const [profilePreview, setProfilePreview] = useState(Image);
  const resumeRef = useRef();

  // Merge form and context data
  const resumeData = {
    first_name: formData?.first_name || allRedumeData?.data?.first_name || "",
    last_name: formData?.last_name || allRedumeData?.data?.last_name || "",
    job_title: formData?.job_title || allRedumeData?.data?.job_title || "",
    about: formData?.about || allRedumeData?.data?.about || "",
    profile_photo:
      formData?.profile_photo || allRedumeData?.data?.profile_photo || "",
    phone_number:
      formData?.phone_number || allRedumeData?.data?.phone_number || "",
    email: formData?.email || allRedumeData?.data?.email || "",
    address: formData?.address || allRedumeData?.data?.address || "",
    linked_in_profile:
      formData?.linked_in_profile ||
      allRedumeData?.data?.linked_in_profile ||
      "",
    xing_profile:
      formData?.xing_profile || allRedumeData?.data?.xing_profile || "",
    educations: formData?.educations || allRedumeData?.data?.educations || [],
    skills: formData?.skills || allRedumeData?.data?.skills || [],
    languages: formData?.languages || allRedumeData?.data?.languages || [],
    work_experiences:
      formData?.work_experiences ||
      allRedumeData?.data?.work_experiences ||
      [],
    courses_and_training_details:
      formData?.courses_and_training_details ||
      allRedumeData?.data?.courses_and_training_details ||
      [],
  };

  // Set profile preview
  useEffect(() => {
    if (formData?.profile_photo && !formData.profile_photo.startsWith("/media")) {
      setProfilePreview(formData.profile_photo);
    } else if (resumeData.profile_photo) {
      setProfilePreview(VITE_IMG_URL + resumeData.profile_photo);
    } else {
      setProfilePreview(Image);
    }
  }, [formData?.profile_photo, resumeData.profile_photo]);

  const downloadPDF = () => {
    const input = resumeRef.current;
    html2canvas(input, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#404040"
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resumeData.first_name}_${resumeData.last_name}_resume.pdf`);
    });
  };

  return (
    <div style={{ padding: "20px", minHeight: "100vh" }}>
      <button
      type="button"
        onClick={downloadPDF}
        style={{
          padding: "10px 20px",
          backgroundColor: "#FFC805",
          color: "#000",
          border: "none",
          borderRadius: "4px",
          fontWeight: "bold",
          cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        Download PDF
      </button>
      
      <div ref={resumeRef} style={{
        width: "210mm",
        minHeight: "297mm",
        margin: "0 auto",
        backgroundColor: "#404040",
        padding: "12px",
        boxSizing: "border-box",
        fontFamily: "'Urbanist', sans-serif"
      }}>
        {/* Header */}
        <header style={{
          backgroundColor: "#1F1F1F",
          paddingLeft: "153px",
          position: "relative",
          paddingTop: "34px",
          paddingBottom: "16px",
          paddingRight: "172px",
          width: "100%",
          boxSizing: "border-box"
        }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            width: "100%"
          }}>
            <p style={{
              fontSize: "32px",
              fontWeight: "800",
              letterSpacing: "4px",
              lineHeight: "30px",
              color: "#FFC805",
              margin: "0",
              fontFamily: "'Urbanist', sans-serif"
            }}>
              {resumeData.first_name} {resumeData.last_name}
            </p>
            <p style={{
              color: "#D7D7D7",
              fontSize: "14px",
              fontWeight: "500",
              textTransform: "capitalize",
              lineHeight: "20px",
              letterSpacing: "1px",
              margin: "0",
              fontFamily: "'Urbanist', sans-serif"
            }}>
              {resumeData.job_title}
            </p>
          </div>
          <img
            src={profilePreview}
            alt="Profile"
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              zIndex: "50",
              width: "140px",
              height: "140px",
              objectFit: "cover"
            }}
          />
        </header>

        <div style={{
          display: "flex",
          gap: "12px",
          width: "100%",
          padding: "12px",
          boxSizing: "border-box"
        }}>
          {/* Left Column */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "12px",
            width: "75%"
          }}>
            {/* Profile */}
            <SectionArea>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <TitleSection name="Profile" />
                <p style={{
                  fontSize: "12px",
                  color: "white",
                  fontWeight: "normal",
                  lineHeight: "18px",
                  margin: "0",
                  fontFamily: "'Urbanist', sans-serif"
                }}>
                  {resumeData.about}
                </p>
              </div>
            </SectionArea>

            {/* Experience */}
            <SectionArea>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <TitleSection name="Experience" />
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
                  {resumeData.work_experiences.map((exp, i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "row", gap: "8px", alignItems: "flex-start" }}>
                      <div style={{ width: "117px", display: "flex", flexDirection: "column", gap: "4px" }}>
                        <p style={{
                          color: "white",
                          fontSize: "12px",
                          fontWeight: "500",
                          lineHeight: "15px",
                          margin: "0",
                          fontFamily: "'Urbanist', sans-serif"
                        }}>
                          {exp.company_name}
                        </p>
                        <p style={{
                          color: "white",
                          fontSize: "12px",
                          fontWeight: "normal",
                          lineHeight: "15px",
                          margin: "0",
                          fontFamily: "'Urbanist', sans-serif"
                        }}>
                          {dayjs(exp.start_date).format("YYYY")} –{" "}
                          {exp.end_date
                            ? dayjs(exp.end_date).format("YYYY")
                            : "Present"}
                        </p>
                      </div>
                      <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "4px" }}>
                        <p style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          lineHeight: "18px",
                          color: "#FECB00",
                          margin: "0",
                          fontFamily: "'Urbanist', sans-serif"
                        }}>
                          {exp.job_title}
                        </p>
                        <p style={{
                          fontSize: "12px",
                          color: "white",
                          fontWeight: "normal",
                          lineHeight: "18px",
                          margin: "0",
                          fontFamily: "'Urbanist', sans-serif"
                        }}>
                          {exp.responsibilities}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionArea>

            {/* Skills */}
            <SectionArea>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <TitleSection name="Skills" />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  {resumeData.skills.map((skill, i) => (
                    <div
                      key={i}
                      style={{ display: "flex", gap: "8px", alignItems: "center", justifyContent: "space-between" }}
                    >
                      <p style={{
                        fontSize: "12px",
                        color: "white",
                        fontWeight: "normal",
                        lineHeight: "18px",
                        margin: "0",
                        fontFamily: "'Urbanist', sans-serif"
                      }}>
                        {skill.skill}
                      </p>
                      <div style={{ flex: "1", borderRadius: "16px", backgroundColor: "#FECB00", height: "4px" }}></div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionArea>

            {/* Languages */}
            <SectionArea>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <TitleSection name="Language" />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                  {resumeData.languages.map((lang, i) => (
                    <div
                      key={i}
                      style={{ display: "flex", gap: "8px", alignItems: "center", justifyContent: "space-between" }}
                    >
                      <p style={{
                        fontSize: "12px",
                        paddingLeft: "16px",
                        paddingRight: "24px",
                        color: "white",
                        fontWeight: "normal",
                        lineHeight: "18px",
                        margin: "0",
                        fontFamily: "'Urbanist', sans-serif"
                      }}>
                        {lang.language}
                      </p>
                      <p style={{
                        fontSize: "12px",
                        color: "white",
                        fontWeight: "normal",
                        lineHeight: "18px",
                        margin: "0",
                        fontFamily: "'Urbanist', sans-serif"
                      }}>
                        {lang.level}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </SectionArea>

            {/* Training */}
            <SectionArea>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <TitleSection name="Training" />
                <div style={{ display: "grid", gap: "4px", gridTemplateColumns: "1fr" }}>
                  {resumeData.courses_and_training_details.map((training, i) => (
                    <div key={i} style={{ display: "flex", gap: "8px" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: "171px" }}>
                        <p style={{
                          fontSize: "12px",
                          color: "white",
                          lineHeight: "15px",
                          fontWeight: "500",
                          margin: "0",
                          fontFamily: "'Urbanist', sans-serif"
                        }}>
                          {training.name_of_institute}
                        </p>
                        <p style={{
                          fontSize: "10px",
                          color: "white",
                          fontWeight: "normal",
                          margin: "0",
                          fontFamily: "'Urbanist', sans-serif"
                        }}>
                          {training.start_date} - {training.end_date}
                        </p>
                      </div>
                      <p style={{
                        fontFamily: "'Urbanist', sans-serif",
                        fontSize: "12px",
                        width: "144px",
                        color: "#FECB00",
                        fontWeight: "600",
                        lineHeight: "18px",
                        margin: "0"
                      }}>
                        {training.course_name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </SectionArea>
          </div>

          {/* Right Column */}
          <div style={{ width: "25%", marginTop: "32px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {/* Education */}
            <SectionArea>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <TitleSection2 name="Education" />
              </div>
              <div style={{ display: "grid", gap: "8px", marginTop: "36px" }}>
                {resumeData.educations.map((edu, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <p style={{
                      fontSize: "10px",
                      color: "white",
                      fontFamily: "'Urbanist', sans-serif",
                      lineHeight: "15px",
                      fontWeight: "normal",
                      margin: "0"
                    }}>
                      {dayjs(edu.start_date).format("YYYY")} –{" "}
                      {dayjs(edu.end_date).format("YYYY")}
                    </p>
                    <p style={{
                      color: "#FECB00",
                      fontSize: "12px",
                      lineHeight: "18px",
                      fontWeight: "600",
                      margin: "0"
                    }}>
                      {edu.degree}
                    </p>
                    <p style={{
                      fontFamily: "'Urbanist', sans-serif",
                      fontSize: "12px",
                      lineHeight: "18px",
                      fontWeight: "500",
                      color: "white",
                      margin: "0"
                    }}>
                      {edu.institute_name}
                    </p>
                  </div>
                ))}
              </div>
            </SectionArea>

            {/* Contact */}
            <SectionArea>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <TitleSection2 name="Contact" />
                <div style={{ display: "grid", gap: "8px", marginTop: "36px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <p style={{
                      color: "#FECB00",
                      fontSize: "12px",
                      fontWeight: "600",
                      lineHeight: "18px",
                      margin: "0",
                      fontFamily: "'Urbanist', sans-serif"
                    }}>
                      Phone
                    </p>
                    <p style={{
                      fontSize: "10px",
                      fontWeight: "normal",
                      lineHeight: "16px",
                      color: "white",
                      margin: "0",
                      fontFamily: "'Urbanist', sans-serif"
                    }}>
                      {resumeData.phone_number}
                    </p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <p style={{
                      color: "#FECB00",
                      fontSize: "12px",
                      fontWeight: "600",
                      lineHeight: "18px",
                      margin: "0",
                      fontFamily: "'Urbanist', sans-serif"
                    }}>
                      Location
                    </p>
                    <p style={{
                      fontSize: "10px",
                      fontWeight: "normal",
                      lineHeight: "16px",
                      color: "white",
                      margin: "0",
                      fontFamily: "'Urbanist', sans-serif"
                    }}>
                      {resumeData.address}
                    </p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <p style={{
                      color: "#FECB00",
                      fontSize: "12px",
                      fontWeight: "600",
                      lineHeight: "18px",
                      margin: "0",
                      fontFamily: "'Urbanist', sans-serif"
                    }}>
                      E-mail
                    </p>
                    <p style={{
                      fontSize: "10px",
                      fontWeight: "normal",
                      lineHeight: "16px",
                      color: "white",
                      margin: "0",
                      fontFamily: "'Urbanist', sans-serif"
                    }}>
                      {resumeData.email}
                    </p>
                  </div>
                  {resumeData.linked_in_profile && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <p style={{
                        color: "#FECB00",
                        fontSize: "12px",
                        fontWeight: "600",
                        lineHeight: "18px",
                        margin: "0",
                        fontFamily: "'Urbanist', sans-serif"
                      }}>
                        Linked-in
                      </p>
                      <a
                        href={resumeData.linked_in_profile}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: "10px",
                          fontWeight: "normal",
                          lineHeight: "16px",
                          color: "white",
                          wordBreak: "break-word",
                          textDecoration: "underline",
                          margin: "0",
                          fontFamily: "'Urbanist', sans-serif"
                        }}
                      >
                        {resumeData.linked_in_profile}
                      </a>
                    </div>
                  )}
                  {resumeData.xing_profile && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <p style={{
                        color: "#FECB00",
                        fontSize: "12px",
                        fontWeight: "600",
                        lineHeight: "18px",
                        margin: "0",
                        fontFamily: "'Urbanist', sans-serif"
                      }}>
                        Xing
                      </p>
                      <a
                        href={resumeData.xing_profile}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: "10px",
                          fontWeight: "normal",
                          lineHeight: "16px",
                          color: "white",
                          wordBreak: "break-word",
                          textDecoration: "underline",
                          margin: "0",
                          fontFamily: "'Urbanist', sans-serif"
                        }}
                      >
                        {resumeData.xing_profile}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </SectionArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeEightEdit;