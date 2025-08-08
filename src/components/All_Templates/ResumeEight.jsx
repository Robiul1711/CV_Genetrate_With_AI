import React from "react";
import Image from "@/assets/images/cv8.png";

const TitleSection = ({ name }) => {
  return (
    <h2 className=" bg-[#FFFFFF] -ml-4  rounded-tr-[16px] py-1.5 w-[140px] flex justify-center items-center text-base  text-[#0D0D0D] font-semibold leading-[20px] traking-[2px]">
      {name}
    </h2>
  );
};

const TitleSection2 = ({ name }) => {
  return (
    <h2 className=" bg-[#FFFFFF]  absolute top-4 right-0   rounded-tl-[16px] py-1.5 w-[120px] flex justify-center items-center text-base  text-[#0D0D0D] font-semibold leading-[20px] traking-[2px]">

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
  return (
    <div className=" flex flex-col bg-[#404040] gap-3 w-[210mm] mx-auto mt-10">
      <header
        className={` bg-[#1F1F1F] pl-[153px] relative  pt-[34px] pb-4 pr-[172px] w-full`}
      >
        <div className=" flex flex-col gap-2">
          <p className=" text-[32px] font-[800] urbanist traking-[4px] leading-[30px] text-[#FFC805] ">
            ALEX STEVENS
          </p>
          <p className=" text-[#D7D7D7] urbanist text-sm font-medium capitalize leading-[20px] traking-[1px]">
            Project Manager
          </p>
        </div>

        <img src={Image} className=" absolute top-4 right-4 z-50 w-[140px] h-[140px] " />

      </header>

      <div className=" flex gap-3 w-full  p-3">
        <div className=" flex flex-col justify-between gap-3 w-[75%]">
          <SectionArea>
            <div className=" flex flex-col gap-1">
              <TitleSection name={`Profile`} />
              <p className=" text-xs  text-white font-normal leading-[18px] urbanist">
                Experienced Senior Project Manager with over 10 years in the
                German tech industry. Specializing in agile methodologies,
                cross-functional team leadership, and delivering complex
                software solutions. Passionate about driving innovation and
                exceeding client expectations.
              </p>
            </div>
          </SectionArea>

          <SectionArea>
            <div className=" flex flex-col gap-2">
              <TitleSection name={`Experience`} />
              <div className=" flex flex-col gap-2 w-full">
                <div className=" flex flex-row gap-2">
                  <div className=" w-[117px] flex flex-col gap-2">
                    <p className="text-white urbanist text-xs font-medium leading-[15px] ">
                      Deutsche Digital Solutions GmbH,Berlin
                    </p>
                    <p className="text-white urbanist text-xs font-normal leading-[15px]">
                      2018 – 2023
                    </p>
                  </div>
                  <div className=" flex flex-1  flex-col gap-2">
                    <p className=" text-sm font-semibold leading-[18px]  !text-[#FECB00] urbanist">
                      Senior Project Manager
                    </p>
                    <p className=" text-xs  text-white font-normal leading-[18px] urbanist">
                      At Deutsche Digital Solutions GmbH, I led cross-functional
                      project teams of up to 15 members, managing software
                      development projects from concept through delivery.
                    </p>
                  </div>
                </div>
                <div className=" flex flex-row gap-2">
                  <div className=" w-[117px] flex flex-col gap-2">
                    <p className="text-white urbanist text-xs font-medium leading-[15px] ">
                      Bavaria Tech Systems AG, Munich
                    </p>
                    <p className="text-white urbanist text-xs font-normal leading-[15px]">
                      2015 – 2018
                    </p>
                  </div>
                  <div className=" flex flex-1  flex-col gap-2">
                    <p className=" text-sm font-semibold leading-[18px]  !text-[#FECB00] urbanist">
                      IT Project Coordinator
                    </p>
                    <p className=" text-xs  text-white font-normal leading-[18px] urbanist">
                      At Bavaria Tech Systems AG, I assisted in planning and
                      scheduling IT infrastructure projects while maintaining
                      smooth communication between technical teams and clients
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SectionArea>

          <SectionArea>
            <div className=" flex flex-col gap-2">
              <TitleSection name={`Skills`} />
              <div className=" grid grid-cols-2  gap-2">
                <div className="  flex gap-2 items-center">
                  <div className=" w-1/2 ">
                    <p className="text-xs  text-white font-normal leading-[18px] urbanist">
                      Project Management
                    </p>
                  </div>
                  <div className=" flex-1 rounded-[16px] bg-[#FECB00] h-1"></div>
                </div>
                <div className="  flex gap-2 items-center">
                  <div className=" w-1/2 ">
                    <p className="text-xs  text-white font-normal leading-[18px] urbanist">
                      Time Management
                    </p>
                  </div>
                  <div className=" flex-1 rounded-[16px] bg-[#FECB00] h-1"></div>
                </div>
                <div className=" flex gap-2 items-center">
                  <div className=" w-1/2 ">
                    <p className="text-xs  text-white font-normal leading-[18px] urbanist">
                      Team Leadership
                    </p>
                  </div>
                  <div className=" flex-1 rounded-[16px] bg-[#FECB00] h-1"></div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className=" w-1/2 ">
                    <p className="text-xs  text-white font-normal leading-[18px] urbanist">
                      Communication Skills
                    </p>
                  </div>
                  <div className=" flex-1 rounded-[16px] bg-[#FECB00] h-1"></div>
                </div>
              </div>
            </div>
          </SectionArea>

          <SectionArea>
            <div className=" flex flex-col gap-2">
              <TitleSection name={`Language`} />

              <div className=" grid grid-cols-2">
                <div className=" flex gap-2 items-center">
                  <p className="text-xs pl-4 pr-6  text-white font-normal leading-[18px] urbanist">
                    German
                  </p>
                  <p className="text-xs  text-white font-normal leading-[18px] urbanist">
                    Native / C2
                  </p>
                </div>
                <div className=" flex gap-2 items-center">
                  <p className="text-xs pl-4 pr-6  text-white font-normal leading-[18px] urbanist">
                    English
                  </p>
                  <p className="text-xs  text-white font-normal leading-[18px] urbanist">
                    B1 – Intermediate
                  </p>
                </div>
              </div>
            </div>
          </SectionArea>

          <SectionArea>
            <div className=" flex flex-col gap-2">
         <TitleSection name={`Training`} />

         <div className=" grid gap-1 grid-cols-1">
          <div className=" flex  gap-2">
            <div className=" flex flex-col gap-1 w-[171px]">
              <p className=" text-xs text-white leading-[15px] font-medium urbanist">Siemens Training Centre, Berlin</p>
              <p className="text-[10px] text-white  font-normal urbanis">February 2021 – April 2021</p>

            </div>
            <p className=" urbanist text-xs w-[144px] text-[#FECB00] font-semibold leading-[18px]">Advanced Project Management Certification</p>

          </div>
           <div className=" flex  gap-2">
            <div className=" flex flex-col gap-1 w-[171px]">
              <p className=" text-xs text-white leading-[15px] font-medium urbanist">AP Academy, Walldorf</p>
              <p className="text-[10px] text-white  font-normal urbanis">June 2019 – August 2019</p>

            </div>
            <p className=" urbanist text-xs w-[144px] text-[#FECB00] font-semibold leading-[18px]">SAP ERP Implementation and Integration</p>

          </div>


         </div>

            </div>
          </SectionArea>
        </div>
        <div className=" w-[25%] mt-8 flex flex-col gap-3">
          <SectionArea>
            <div className=" flex flex-col gap-2">
              <TitleSection2 name={`Education`} />
            </div>
            <div className=" grid  gap-2 mt-9">
              <div className=" flex flex-col gap-1">
                <p className=" text-[10px] text-white urbanist leading-[15px] font-normal">2018 – 2023</p>
                <p className="text-[#FECB00] text-xs leading-[18px] font-semibold">Master of Science in Computer Science</p>
                <p className=" urbanist text-xs leading-[18px] font-medium text-white">Technische Universität München (TUM)</p>

              </div>
               <div className=" flex flex-col gap-1">
                <p className=" text-[10px] text-white urbanist leading-[15px] font-normal">2009 – 2013</p>
                <p className="text-[#FECB00] text-xs leading-[18px] font-semibold">Bachelors of  Engineering in Information Technology</p>
                <p className=" urbanist text-xs leading-[18px] font-medium text-white">Hochschule München University of Applied Sciences</p>

              </div>
               <div className=" flex flex-col gap-1">
                <p className=" text-[10px] text-white urbanist leading-[15px] font-normal">2000 – 2008</p>
                <p className="text-[#FECB00] text-xs leading-[18px] font-semibold">Abitur (German High School Diploma)</p>
                <p className=" urbanist text-xs leading-[18px] font-medium text-white">Gymnasium Frankfurt West</p>

              </div>

            </div>


          </SectionArea>

          <SectionArea>
            <div className=" flex flex-col gap-2">
              <TitleSection2 name={`Contact`} />

              <div className=" grid  gap-2 mt-9">
                <div className=" flex flex-col gap-1">
                  <p className=" text-[#FECB00] text-xs font-semibold leading-[18px] urbanist">Phone</p>
                  <p className=" text-[10px] font-normal leading-[16px] text-white urbanist">+49 1512 3456789</p>

                </div>
                 <div className=" flex flex-col gap-1">
                  <p className=" text-[#FECB00] text-xs font-semibold leading-[18px] urbanist">Location</p>
                  <p className=" text-[10px] font-normal leading-[16px] text-white urbanist">Schillerstraße 22, 60313 Frankfurt am Main, Germany</p>

                </div>
                 <div className=" flex flex-col gap-1">
                  <p className=" text-[#FECB00] text-xs font-semibold leading-[18px] urbanist">E-mail</p>
                  <p className=" text-[10px] font-normal leading-[16px] text-white urbanist">alexstevens@gmail.com</p>

                </div>
                 <div className=" flex flex-col gap-1">
                  <p className=" text-[#FECB00] text-xs font-semibold leading-[18px] urbanist">Linked-in</p>
                  <p className=" text-[10px] font-normal leading-[16px] text-white urbanist">linkedin.com/in/Alex- Stevens</p>

                </div>
                 <div className=" flex flex-col gap-1">
                  <p className=" text-[#FECB00] text-xs font-semibold leading-[18px] urbanist">Xing</p>
                  <p className=" text-[10px] font-normal leading-[16px] text-white urbanist">xing.com/profile/Alex- Stevens</p>

                </div>

              </div>

            </div>

          </SectionArea>


        </div>
      </div>
    </div>
  );
};

export default ResumeEight;
