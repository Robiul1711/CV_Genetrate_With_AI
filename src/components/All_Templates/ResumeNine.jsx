import React from "react";
import Cv9 from "@/assets/images/cv9.png";
import { PhoneIcon } from "lucide-react";
import {
  AddressIcon,
  AkabakaIcon,
  EmailIcon,
  LinkdinIcon,
  XingIcon,
} from "../common/CustomIcons";

const ResumeNine = () => {
  return (
    <div className=" flex flex-col gap-4 p-6 bg-white w-[210mm] mx-auto mt-10">
      <div className=" flex flex-col">
        <div className=" flex flex-col z-50 justify-center items-center gap-4">
          <p className="text-[#0D0D0D] text-xs font-medium !urbanist tracking-[8px] leading-[12px]">
            The resume of
          </p>
          <h1 className=" text-[32px] tracking-[7px] playfair leading-[48px] text-[#0D0D0D] font-bold ">
            ALEX STEVENS
          </h1>
        </div>

        <div className=" w-full flex gap-6  ">
          <div className=" w-1/3 relative h-[200px] -mt-5">
            <div className=" absolute inset-0 bg-[#F7DCD1]"></div>
            <div className=" w-[133px] h-[166px] relative top-16 left-20 ">
              <img src={Cv9} className=" w-full h-full object-cover" />
            </div>
          </div>
          <div className=" flex-1 flex flex-col gap-4  relative">
            <p className=" px-6 text-[#0D0D0D]  z-50 text-xs !urbanist font-medium leading-[12px] tracking-[8px] uppercase">
              PROFESSIONAL TITLE
            </p>
            <div className=" px-6 flex flex-col gap-2 z-50">
              <p className="text-[#171717] !urbanist font-normal text-xs leading-[18px]">
                Experienced Senior Project Manager with over 10 years in the
                German tech industry. Specializing in agile methodologies,
                cross-functional team leadership, and delivering complex
                software solutions. Passionate about driving innovation and
                exceeding client expectations.
              </p>

              <div className=" grid grid-cols-2 gap-2 max-w-[400px]">
                <div className=" flex items-center gap-[6px]">
                  <div className=" w-5 h-5 rounded-full aspect-square flex justify-center items-center bg-[#E0D5C9]">
                    <PhoneIcon className="size-3" />
                  </div>
                  <p className=" leading-[12px] text-[#171717] font-normal italic text-xs !playfair">
                    +49 1512 3456789
                  </p>
                </div>
                <div className=" flex items-center gap-[6px]">
                  <div className=" w-5 h-5 rounded-full aspect-square flex justify-center items-center bg-[#E0D5C9]">
                    <AddressIcon className="size-3" />
                  </div>
                  <p className=" leading-[12px] text-[#171717] font-normal italic text-xs !playfair">
                    Schillerstraße 22, 60313 Frankfurt am Main, Germany
                  </p>
                </div>
                <div className=" flex items-center gap-[6px]">
                  <div className=" w-5 h-5 rounded-full aspect-square flex justify-center items-center bg-[#E0D5C9]">
                    <EmailIcon className="size-3" />
                  </div>
                  <p className=" leading-[12px] text-[#171717] font-normal italic text-xs !playfair">
                    alexstevens@gmail.com
                  </p>
                </div>
                <div className=" flex items-center gap-[6px]">
                  <div className=" w-5 h-5 rounded-full aspect-square flex justify-center items-center bg-[#E0D5C9]">
                    <LinkdinIcon className="size-3" />
                  </div>
                  <p className=" leading-[12px] text-[#171717] font-normal italic text-xs !playfair">
                    linkedin.com/in/Alex- Stevens
                  </p>
                </div>
                <div className=" flex items-center gap-[6px]">
                  <div className=" w-5 h-5 rounded-full aspect-square flex justify-center items-center bg-[#E0D5C9]">
                    <XingIcon className="size-3" />
                  </div>
                  <p className=" leading-[12px] text-[#171717] font-normal italic text-xs !playfair">
                    xing.com/profile/Alex- Stevens
                  </p>
                </div>
              </div>
            </div>
            <span>
              <AkabakaIcon />
            </span>

            <div className=" w-[122px] h-[154px] absolute z-10 -top-16 right-[125px] bg-[#EDE9E6]"></div>
          </div>
        </div>

        <div className=" flex flex-row gap-4 m mt-2">
          <div className=" w-[250px] p-6  bg-[#B0B3AC] flex flex-col gap-3">
            <p className=" uppercase text-sm font-medium leading-5 text-white !urbanist text-center">
              education
            </p>
            <div className=" flex flex-col gap-3">
              <div className=" flex flex-col gap-1">
                <p className=" leading-5 text-sm text-white font-medium !urbanist">
                  Technische Universität München (TUM)
                </p>
                <p className=" leading-4 text-xs text-white font-normal !urbanist">
                  Master of Science in Computer Science
                </p>
                <p className=" leading-4 text-xs text-white font-normal !urbanist">
                  October 2013 – September 2015
                </p>
              </div>
              <div className=" flex flex-col gap-1">
                <p className=" leading-5 text-sm text-white font-medium !urbanist">
                  Bachelor of Engineering in Information Technology
                </p>
                <p className=" leading-4 text-xs text-white font-normal !urbanist">
                  Hochschule München University of Applied Sciences
                </p>
                <p className=" leading-4 text-xs text-white font-normal !urbanist">
                  October 2009 – September 2013
                </p>
              </div>
              <div className=" flex flex-col gap-1">
                <p className=" leading-5 text-sm text-white font-medium !urbanist">
                  Abitur (German High School Diploma)
                </p>
                <p className=" leading-4 text-xs text-white font-normal !urbanist">
                  Gymnasium Frankfurt West
                </p>
                <p className=" leading-4 text-xs text-white font-normal !urbanist">
                  September 2000 – June 2008
                </p>
              </div>

              <div className=" flex justify-center items-center">
                <span>
                  <AkabakaIcon />
                </span>
              </div>
            </div>
          </div>
          <div className=" flex-1 flex flex-col gap-4">
            <div className=" w-[90%] px-[60px] py-6 bg-[#293946] text-center">
              <p className=" leading-4 tracking-[2px] !urbanist text-sm font-semibold text-white uppercase">
                EXperience
              </p>
            </div>
            <div className=" flex flex-col gap-3 pr-6">
              <div className=" flex flex-col gap-2">
                <div className=" flex flex-col gap-1">
                  <div className=" flex items-center gap-2 w-full justify-between">
                    <p className=" text-sm font-semibold leading-5 !urbanist text-[#171717]">
                      Senior Project Manager
                    </p>
                    <p className=" text-xs font-semibold leading-5 !urbanist text-[#171717]">
                      2018 – 2023
                    </p>
                  </div>
                  <p className="leading-4 !urbanist text-xs text-[#171717] font-medium">
                    Deutsche Digital Solutions GmbH, Berlin
                  </p>
                </div>
                <p className="leading-4 !urbanist text-xs text-[#171717] font-normal pr-4">
                  At Deutsche Digital Solutions GmbH, I led cross-functional
                  project teams of up to 15 members, managing software
                  development projects from concept through delivery.
                </p>
              </div>
              <div className=" flex flex-col gap-2">
                <div className=" flex flex-col gap-1">
                  <div className=" flex items-center gap-2 w-full justify-between">
                    <p className=" text-sm font-semibold leading-5 !urbanist text-[#171717]">
                      IT Project Coordinator
                    </p>
                    <p className=" text-xs font-semibold leading-5 !urbanist text-[#171717]">
                      2015 – 2018
                    </p>
                  </div>
                  <p className="leading-4 !urbanist text-xs text-[#171717] font-medium">
                    Bavaria Tech Systems AG, Munich
                  </p>
                </div>
                <p className="leading-4 !urbanist text-xs text-[#171717] font-normal pr-4">
                  At Bavaria Tech Systems AG, I assisted in planning and
                  scheduling IT infrastructure projects while maintaining smooth
                  communication between technical teams and clients
                </p>
              </div>
              <span>
                <AkabakaIcon />
              </span>
            </div>
          </div>
        </div>

        <div className=" flex gap-4  mt-4">
          <div className=" flex flex-col w-[250px] gap-3">
            <p className=" leading-5  text-sm font-medium text-[#0D0D0D] uppercase !urbanist">
              key Skills
            </p>
            <div className=" flex flex-col gap-1">
              <p className=" leading-5 text-xs !urbanist font-normal text-[#171717] capitalize">
                Project Management
              </p>
              <p className=" leading-5 text-xs !urbanist font-normal text-[#171717] capitalize">
                Time Management
              </p>
              <p className=" leading-5 text-xs !urbanist font-normal text-[#171717] capitalize">
                Team Leadership
              </p>
              <p className=" leading-5 text-xs !urbanist font-normal text-[#171717] capitalize">
                Communication Skills
              </p>
            </div>
          </div>
          <div className=" flex flex-col gap-4 flex-1 -mt-12">
            <div className=" w-[90%] px-[60px] py-6 bg-[#293946] text-center">
              <p className=" leading-4 tracking-[2px] !urbanist text-sm font-semibold text-white uppercase">
                training
              </p>
            </div>

            <div className=" flex flex-col gap-3 pr-4">
              <div className=" flex flex-col gap-1">
                <div className=" flex items-center gap-2 w-full justify-between">
                  <p className=" text-sm font-semibold leading-5 !urbanist text-[#171717]">
                    Siemens Training Center, Berlin
                  </p>
                  <p className=" text-xs font-semibold leading-5 !urbanist text-[#171717]">
                    February 2021 – April 2021
                  </p>
                </div>
                <p className="leading-4 !urbanist text-xs text-[#171717] font-medium">
                  Advanced Project Management Certification
                </p>
              </div>
              <div className=" flex flex-col gap-1">
                <div className=" flex items-center gap-2 w-full justify-between">
                  <p className=" text-sm font-semibold leading-5 !urbanist text-[#171717]">
                    AP Academy, Walldorf
                  </p>
                  <p className=" text-xs font-semibold leading-5 !urbanist text-[#171717]">
                    June 2019 – August 2019
                  </p>
                </div>
                <p className="leading-4 !urbanist text-xs text-[#171717] font-medium">
                  SAP ERP Implementation and Integration
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeNine;
