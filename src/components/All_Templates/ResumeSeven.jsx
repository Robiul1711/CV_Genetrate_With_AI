import React from "react";
import CvImage from "@/assets/images/cv7.png";
import {
  AddressIcon,
  EmailIcon,
  LinkdinIcon,
  PhoneIcon,
  XingIcon,
} from "../common/CustomIcons";

const ResumeSeven = () => {
  return (
    <div className="flex flex-col bg-white mt-10 py-5 gap-4 w-[210mm] mx-auto shadow-lg">
      <header className="w-full text-center justify-center items-center flex flex-col gap-1">
        <h1 className="text-[32px] uppercase !urbanist font-bold leading-[48px] tracking-[12px] text-[#484848]">
          ALEX STEVENS
        </h1>

        <p className="leading-[24px] tracking-[3px] uppercase text-[#484848] font-normal text-base !urbanist">
          Project Manager
        </p>
      </header>

      <div className="flex w-full px-6 justify-between items-center gap-5">
        <div className="w-1/3 flex flex-col gap-4">
          <p className="!urbanist text-center uppercase leading-[20px] tracking-[2px] text-[#0D0D0D] text-sm font-semibold">
            Profile
          </p>

          <p className="text-[#171717] italic !playfair text-xs font-normal text-center">
            Experienced Senior Project Manager with over 10 years in the German
            tech industry. Specializing in agile methodologies, cross-functional
            team leadership, and delivering complex software solutions.
            Passionate about driving innovation and exceeding client
            expectations.
          </p>
        </div>

        <div className="w-[100px] h-[100px] rounded-full aspect-square border-2 border-[#E0D5C9] overflow-hidden">
          <img src={CvImage} className="w-full h-full object-cover" alt="Alex Stevens" />
        </div>

        <div className="w-1/3 flex flex-col gap-1">
          <p className="!urbanist text-center uppercase leading-[20px] tracking-[2px] text-[#0D0D0D] text-sm font-semibold">
            Contact
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <div className="w-5 h-5 aspect-square rounded-full flex justify-center items-center bg-[#E0D5C9]">
                <PhoneIcon className="size-3" />
              </div>
              <p className="leading-[12px] !playfair font-normal text-xs text-[#171717] italic">
                +49 1512 3456789
              </p>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-5 h-5 aspect-square rounded-full flex justify-center items-center bg-[#E0D5C9]">
                <AddressIcon className="size-3" />
              </div>
              <p className="leading-[12px] font-normal !playfair text-xs text-[#171717] italic">
                Schillerstraße 22, 60313 Frankfurt am Main, Germany
              </p>
            </div>

            <div className="flex items-center gap-1">
              <div className="w-5 h-5 aspect-square rounded-full flex justify-center items-center bg-[#E0D5C9]">
                <EmailIcon className="size-3" />
              </div>
              <p className="leading-[12px] font-normal !playfair text-xs text-[#171717] italic">
                alexstevens@gmail.com
              </p>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-5 h-5 aspect-square rounded-full flex justify-center items-center bg-[#E0D5C9]">
                <LinkdinIcon className="size-3" />
              </div>
              <p className="leading-[12px] font-normal !playfair text-xs text-[#171717] italic">
                linkedin.com/in/Alex-Stevens
              </p>
            </div>

            <div className="flex items-center gap-1">
              <div className="w-5 h-5 aspect-square rounded-full flex justify-center items-center bg-[#E0D5C9]">
                <XingIcon className="size-3" />
              </div>
              <p className="leading-[12px] font-normal !playfair text-xs text-[#171717] italic">
                xing.com/profile/Alex-Stevens
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 relative">
        <div className="w-full bg-white border relative z-30 border-[#9A9A9A]">
          {/* Table Header */}
          <div className="grid grid-cols-3 bg-[#E1E2E6] text-center text-[#171717] !urbanist font-semibold leading-[15px] tracking-[2px] py-[10px]">
            <div className="py-[10px] border-r border-gray-300">
              Education
            </div>
            <div className="py-[10px] border-r border-gray-300">
              Professional Skills
            </div>
            <div className="py-[10px]">Expertise</div>
          </div>

          {/* Table Content */}
          <div className="grid grid-cols-3 text-sm px-4 py-6 z-50">
            {/* Education Column */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col text-center gap-1">
                <p className="text-[#171717] text-xs !playfair font-medium leading-[15px]">
                  Master of Science in Computer Science
                </p>
                <p className="text-[#171717] text-xs italic !playfair font-normal leading-[15px]">
                  Technische Universität München (TUM)
                </p>
                <p className="text-[#171717] text-xs italic !playfair font-normal leading-[15px]">
                  October 2013 – September 2015
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col text-center gap-1">
                  <p className="text-[#171717] text-xs !playfair font-medium leading-[15px]">
                    Bachelor of Engineering in Information Technology
                  </p>
                  <p className="text-[#171717] text-xs italic !playfair font-normal leading-[15px]">
                    Hochschule München University of Applied Sciences
                  </p>
                  <p className="text-[#171717] text-xs italic !playfair font-normal leading-[15px]">
                    October 2009 – September 2013
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col text-center gap-1">
                  <p className="text-[#171717] text-xs !playfair font-medium leading-[15px]">
                    Abitur (German High School Diploma)
                  </p>
                  <p className="text-[#171717] text-xs italic !playfair font-normal leading-[15px]">
                    Gymnasium Frankfurt West
                  </p>
                  <p className="text-[#171717] text-xs italic !playfair font-normal leading-[15px]">
                    September 2000 – June 2008
                  </p>
                </div>
              </div>
            </div>
            {/* professional skills */}
            <div className="flex flex-col items-center gap-2 px-2">
              <div className="flex items-center gap-4">
                <p className="text-[#0D0D0D] w-[75px] text-xs !playfair font-normal italic leading-[15px]">
                  Project Management
                </p>
                <span className="w-[80px] h-1 bg-[#E0D5C9] rounded-[16px]"></span>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-[#0D0D0D] w-[75px] text-xs !playfair font-normal italic leading-[15px]">
                  Time Management
                </p>
                <span className="w-[80px] h-1 bg-[#E0D5C9] rounded-[16px]"></span>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-[#0D0D0D] w-[75px] text-xs !playfair font-normal italic leading-[15px]">
                  Team Leadership
                </p>
                <span className="w-[80px] h-1 bg-[#E0D5C9] rounded-[16px]"></span>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-[#0D0D0D] w-[75px] text-xs !playfair font-normal italic leading-[15px]">
                  Communication Skills
                </p>
                <span className="w-[80px] h-1 bg-[#E0D5C9] rounded-[16px]"></span>
              </div>
            </div>

            {/* Expertise */}

            <div className="flex flex-col items-center ml-6 gap-2">
              <div className="flex gap-4">
                <p className="text-xs font-normal leading-[15px] text-[#171717]">
                  German
                </p>
                <p className="text-xs font-normal leading-[15px] text-[#171717]">
                  Native / C2
                </p>
              </div>
              <div className="flex gap-4">
                <p className="text-xs font-normal leading-[15px] text-[#171717]">
                  English
                </p>
                <p className="text-xs font-normal leading-[15px] text-[#171717]">
                  B1 – Intermediate
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute z-50 -bottom-5 border-[1px] border-[#9A9A9A] bg-[#F7F7F7] left-10 px-[60px] py-[10px] text-[#171717] !urbanist text-xs uppercase font-semibold leading-[15px] tracking-[2px]">
          Experience
        </div>
        <div className="absolute z-50 -bottom-5 border-[1px] border-[#9A9A9A] bg-[#F7F7F7] right-10 px-[60px] py-[10px] text-[#171717] !urbanist text-xs uppercase font-semibold leading-[15px] tracking-[2px]">
          TRAINING
        </div>

        <div className="absolute h-[65%] top-16 w-[100px] border-[1px] border-[#9A9A9A] z-20 left-3 bg-[#E1E2E6]"></div>
        <div className="absolute h-[65%] top-16 w-[100px] z-20 right-3 bg-[#E1E2E6] border-[1px] border-[#9A9A9A]"></div>
      </div>

      <div className="w-full grid grid-cols-2 px-6 mt-4 gap-4">
        <div className="grid grid-cols-2 gap-x-2 gap-y-4">
          <div className="flex p-4 flex-col bg-[#F8F8F8] text-center gap-2">
            <p className="text-[#171717] text-xs italic font-normal leading-[15px]">
              Deutsche Digital Solutions GmbH Berlin
            </p>
            <p className="text-[#171717] text-xs italic font-normal leading-[15px]">
              2018 – 2023
            </p>
          </div>
          <div className="flex flex-col w-full p-4 gap-2">
            <p className="text-[#171717] text-xs italic font-semibold !playfair leading-[15px]">
              Senior Project Manager
            </p>
            <p className="text-[#171717] text-xs italic font-normal leading-[15px]">
              At Deutsche Digital Solutions GmbH, I led cross-functional project
              teams of up to 15 members, managing software development projects
              from concept through delivery.
            </p>
          </div>
          <div className="flex p-4 flex-col bg-[#F8F8F8] text-center gap-2">
            <p className="text-[#171717] text-xs italic font-normal leading-[15px]">
              Bavaria Tech Systems AG, Munich
            </p>
            <p className="text-[#171717] text-xs italic font-normal leading-[15px]">
              2015 – 2018
            </p>
          </div>
          <div className="flex flex-col w-full p-4 gap-2">
            <p className="text-[#171717] text-xs italic font-semibold !playfair leading-[15px]">
              IT Project Coordinator
            </p>
            <p className="text-[#171717] text-xs italic font-normal leading-[15px]">
              At Bavaria Tech Systems AG, I assisted in planning and scheduling
              IT infrastructure projects while maintaining smooth communication
              between technical teams and clients.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-2 gap-y-4">
          <div className="flex p-4 flex-col bg-[#F8F8F8] text-center gap-2">
            <p className="text-[#171717] text-xs italic font-normal leading-[15px]">
              Siemens Training Center Berlin
            </p>
            <p className="text-[#171717] text-xs italic font-normal leading-[15px]">
              February 2021 – April 2021
            </p>
          </div>
          <div className="flex flex-col w-full p-4 gap-2">
            <p className="text-[#171717] text-xs italic font-semibold !playfair leading-[15px]">
              Advanced Project Management Certification
            </p>
            <p className="text-[#171717] text-xs italic font-normal leading-[15px]">
              Completed intensive training in advanced project management
              methodologies, risk assessment, and stakeholder management.
            </p>
          </div>
          <div className="flex p-4 flex-col bg-[#F8F8F8] text-center gap-2">
            <p className="text-[#171717] text-xs italic font-normal leading-[15px]">
              AP Academy Walldorf
            </p>
            <p className="text-[#171717] text-xs italic font-normal leading-[15px]">
              June 2019 – August 2019
            </p>
          </div>
          <div className="flex flex-col w-full p-4 gap-2">
            <p className="text-[#171717] text-xs italic font-semibold !playfair leading-[15px]">
              Agile Practitioner Certification
            </p>
            <p className="text-[#171717] text-xs italic font-normal leading-[15px]">
              Gained expertise in Scrum, Kanban, and Lean methodologies through
              hands-on workshops and case studies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeSeven;